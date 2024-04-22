// Desc: background for chat history on mobile

'use client'
import { useMeimei } from "@/context/MeimeiProvider"

const ChatMobileBackground = () => {
  const { mode } = useMeimei()
  return (
    <div className={`absolute inset-x-0 bottom-0 -z-50 h-[35%] w-full bg-gradient-to-t from-dark to-transparent md:hidden ${(mode === 'dredge-up' || mode === 'focus') && 'hidden'}`} />
  )
}

export default ChatMobileBackground
