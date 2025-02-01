"use client"

import { useState, useEffect } from "react"
import { ChatWindow, type Message } from "../components/ChatWindow"
import { ChatInput } from "../components/ChatInput"
import { ChatHeader } from "../components/ChatHeader"
import { v4 as uuidv4 } from "uuid"
import { Sidebar, type Chat } from "../components/Sidebar"
import { X } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState<Chat[]>([{ id: "default", title: "New Chat" }])
  const [selectedChat, setSelectedChat] = useState<Chat>(chats[0])
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sendMessage = async (text: string) => {
    const userMessage: Message = { id: uuidv4(), text, isUser: true }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const contextString = [...messages, userMessage]
        .map((m) => (m.isUser ? "User: " : "Assistant: ") + m.text)
        .join("\n")

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: contextString }),
      })

      if (!response.ok) throw new Error("API error")
      const data = await response.json()
      const replyText = data.reply ?? data.choices?.[0]?.message?.content ?? "No reply from API."
      setMessages((prev) => [...prev, { id: uuidv4(), text: replyText, isUser: false }])
    } catch (error) {
      setMessages((prev) => [...prev, { id: uuidv4(), text: "Error contacting the API.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    const newChat = { id: uuidv4(), title: "New Chat" }
    setChats((prev) => [newChat, ...prev])
    setSelectedChat(newChat)
    setMessages([])
  }

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    setMessages([])
    setSidebarOpen(false)
  }

  const clearConversation = () => {
    setMessages([])
  }

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block border-r">
        <Sidebar
          chats={chats}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          selectedChatId={selectedChat?.id}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity md:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          
          <Sidebar
            chats={chats}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            selectedChatId={selectedChat?.id}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <ChatHeader toggleSidebar={() => setSidebarOpen(true)} clearConversation={clearConversation} />
        <main className="flex-1 overflow-hidden">
          <ChatWindow messages={messages} loading={loading} />
        </main>
        <footer className="border-t bg-background">
          <ChatInput onSend={sendMessage} />
        </footer>
      </div>
    </div>
  )
}

