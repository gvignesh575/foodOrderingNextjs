import { NextResponse } from "next/server";

export function POST(request) {
  return NextResponse.json({ message: "success" });
}
