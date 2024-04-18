'use client'

import { TimeOptions } from '@/constants/constants'
import { Button } from "@/components/ui/button"
import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { COUNTDOWN_ID } from "@/constants/constants"

// TimeSelector component only show on mobile
const TimeSelector = () => {
  const [time, setTime] = useState("25")
  const [remainMinutes, setRemainMinutes] = useState("--")
  const [remainSeconds, setRemainSeconds] = useState("--")
  const [countdown, setCountdown] = useState(false)

  const handleConfirm = () => {
    setCountdown(true);
  }

  const handleCancel = () => {
    setCountdown(false);
  }

  useEffect(() => {
    if (!countdown) {
      // stop the countdown
      const countdownId = sessionStorage.getItem(COUNTDOWN_ID);
      if (countdownId) {
        clearInterval(parseInt(countdownId));
      }
      setRemainMinutes("--");
      setRemainSeconds("--");
    } else {
      // start the countdown
      const totalSeconds = parseInt(time) * 60;
      let remainingSeconds = totalSeconds;

      const countdownInterval = setInterval(() => {
        if (remainingSeconds <= 0) {
          // Countdown finished, handle completion logic here
          clearInterval(countdownInterval);
          setCountdown(false);
          return;
        }

        remainingSeconds--;
        const updatedMinutes = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
        const updatedSeconds = (remainingSeconds % 60).toString().padStart(2, "0");

        setRemainMinutes(updatedMinutes);
        setRemainSeconds(updatedSeconds);
      }, 1000);
      sessionStorage.setItem(COUNTDOWN_ID, countdownInterval.toString());
    }
    return () => {
      const countdownId = sessionStorage.getItem(COUNTDOWN_ID);
      if (countdownId) {
        clearInterval(parseInt(countdownId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown])

  return (
    <div className='flex w-full flex-col items-center gap-3 text-primary-light md:hidden'>
      {countdown ? (
        <div className='flex w-full items-center'>
          <div className='size-[40px]' />
          <span className='background-opacity flex-center mx-auto h-14 w-[128px] rounded-[28px] border border-primary-light text-[1rem] font-[500px] leading-[20px]'>
            {remainMinutes}:{remainSeconds}
          </span>
          <Button
            size="icon"
            className='background-opacity size-[40px] rounded-full border border-primary-light'
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
                className={`time-selector-item ${time === timeOption.value && 'background-opacity !border-primary-light'}`}
                onClick={() => setTime(timeOption.value)}
              >
                {timeOption.label}
              </Button>
            ))}
          </div>
          <Button
            size="icon"
            className='background-opacity size-[40px] rounded-full border border-primary-light'
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
