"use client"

import { useEffect, useState } from "react";
import InputControl from "./InputControl";
import ChatHistory from "./ChatHistory";
import { ChatResponse } from "@/constants";
import { useMeimei } from "@/context/MeimeiProvider";

const systemPrompt = {
  role: "system",
  content:
    "Hi! I'm Meimei, your learning buddy. Ready to explore and learn together? Let's get started!",
};

const ChatRoom = () => {
  const [chatHistory, setChatHistory] = useState<ChatResponse[]>([systemPrompt])
  const [response, setResponse] = useState<ChatResponse | null>(null)// a response from AI
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [prompt, setPrompt] = useState("");
  const { reaction, setReaction } = useMeimei()

  // once user click the send btn, add user input to chat history
  const handleUserInput = (prompt: string) => {
    // update chat history immediately once user press enter key
    setChatHistory((prev) => [...prev, { role: "user", content: prompt }])
    askAI()
    setPrompt("")
  }

  const askAI = async () => {
    try {
      setLoadingResponse(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, {
        method: 'POST',
        body: JSON.stringify(chatHistory),
      })
      const data = await response.json()
      setResponse(data.message)
    } catch (error) {
      setResponse({ role: "system", content: "Meimei really don't know what to say to you:(" })
    }
  }

  // update meimei reaction and chat history when AI response is received
  useEffect(() => {
    if (!response) return
    setChatHistory((prev) => [...prev, response])
    setLoadingResponse(false)
    setReaction(`${reaction === "peaceful" ? 'dancing' : 'peaceful'}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  return (
    <section className="flex grow flex-col">
      <div className="no-scrollbar flex grow flex-col overflow-y-auto overscroll-contain">
        <ChatHistory chatHistory={chatHistory} />
      </div>
      <InputControl
        prompt={prompt}
        setPrompt={setPrompt}
        handleInput={handleUserInput}
        loading={loadingResponse}
      />
    </section>
  )
}

export default ChatRoom
