import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { type Chat  } from "../components/Sidebar"
import { Message } from "@/components/ChatWindow"

const generateDefaultTitle = () => {
  const date = new Date()
  return `Chat - ${date.toLocaleTimeString()}`
}

const generateTitleFromMessage = (message: string) => {
  const titleText = message.split('\n')[0].slice(0, 30)
  return titleText.length < message.length ? titleText + '...' : titleText
}

export const useChat = () => {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  useEffect(() => {
    setMounted(true)
    try {
      const savedChats = localStorage.getItem('chats')
      const initialChat = { 
        id: uuidv4(), 
        title: generateDefaultTitle(), 
        messages: [] 
      }
      const parsedChats: Chat[] = savedChats ? JSON.parse(savedChats) : [initialChat]
      setChats(parsedChats)
      setSelectedChat(parsedChats[0])
      setMessages(parsedChats[0].messages)
    } catch (error) {
      console.error("Error loading chats:", error)
      const initialChat = { 
        id: uuidv4(), 
        title: generateDefaultTitle(), 
        messages: [] 
      }
      setChats([initialChat])
      setSelectedChat(initialChat)
    }
  }, [])

  useEffect(() => {
    if (mounted && chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats))
    }
  }, [chats, mounted])

  const sendMessage = async (text: string) => {
    if (!selectedChat) return

    const userMessage: Message = { id: uuidv4(), text, isUser: true }
    const updatedMessages = [...messages, userMessage]
    
    let updatedChat = selectedChat
    if (selectedChat.messages.length === 0) {
      updatedChat = {
        ...selectedChat,
        title: generateTitleFromMessage(text),
        messages: updatedMessages
      }
    } else {
      updatedChat = {
        ...selectedChat,
        messages: updatedMessages
      }
    }

    setMessages(updatedMessages)
    setSelectedChat(updatedChat)
    setChats(prevChats => prevChats.map(chat => 
      chat.id === selectedChat.id ? updatedChat : chat
    ))

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
      const replyMessage: Message = { id: uuidv4(), text: replyText, isUser: false }
      const finalMessages = [...updatedMessages, replyMessage]
      
      setMessages(finalMessages)
      setChats(prevChats => prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: finalMessages }
          : chat
      ))
    } catch (error) {
      setMessages((prev) => [...prev, { id: uuidv4(), text: "Error contacting the API.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    const newChat = { 
      id: uuidv4(), 
      title: generateDefaultTitle(), 
      messages: [] 
    }
    setChats(prev => [newChat, ...prev])
    setSelectedChat(newChat)
    setMessages([])
  }

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    setMessages(chat.messages)
  }

  const clearConversation = () => {
    if (selectedChat) {
      setMessages([])
      setChats(prevChats => prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [] }
          : chat
      ))
    }
  }

  return {
    mounted,
    messages,
    loading,
    chats,
    selectedChat,
    sendMessage,
    handleNewChat,
    handleSelectChat,
    clearConversation
  }
}
