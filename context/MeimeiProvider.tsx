"use client"

import { MeimeiEmotion } from "@/constants"
import React, { useState, createContext, useContext } from "react"

export type ModeType = "companion" | "focus" | "dredge-up"

type MeimeiContextType = {
  mode: ModeType
  setMode: (newMode: ModeType) => void
  emotion: MeimeiEmotion | null
  setEmotion: (newEmotion: MeimeiEmotion) => void
}

const MeimeiContext = createContext<MeimeiContextType | undefined>(undefined)

export const MeimeiProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [mode, setMode] = useState<ModeType>("companion")
  const [emotion, setEmotion] = useState<MeimeiEmotion | null>(null)

  return (
    <MeimeiContext.Provider value={{ mode, setMode, emotion, setEmotion }}>
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