'use client'

import React, { useState, createContext, useContext, useEffect } from "react"
import { toggleMode } from "@/lib/actions/interaction.actions"
import { useAuth } from "@clerk/nextjs"

export type ModeType = "companion" | "focus" | "dredge-up"

type MeimeiContextType = {
  mode: ModeType
  setMode: (newMode: ModeType) => void
  reaction: string
  setReaction: (newReaction: string) => void
}

const MeimeiContext = createContext<MeimeiContextType | undefined>(undefined)

export const MeimeiProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [mode, setMode] = useState<ModeType>("companion")
  const [reaction, setReaction] = useState('peaceful')
  const { userId } = useAuth()

  useEffect(() => {
    saveUserInteraction(mode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  // save user interaction to db
  const saveUserInteraction = async (mode: ModeType) => {
    if (userId) {
      await toggleMode({ mode, userId })
    }
  }

  return (
    <MeimeiContext.Provider value={{ mode, setMode, reaction, setReaction }}>
      {children}
    </MeimeiContext.Provider>
  )
}

export function useMeimei() {
  const context = useContext(MeimeiContext)
  if (context === undefined) {
    throw new Error('useMeimei must be used within a MeimeiProvider')
  }
  return context
}

export default MeimeiProvider