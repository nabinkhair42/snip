"use client";

import React, { useState, useEffect } from "react";
import { ChatWindow, Message } from "../components/ChatWindow";
import { ChatInput } from "../components/ChatInput";
import { ChatHeader } from "../components/ChatHeader";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const sendMessage = async (text: string) => {
    const userMessage: Message = { id: uuidv4(), text, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const contextString = updatedMessages
        .map((m) => (m.isUser ? "User: " : "Bot: ") + m.text)
        .join("\n");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: contextString })
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
      setMessages((prev) => [...prev, { id: uuidv4(), text: replyText, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: uuidv4(), text: "Error contacting the API.", isUser: false }]);
    }
    setLoading(false);
  };

  const clearConversation = () => setMessages([]);

  if (!mounted) return null;
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader clearConversation={clearConversation} />
      
      <main className="flex-grow overflow-y-auto max-w-4xl mx-auto border-l border-r w-full p-4">
        <ChatWindow messages={messages} loading={loading} />
      </main>
      <footer className="border-t">
        <ChatInput onSend={sendMessage} />
      </footer>
    </div>
  );
}