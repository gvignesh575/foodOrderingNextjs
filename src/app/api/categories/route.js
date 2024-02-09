import { Category } from "@/app/models/Category";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { name } = await request.json();
  const categoryDoc = await Category.create({ name });
  return NextResponse.json(categoryDoc);
}
