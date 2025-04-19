import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: String,
  price: Number,
  quantity: Number,
  image: String,
});

export const CartItem =
  mongoose.models.CartItem || mongoose.model("CartItem", CartItemSchema);
