import React from "react";

export const ChatSkeleton: React.FC = () => {
  return (
    <div className="p-4 text-sm text-center text-muted animate-pulse">
      Thinking...
    </div>
  );
}; 