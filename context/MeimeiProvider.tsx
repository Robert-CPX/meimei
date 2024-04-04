'use client'

import React, { useState, createContext, useContext } from "react"

type MeimeiContextType = {
  mood: string
  setMood: (newMood: string) => void
}

const MeimeiContext = createContext<MeimeiContextType | undefined>(undefined)

export const MeimeiProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [mood, setMood] = useState('peaceful')

  return (
    <MeimeiContext.Provider value={{ mood, setMood }}>
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