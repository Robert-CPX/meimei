'use client'

import { TimeOptions } from '@/constants/constants'
import { Button } from "@/components/ui/button"
import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMeimei } from "@/context/MeimeiProvider"
import { useMeimeiTime } from "@/context/MeimeiTimeProvider"

// TimeSelector component only show on mobile
const TimeSelector = () => {
  const [time, setTime] = useState(0)
  const [remainMinutes, setRemainMinutes] = useState("--")
  const [remainSeconds, setRemainSeconds] = useState("--")
  const { mode } = useMeimei()
  const { time: countdown, setTime: setCountdown } = useMeimeiTime()

  const handleConfirm = () => {
    setCountdown(time);
  }

  const handleCancel = () => {
    setCountdown(0);
  }

  useEffect(() => {
    setRemainMinutes(Math.floor(countdown / 60).toString().padStart(2, '0'))
    setRemainSeconds((countdown % 60).toString().padStart(2, '0'))
  }, [countdown])

  return (
    <div className={`flex w-full flex-col items-center gap-3 text-primary-light md:hidden ${mode === 'companion' && "hidden"} ${mode === 'dredge-up' && "hidden"}`}>
      {countdown ? (
        <div className='flex w-full items-center'>
          <div className='size-[40px]' />
          <span className='mx-auto flex h-14 w-[128px] items-center justify-center rounded-[28px] border border-primary-light bg-dark/50 text-[1rem] font-[500px] leading-[20px]'>
            {remainMinutes}:{remainSeconds}
          </span>
          <Button
            size="icon"
            className='size-[40px] rounded-full border border-primary-light bg-dark/50'
            onClick={handleCancel}
          >
            <X />
          </Button>
        </div>
      ) : (
        <>
          <div className='time-selector-background no-scrollbar flex h-12 w-screen overflow-x-scroll'>
            {TimeOptions.map((timeOption) => (
              <Button
                key={timeOption.id}
                className={`time-selector-item ${time === parseInt(timeOption.value) && '!border-primary-light bg-dark/50'}`}
                onClick={() => setTime(parseInt(timeOption.value))}
              >
                {timeOption.label}
              </Button>
            ))}
          </div>
          <Button
            size="icon"
            className='size-[40px] rounded-full border border-primary-light bg-dark/50'
            onClick={handleConfirm}
          >
            <Check />
          </Button>
        </>
      )}
    </div>
  )
}

export default TimeSelector
