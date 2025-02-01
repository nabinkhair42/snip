import type React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "../lib/utils"
import { Avatar } from "./ui/avatar"
import { User, Bot } from "lucide-react"

interface ChatMessageProps {
  message: string
  isUser?: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser = false }) => {
  return (
    <div className={cn("flex items-start gap-4", isUser && "flex-row-reverse")}>
      <Avatar className={cn("flex items-center border border-muted-foreground justify-center")}>
        {isUser ? <User /> : <Bot />}
      </Avatar>
      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[85%] break-words",
          isUser ? "bg-muted " : "bg-muted",
        )}
      >
        <Markdown className="prose prose-sm dark:prose-invert max-w-none" remarkPlugins={[remarkGfm]}>
          {message}
        </Markdown>
      </div>
    </div>
  )
}

