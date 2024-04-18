'use client'

import { useEffect, useState } from "react"
import { Modes, ModesMobile } from "@/constants/constants"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const ModeTabs = () => {
  const [modes, setModes] = useState(Modes);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setModes(Modes);
      } else {
        setModes(ModesMobile);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex-center relative isolate h-[44px] md:w-[248px]">
      <div className="absolute inset-0 -z-10 rounded-[22px] bg-dark opacity-50"></div>
      <Tabs defaultValue="companion" className="px-2 text-light">
        <TabsList className="flex-center gap-9 max-sm:gap-4">
          {modes.map((mode) => (
            <TabsTrigger key={mode.value} value={mode.value} className="mode-tabs-trigger">{mode.value}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default ModeTabs