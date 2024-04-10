"use client"

import { useEffect, useRef, useState } from "react";
import { ChatResponse } from "../../../constants";
import CursorSVG from "../../icons/CursorSVG";

type ChatHistoryProps = {
  chatHistory: ChatResponse[];
}

const ChatHistory = ({ chatHistory }: ChatHistoryProps) => {
  const [displayResponse, setDisplayResponse] = useState("")
  const [completedTyping, setCompletedTyping] = useState(false)
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

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
        scrollToBottom()
      }
    }, 30)
    scrollToBottom()
    return () => clearInterval(intervalId)
  }, [chatHistory])

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="max-h-0">
      {chatHistory.map((message, index) => (
        <div key={index}>
          {(index === chatHistory.length - 1 && message.role !== "user") ? (
            <div className="chat chat-start">
              <span className="chat-bubble whitespace-pre-line break-words bg-[#333333] text-white opacity-50 before:!content-none">
                {displayResponse}
                {!completedTyping && <CursorSVG />}
              </span>
            </div>
          ) : (
            <div className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}>
              <span className="chat-bubble whitespace-pre-line break-words bg-[#333333] text-white opacity-50 before:!content-none">{message.content}</span>
            </div>
          )}
        </div>
      ))}
      {/* An invisible div to mark the end of messages*/}
      <div ref={endOfMessagesRef} />
    </div>
  )
}

export default ChatHistory