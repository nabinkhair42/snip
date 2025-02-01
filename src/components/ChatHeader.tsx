import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import ThemeToggle from "./extended/theme-toggle";
import ClearConversation from "./extended/clear-conversation";

interface ChatHeaderProps {
  clearConversation: () => void;
}
const lmStudioUrl = process.env.NEXT_PUBLIC_LM_STUDIO_URL;
export const ChatHeader: React.FC<ChatHeaderProps> = ({ clearConversation }) => {


  const [modelName, setModelName] = useState("N/A");

  useEffect(() => {
    // Fetch available models from LM Studio.
    fetch(`${lmStudioUrl}/v1/models`)
      .then((res) => res.json())
      .then((data) => {
        // Use the first model from the returned data array.
        if (data.data && data.data.length > 0) {
          setModelName(data.data[0].id);
        } else {
          setModelName("N/A");
        }
      })
      .catch(() => setModelName("N/A"));
  }, []);

  return (
    <header className="p-4 border-b">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Chat App</h1>
          <Badge variant="outline">
            Model: <span className="font-medium">{modelName}</span>
          </Badge>
          <div className="flex gap-2">
            <ThemeToggle />
            <ClearConversation clearConversation={clearConversation} />
          </div>
        </div>
      </div>
    </header>
  );
}; 