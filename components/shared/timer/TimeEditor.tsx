'use client'

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { isNumberInRange, formatMinutesAndSeconds } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useMeimei } from "@/context/MeimeiProvider"
import { useMeimeiTime } from "@/context/MeimeiTimeProvider"

// TimeEditor component only show on desktop
const TimeEditor = () => {
  const [minutes, setMinutes] = useState("25")
  const [seconds, setSeconds] = useState("00")
  const { mode } = useMeimei()
  const { time: countdown, setTime: setCountdown, isRunning } = useMeimeiTime()

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNumberInRange(value)) { return; }
    setMinutes(formatMinutesAndSeconds(value));
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNumberInRange(value)) { return; }
    setSeconds(formatMinutesAndSeconds(value));
  };

  // user start or stop the countdown
  const handleCountDownAction = () => {
    console.log('handleCountDownAction:', isRunning)
    if (isRunning) {
      setCountdown(0);
    } else {
      setCountdown(parseInt(minutes) * 60 + parseInt(seconds));
    }
  };

  // update ui when time change
  useEffect(() => {
    setMinutes(formatMinutesAndSeconds(Math.floor(countdown / 60).toString()))
    setSeconds(formatMinutesAndSeconds((countdown % 60).toString()))
  }, [countdown])

  return (
    <div className={`relative isolate flex h-[54px] items-center justify-center max-md:hidden md:w-[248px] ${(mode === 'companion' || mode === 'dredge-up') && "hidden"}`}>
      <div className="background-opacity absolute inset-0 -z-10 rounded-[22px]"></div>
      <div className="flex w-full items-center justify-between px-3 text-primary-light">
        <div className="ml-10 flex items-center justify-center gap-1">
          <Input
            id="minutes"
            className="input-time-editor"
            value={minutes}
            disabled={isRunning}
            onChange={handleMinutesChange}
          />
          <span>:</span>
          <Input
            id="seconds"
            className="input-time-editor"
            value={seconds}
            disabled={isRunning}
            onChange={handleSecondsChange}
          />
        </div>
        <Button
          className="h-[40px] w-[80px] rounded-[20px] bg-dark text-[1rem] font-[500px] leading-[20px]"
          onClick={handleCountDownAction}
        >
          {isRunning ? "Stop" : "Start"}
        </Button>
      </div>
    </div>
  )
}

export default TimeEditor