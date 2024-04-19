'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"

type MiniChatBubbleProps = {
  handleAction: () => void
}

const MiniChatBubble = ({ handleAction }: MiniChatBubbleProps) => {

  return (
    <Button size="icon" className="size-[48px] rounded-full bg-dark p-2 text-light opacity-50" onClick={handleAction}>
      <Image src="/assets/icons/bubble-small.svg" width={48} height={48} alt="chat bubble" />
    </Button>
  )
}

export default MiniChatBubble
