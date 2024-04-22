// Desc: Display chat history in ChatRoom.tsx, different design on mobile and desktop.
"use client"

import { useEffect, useRef, useState } from "react";
import { ChatResponse } from "../../../constants";
import CursorSVG from "../../icons/CursorSVG";
import React from "react";

type ChatHistoryWidgetProps = {
  chatHistory: ChatResponse[];
}

const ChatHistoryWidget = ({ chatHistory }: ChatHistoryWidgetProps) => {
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
    <div className="flex flex-col">
      {chatHistory.map((message, index) => (
        <React.Fragment key={index}>
          {(index === chatHistory.length - 1 && message.role !== "user") ? (
            <div className="chat-ai chat-bubble-background">
              <span className="chat-text">
                {displayResponse}
                {!completedTyping && <CursorSVG />}
              </span>
            </div>
          ) : (
            <div className={`chat-bubble-background ${message.role === "user" ? "chat-user" : "chat-ai"}`}>
              <span className="chat-text">{message.content}</span>
            </div>
          )}
        </React.Fragment>
      ))}
      {/* An invisible div to mark the end of messages*/}
      <div ref={endOfMessagesRef} />
    </div>
  )
}

export default ChatHistoryWidget