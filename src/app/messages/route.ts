import connect from "@/lib/db";
import Message from "@/lib/modals/message";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const messages = await Message.find();
    return NextResponse.json(messages, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error fetching users " + err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connect();
    const newMessage = new Message(body);
    await newMessage.save();
    return NextResponse.json(
      { text: "Message is created", message: newMessage },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        message: "Something went wrong " + err.message,
      },
      {
        status: 500,
      }
    );
  }
}
