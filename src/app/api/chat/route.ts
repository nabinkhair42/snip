import { NextResponse } from "next/server";

const lmStudioUrl = process.env.NEXT_PUBLIC_LM_STUDIO_URL;
export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await fetch(`${lmStudioUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: message }] })
    });

    if (!response.body) throw new Error("ReadableStream not supported.");

    return new Response(response.body, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
} 