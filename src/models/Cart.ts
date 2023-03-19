import mongoose from "mongoose";
import { ProductDocument, productSchema, Product } from "./Product";

export type CartItem = { sku: string; quantity: number };
export type CartDocument = mongoose.Document & {
  userId: string;
  items: CartItem[];
  amount: number;
  discount: number;
  dueAmount: number;
};

const cartSchema = new mongoose.Schema<CartDocument>({
  userId: { type: String, unique: true },
  items: [{ sku: String, quantity: Number }],
  amount: Number,
  discount: Number,
  dueAmount: Number,
});

export const Cart = mongoose.model<CartDocument>("Cart", cartSchema);

const calculateAmounts = function (
  cart: CartDocument,
  products: ProductDocument[]
): { amount: number; discount: number } {
  let totalQuantity = 0;
  let finalDiscount = 0;
  let amount = 0;

  const productBySku = products.reduce(
    (t: { [key: string]: ProductDocument }, p: ProductDocument) => {
      t[p.sku] = p;
      return t;
    },
    {}
  );

  // rank:
  // lowest price                                               highest price
  // [[sku, price, quantity], [sku, price, quantity], [sku, price, quantity]]
  const rank = cart.items
    .reduce((acc, item) => {
      const { sku, price } = productBySku[item.sku];
      totalQuantity += item.quantity;
      amount += item.quantity * price;
      acc.push([sku, price, item.quantity]);
      return acc;
    }, [])
    .sort((a, b) => a[1] - b[1]);

  let itemsToDiscount = Math.floor(totalQuantity / 3);
  let i = 0;
  while (itemsToDiscount > 0) {
    const numberOfItems = Math.min(itemsToDiscount, rank[i][2]);
    finalDiscount += numberOfItems * rank[i][1];
    itemsToDiscount -= numberOfItems;
    i++;
  }

  return { amount, discount: finalDiscount };
};

export const updateCart = async function ({
  cart,
  items,
  type
}: {
  cart: CartDocument;
  items: CartItem[];
  type: string;
}): Promise<CartDocument> {
  items.forEach(({ sku, quantity }: CartItem) => {
    const item = cart.items.find((i) => i.sku === sku);
    if (type === 'ADD') {
      if (!item) cart.items.push({ sku, quantity });
      else item.quantity += quantity;
    } else if (type === 'REMOVE') {
      if (!item) return;
      if (item.quantity > quantity) item.quantity -= quantity;
      else {
        const index = cart.items.indexOf(item);
        cart.items.splice(index, 1);
      }
    } else if (type === 'CLEAR') {
      cart.items = [];
    }
  });

  const skus = cart.items.map(({ sku }: { sku: string }) => sku);
  const products = await Product.find({ sku: { $in: skus } });

  const { amount, discount } = calculateAmounts(cart, products);
  cart.discount = discount;
  cart.amount = amount;
  cart.dueAmount = amount - discount;
  await cart.save();

  return cart;
};
