"use client"

import { useCallback, useEffect, useState } from "react";
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
  const [response, setResponse] = useState<ChatResponse | null>(null)
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [prompt, setPrompt] = useState("");
  const { reaction, setReaction } = useMeimei()

  // once user click the send btn, add user input to chat history
  const handleUserInput = useCallback(async (prompt: string) => {
    // update UI with user's input immediately
    setChatHistory((prev) => [...prev, { role: "user", content: prompt }])
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
    setPrompt("")
  }, [chatHistory])

  // handle response from server
  useEffect(() => {
    if (response) {
      setChatHistory((prev) => [...prev, response])
      setLoadingResponse(false)
      setReaction(`${reaction === "peaceful" ? 'dancing' : 'peaceful'}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setReaction])

  return (
    <section className="flex size-full flex-col px-4 md:gap-y-4 md:pb-4">
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
