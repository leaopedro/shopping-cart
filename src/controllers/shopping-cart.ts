import { Request, Response, NextFunction } from "express";
import { Cart, updateCart, CartItem } from "./../models/Cart";
import { Product } from "./../models/Product";

/**
 * Shopping Cart controller.
 * @route GET /:userId
 */
export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.debug("getCart", req.params);

  const cart = await Cart.findOne({ userId: req.params.userId });

  if (!cart) {
    return res.status(404).json({
      message: "Shopping Cart not found",
    });
  }

  return res.status(200).json(cart);
};

/**
 * @route POST /:userId/add
 * @argument items: [{sku: string, quantity: number}]
 */
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.debug("addToCart", req.body);

  let cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) {
    cart = await new Cart({
      userId: req.params.userId,
      items: [],
      totalAmount: 0,
      discount: 0,
    }).save();
  }

  const currentSkus = cart.items.map((i) => i.sku);
  const addedSkus = new Set(
    req.body.items.map(({ sku }: { sku: string }) => sku)
  );
  const newSkus = Array.from(addedSkus).filter(
    (sku: string) => !currentSkus.includes(sku)
  );
  const newProductsCount = await Product.count({
    sku: { $in: newSkus },
  });
  if (newProductsCount !== newSkus.length) {
    return res.status(400).json({
      message: "Product not found",
    });
  }

  const newCart = await updateCart({
    cart,
    items: req.body.items as CartItem[],
    type: "ADD",
  });

  return res.status(200).json(newCart);
};

/**
 * @route POST /:userId/remove
 * @argument items: [{sku: string, quantity: number}]
 */
export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.debug("removeFromCart", req.body);

  const cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  const currentSkus = cart.items.map((i) => i.sku);
  const removedSkus = new Set(
    req.body.items.map(({ sku }: { sku: string }) => sku)
  );
  const skusNotInCart = Array.from(removedSkus).filter(
    (sku: string) => !currentSkus.includes(sku)
  );

  if (skusNotInCart.length > 0) {
    return res.status(400).json({
      message: "Product is not in cart",
      products: skusNotInCart,
    });
  }

  const newCart = await updateCart({
    cart,
    items: req.body.items as CartItem[],
    type: "REMOVE",
  });

  return res.status(200).json(newCart);
};
