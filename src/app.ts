import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGODB_URI } from "./util/secrets";

// Controllers (route handlers)
import * as cartController from "./controllers/shopping-cart";

// Create Express server
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {})
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

app.get("/shopping-cart", (req, res) => {
  res.status(200);
  res.json({
    message: "healthcheck ok",
  });
});

app.get("/shopping-cart/:userId", cartController.getCart);
app.post("/shopping-cart/:userId/add", cartController.addToCart);
app.post("/shopping-cart/:userId/remove", cartController.removeFromCart);

export default app;
