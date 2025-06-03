import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("Bad request", { status: 400 });
}
