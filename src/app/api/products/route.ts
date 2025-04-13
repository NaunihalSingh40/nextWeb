import { connectDb } from "helper/dB";
import { Product } from "models/products";

export const GET = async (): Promise<Response> => {
  await connectDb();

  try {
    const products = await Product.find();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Server Error: " + error, { status: 500 });
  }
};
