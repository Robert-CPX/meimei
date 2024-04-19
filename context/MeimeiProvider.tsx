'use client'

import React, { useState, createContext, useContext } from "react"

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