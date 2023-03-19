import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  sku: string;
  name: string;
  price: number;
};

export const productSchema = new mongoose.Schema<ProductDocument>({
  sku: String,
  name: String,
  price: Number,
});

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
