import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser = false }) => {
  return (
    <div className={`p-3 rounded-md max-w-xl animate-fadeIn ${isUser ? "self-end bg-secondary text-secondary-foreground" : "self-start bg-muted text-foreground"}`}>
      <Markdown className="whitespace-pre-wrap break-words overflow-clip overflow-x-auto" remarkPlugins={[remarkGfm]}>
        {message}
      </Markdown>
    </div>
  );
}; 