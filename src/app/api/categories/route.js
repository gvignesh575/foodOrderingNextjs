import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(request) {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await request.json();
  const categoryDoc = await Category.create({ name });
  return NextResponse.json(categoryDoc);
}

export async function PUT(request) {
  const { _id, name } = await request.json();
  mongoose.connect(process.env.MONGO_URL);
  await Category.updateOne({ _id }, { name });
  return NextResponse.json(true);
}

export async function GET(request) {
  mongoose.connect(process.env.MONGO_URL);
  return NextResponse.json(await Category.find());
}

export async function DELETE(request) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(request.url);
  const _id = url.searchParams.get("_id");
  console.log(_id);
  await Category.deleteOne({ _id });
  return NextResponse.json(true);
}
