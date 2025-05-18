import { connectDb } from "helper/dB";
import { Product } from "models/products";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ productsId: string }> } // params is Promise here
) {
  await connectDb();

  const awaitedParams = await params; // await the params first
  const productId = awaitedParams.productsId;

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  try {
    const item = await Product.findOne({ id: Number(productId) });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error: " + error },
      { status: 500 }
    );
  }
}
