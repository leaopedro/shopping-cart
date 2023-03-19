import mongoose from "mongoose";
import { Product } from "./models/Product";
import { Cart } from "./models/Cart";

const seed = async () => {
  mongoose
    .connect("mongodb://localhost:27017/shopping-cart")
    .then(() => {
      console.log("MONGO CONNECTION OPEN");
    })
    .catch(console.log);

  const products = [
    {
      sku: "0001",
      name: "T-shirt",
      price: 1299,
    },
    {
      sku: "0002",
      name: "Jeans",
      price: 2500,
    },
    {
      sku: "0003",
      name: "Dress",
      price: 2065,
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);

  const carts = [
    {
      userId: "1",
      items: [
        { sku: "0001", quantity: 1 },
        { sku: "0002", quantity: 1 },
      ],
      amount: 3799,
      discount: 0,
      dueAmount: 3799,
    },
    {
      userId: "2",
      items: [{ sku: "0001", quantity: 1 }],
      totalAmount: 1299,
      amount: 1299,
      discount: 0,
      dueAmount: 1299,
    },
    {
      userId: "3",
      items: [{ sku: "0001", quantity: 3 }],
      amount: 5196,
      discount: 1299,
      dueAmount: 3897,
    },
  ];

  await Cart.deleteMany({});
  await Cart.insertMany(carts);
  console.log("Success");
  process.exit(0);
};

seed();
