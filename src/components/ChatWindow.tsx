import React from "react";
import { ChatMessage } from "./ChatMessage";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export interface ChatWindowProps {
  messages: Message[];
  loading?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, loading }) => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4 h-full">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
      ))}
      {loading && (
        <div className="p-4 text-sm text-center text-muted animate-pulse">Thinking...</div>
      )}
    </div>
  );
}; 