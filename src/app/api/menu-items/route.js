import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await request.json();
  const menuItemDoc = await MenuItem.create(data);
  return NextResponse.json(menuItemDoc);
}

export async function PUT(request) {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Called this update function");
  const { _id, ...data } = await request.json();
  await MenuItem.findByIdAndUpdate(_id, data);
  return NextResponse.json(true);
}

export async function GET(request) {
  mongoose.connect(process.env.MONGO_URL);
  return NextResponse.json(await MenuItem.find());
}

export async function DELETE(request) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(request.url);
  const _id = url.searchParams.get("_id");
  await MenuItem.deleteOne({ _id });
  return NextResponse.json(true);
}
