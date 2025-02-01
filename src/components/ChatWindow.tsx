import type React from "react"
import { useEffect, useRef } from "react"
import { ChatMessage } from "./ChatMessage"
import { Loader } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"

export interface Message {
  id: string
  text: string
  isUser: boolean
}

export interface ChatWindowProps {
  messages: Message[]
  loading?: boolean
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, loading }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="h-full">
      <div className="max-w-3xl mx-auto py-4 space-y-6 px-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">Start a conversation by typing a message below.</div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && (
          <div className="flex justify-center py-4">
            <Loader className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}

