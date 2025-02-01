import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ThemeToggle from "./extended/theme-toggle";
import { GiSniffingDog } from "react-icons/gi";
import { Menu } from "lucide-react";
import ClearConversation from "./extended/clear-conversation";
import { Badge } from "./ui/badge";

interface ChatHeaderProps {
  toggleSidebar: () => void;
  clearConversation: () => void;
}

const lmStudioUrl = process.env.NEXT_PUBLIC_LM_STUDIO_URL;

export const ChatHeader: React.FC<ChatHeaderProps> = ({ toggleSidebar, clearConversation }) => {
  const [modelName, setModelName] = useState("Loading...");

  useEffect(() => {
    const fetchModelName = async () => {
      try {
        const response = await fetch(`${lmStudioUrl}/v1/models`);
        const data = await response.json();
        setModelName(data.data[0]?.id || "Unknown");
      } catch (error) {
        setModelName("Unknown");
      }
    };

    fetchModelName();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background px-4">
      <div className="mx-auto max-w-4xl flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <LogoUI />
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={"outline"}>
            {modelName}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ClearConversation clearConversation={clearConversation} />
        </div>
      </div>
    </header>
  );
};

export const LogoUI = () => {
  return (
    <div className="flex items-center gap-2">
      <GiSniffingDog className="h-6 w-6 shrink-0 text-primary" />
      <h1 className="hidden text-xl font-bold md:inline-block">Snip AI</h1>
    </div>
  );
};
