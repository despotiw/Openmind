"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function Chat() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || loading) return

    setLoading(true)
    setChat([...chat, { role: "user", content: message }])
    setMessage("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await response.json()
      setChat((prevChat) => [...prevChat, { role: "ai", content: data.response }])
    } catch (error) {
      console.error("Failed to send message:", error)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[400px] overflow-y-auto border rounded-md p-4 space-y-4">
          {chat.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

