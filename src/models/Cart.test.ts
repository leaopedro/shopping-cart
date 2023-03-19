import { expect } from "chai";
import { Cart, updateCart, CartDocument } from "./Cart";
const mockingoose = require("mockingoose");
import { Product } from "./Product";

describe("updateCart", () => {
  let cart: CartDocument = new Cart({
    userId: "1",
    items: [],
    amount: 0,
    discount: 0,
    dueAmount: 0,
  });

  it("should add item and return cart updated", async () => {
    mockingoose(Product).toReturn([{ sku: "0001", price: 100 }], "find");

    const itemsToAdd = [{ sku: "0001", quantity: 1 }];

    const response = await updateCart({ cart, items: itemsToAdd, type: "ADD" });

    expect(response.items.length).to.equal(1);
    expect(response.items[0].quantity).to.equal(1);
    expect(response.amount).to.equal(100);
    expect(response.dueAmount).to.equal(100);
    expect(response.discount).to.equal(0);
  });

  it("should remove items and return cart updated", async () => {
    mockingoose(Product).toReturn([{ sku: "0001", price: 100 }], "find");

    const itemsToRemove = [{ sku: "0001", quantity: 1 }];

    const response = await updateCart({
      cart,
      items: itemsToRemove,
      type: "REMOVE",
    });

    expect(response.items.length).to.equal(0);
    expect(response.amount).to.equal(0);
    expect(response.dueAmount).to.equal(0);
    expect(response.discount).to.equal(0);
  });

  it("should give discount if there's more than 3 products", async () => {
    mockingoose(Product).toReturn([{ sku: "0001", price: 100 }], "find");

    const itemsToAdd = [{ sku: "0001", quantity: 3 }];

    const response = await updateCart({ cart, items: itemsToAdd, type: "ADD" });

    expect(response.items.length).to.equal(1);
    expect(response.items[0].quantity).to.equal(3);
    expect(response.amount).to.equal(300);
    expect(response.dueAmount).to.equal(200);
    expect(response.discount).to.equal(100);
  });

  it("should discount the cheapest items", async () => {
    cart = new Cart({
      userId: "1",
      items: [],
      amount: 0,
      discount: 0,
      dueAmount: 0,
    });
    mockingoose(Product).toReturn(
      [
        { sku: "0001", price: 1299 },
        { sku: "0002", price: 2500 },
        { sku: "0003", price: 2065 },
      ],
      "find"
    );

    const itemsToAdd = [
      { sku: "0001", quantity: 1 },
      { sku: "0002", quantity: 2 },
      { sku: "0003", quantity: 3 },
    ];

    const response = await updateCart({ cart, items: itemsToAdd, type: "ADD" });

    expect(response.items.length).to.equal(3);
    expect(response.amount).to.equal(12494);
    expect(response.dueAmount).to.equal(9130);
    expect(response.discount).to.equal(3364);
  });
});
