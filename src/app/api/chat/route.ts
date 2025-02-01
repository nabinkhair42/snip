import { NextResponse } from "next/server";

const lmStudioUrl = process.env.NEXT_PUBLIC_LM_STUDIO_URL;
export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await fetch(`${lmStudioUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // LM Studio expects a messages array with role and content.
      body: JSON.stringify({ messages: [{ role: "user", content: message }] })
    });

    if (!response.body) throw new Error("ReadableStream not supported.");
    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");
    let resultText = "";
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      resultText += decoder.decode(value || new Uint8Array(), { stream: !done });
    }

    const parsedResponse = JSON.parse(resultText);
    const replyText =
      parsedResponse.reply ??
      parsedResponse.choices?.[0]?.message?.content ??
      "No reply from API.";

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const chunk = JSON.stringify({ reply: replyText });
        controller.enqueue(encoder.encode(chunk));
        controller.close();
      }
    });

    return new Response(stream, { headers: { "Content-Type": "application/json" } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
} 