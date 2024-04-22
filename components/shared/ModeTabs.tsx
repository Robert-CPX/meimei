'use client'

import { useEffect, useState } from "react"
import { TabData, TabDataMobile } from "@/constants/constants"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useMeimei, ModeType } from "@/context/MeimeiProvider"
import { useMeimeiTime } from "@/context/MeimeiTimeProvider"

const ModeTabs = () => {
  const [modes, setModes] = useState(window.innerWidth > 768 ? TabData : TabDataMobile);
  const { mode: currentMode, setMode } = useMeimei();
  const { isRunning } = useMeimeiTime();

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setModes(TabData);
    } else {
      setModes(TabDataMobile);
    }
  }

  useEffect(() => {
    // handle subsequent resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative isolate z-10 flex h-[44px] items-center justify-center md:w-[248px] ${isRunning && 'hidden'}`}>
      <div className='absolute inset-0 -z-10 rounded-[22px] bg-dark opacity-50'></div>
      <Tabs defaultValue="companion" className='px-2 text-light'>
        <TabsList
          className="flex items-center justify-center gap-9 max-sm:gap-4"
          defaultValue={currentMode}>
          {modes.map((mode) => (
            <TabsTrigger
              key={mode.name}
              value={mode.value}
              className={`min-w-[80px] rounded-[20px] px-4 text-[0.75rem] font-[700px] uppercase leading-[15px] ${currentMode === mode.value && 'border border-dark bg-primary text-dark outline outline-offset-[-2] outline-primary'}`}
              onClick={() => setMode(mode.value as ModeType)}
            >
              {mode.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default ModeTabs