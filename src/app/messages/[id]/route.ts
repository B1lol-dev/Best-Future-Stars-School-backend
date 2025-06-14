import connect from "@/lib/db";
import Message from "@/lib/modals/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    await connect();
    const message = await Message.findById(params.id);

    if (!message) {
      return NextResponse.json(
        { message: "Not Found" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    return NextResponse.json(message, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error " + err.message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    await connect();
    const deletedMessage = await Message.findByIdAndDelete(params.id);
    return NextResponse.json({
      text: "Message deleted successfully",
      message: deletedMessage,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error " + err.message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
