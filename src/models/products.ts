import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  count: {
    type: Number,
    required: true,
  },
});

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    category: {
      type: String,
      required: [true, "Category is required!"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required!"],
    },
    rating: {
      type: ratingSchema,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite issue in development
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
