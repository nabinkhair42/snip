"use client"

import { useState } from "react"
import { ChatWindow } from "../components/ChatWindow"
import { ChatInput } from "../components/ChatInput"
import { ChatHeader } from "../components/ChatHeader"
import { Sidebar } from "../components/Sidebar"
import { cn } from "../lib/utils"
import { useChat } from "../hooks/useChat"

export default function Home() {
  const {
    mounted,
    messages,
    loading,
    chats,
    selectedChat,
    sendMessage,
    handleNewChat,
    handleSelectChat,
    clearConversation
  } = useChat()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

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

