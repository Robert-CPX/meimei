"use client"

import { useEffect, useState } from "react";
import InputControl from "./InputControl";
import ChatHistoryWidget from "./ChatHistoryWidget";
import { ChatResponse } from "@/constants";
import { useMeimei } from "@/context/MeimeiProvider";
import SingleChatBox from "./SingleChatBox";
import MiniChatBubble from "./MiniChatBubble";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useMeimeiTime } from "@/context/MeimeiTimeProvider";
import { MEIMEI_EMOJI, MEIMEI_BEHAVIOR } from "@/constants/constants";

const systemPrompt = {
  role: "system",
  content:
    "Hi! I'm Meimei!",
};

const ChatRoom = () => {
  const [chatHistory, setChatHistory] = useState<ChatResponse[]>([systemPrompt])
  const [response, setResponse] = useState<ChatResponse | null>(null)// a response from AI
  const [prompt, setPrompt] = useState("");
  const { mode, reaction, setReaction } = useMeimei()
  const [isSneaking, setIsSneaking] = useState(false) // a flag to show/hide ChatHistory on desktop
  const { userId } = useAuth()
  const { isRunning } = useMeimeiTime()
  const { session } = useClerk()

  // once user click the send btn, add user input to chat history
  const handleUserInput = async (prompt: string) => {
    // update chat history immediately once user press enter key
    setChatHistory((prev) => [...prev, { role: "user", content: prompt }])
    askAI()
    setPrompt("")
  }

  const askAI = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/inworld`, {
        method: 'POST',
        body: JSON.stringify({
          text: prompt,
          endUserFullname: session?.user.username,
          endUserId: userId
        }),
      })
      const data = await response.json()
      const behavior = data.emotion.behavior as MEIMEI_BEHAVIOR
      setResponse({ role: "system", content: data.reply + MEIMEI_EMOJI[behavior] })
    } catch (error) {
      setResponse({ role: "system", content: "Meimei really don't know what to say to you:(" })
    }
  }

  const handleUserClickMiniChatBubble = () => {
    setIsSneaking(!isSneaking)
  }

  // update meimei reaction and chat history when AI response is received
  useEffect(() => {
    if (!response) return
    setChatHistory((prev) => [...prev, response])
    setReaction(`${reaction === "peaceful" ? 'dancing' : 'peaceful'}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  useEffect(() => {
    // reset chat history's UI when mode changes
    setIsSneaking(false)
  }, [mode])

  return (
    <>
      {!isRunning || isSneaking ? (
        <section className="chat-container">
          <div className="no-scrollbar flex flex-col overflow-y-auto overscroll-contain md:grow">
            <ChatHistoryWidget chatHistory={chatHistory} />
          </div>
          <InputControl
            prompt={prompt}
            setPrompt={setPrompt}
            handleInput={handleUserInput}
          />
        </section>
      ) : (
        <div className="flex w-full flex-col items-end gap-3 max-md:hidden">
          <SingleChatBox latestMessage={response?.content ?? ""} />
          <MiniChatBubble handleAction={handleUserClickMiniChatBubble} />
        </div>
      )}
    </>
  )
}

export default ChatRoom
