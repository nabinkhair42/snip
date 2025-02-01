"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Chat {
  id: string
  title: string
}

export interface SidebarProps {
  chats: Chat[]
  onSelectChat: (chat: Chat) => void
  onNewChat: () => void
  selectedChatId?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ chats, onSelectChat, onNewChat, selectedChatId }) => {
  return (
    <div className="flex w-64 flex-col overflow-hidden bg-background border-r">
      <div className="p-4 border-b h-[69px]">
        <Button onClick={onNewChat} variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" /> Add Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {chats.map((chat) => (
            <Button
              variant="ghost"
              key={chat.id}
              className={cn(
                "w-full justify-start gap-2",
                selectedChatId === chat.id ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
              onClick={() => onSelectChat(chat)}
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

