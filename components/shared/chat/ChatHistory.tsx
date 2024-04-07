"use client"

import { useEffect, useState } from "react";
import { ChatResponse } from "../../../constants";
import CursorSVG from "../../icons/CursorSVG";

type ChatHistoryProps = {
  chatHistory: ChatResponse[];
}

const ChatHistory = ({ chatHistory }: ChatHistoryProps) => {
  const [displayResponse, setDisplayResponse] = useState("")
  const [completedTyping, setCompletedTyping] = useState(false)

  // mimic ChatGPT typewriter effect
  useEffect(() => {
    if (!chatHistory.length) return
    setCompletedTyping(false)
    const lastResponse = chatHistory[chatHistory.length - 1].content
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayResponse(lastResponse.slice(0, i))
      i++
      if (i > lastResponse.length) {
        clearInterval(intervalId)
        setCompletedTyping(true)
      }
    }, 30)
    return () => clearInterval(intervalId)
  }, [chatHistory])

  return (
    <div className="max-h-0">
      {chatHistory.map((message, index) => (
        <div key={index}>
          {index === chatHistory.length - 1 ? (
            <div className="chat chat-start">
              <span className="chat-bubble whitespace-pre-line bg-[#333333] text-white opacity-50">
                {displayResponse}
                {!completedTyping && <CursorSVG />}
              </span>
            </div>
          ) : (
            <div className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}>
              <span className="chat-bubble whitespace-pre-line bg-[#333333] text-white opacity-50">{message.content}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChatHistory
