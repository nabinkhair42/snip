import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSend: (message: string) => void
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="flex items-center gap-2 border rounded-lg px-2 py-1 bg-muted">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown = {handleKeyDown}
          placeholder="Type a message..."
          className="border-none focus-visible:ring-0 resize-none bg-transparent max-h-[40px]"
        />
        <Button onClick={handleSend} size="icon" variant="ghost" className="rounded-full">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

