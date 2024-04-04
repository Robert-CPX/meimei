import { useEffect, useState } from "react";

type ChatContainerProps = {
  chatHistory: ChatCompletionRequestMessage[];
}

const ChatContainer = ({ chatHistory }: ChatContainerProps) => {
  const [displayResponse, setDisplayResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
  });

  return (
    <div className="max-h-0">
      {chatHistory.map((message, index) => (
        <div key={index}>
        </div>
      ))}
    </div>
  )
}

export default ChatContainer
