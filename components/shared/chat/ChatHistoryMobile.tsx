'use client'

import { useMeimei } from "@/context/MeimeiProvider"

const ChatHistoryMobile = () => {
  const { mode } = useMeimei()

  return (
    <section className={`-mx-4 -mb-4 -mt-28 grow bg-light opacity-80 md:hidden ${mode === 'dredge-up' ? "flex" : "hidden"}`}>
    </section>
  )
}

export default ChatHistoryMobile