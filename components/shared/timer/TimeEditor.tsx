'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { isNumberInRange, formatMinutesAndSeconds } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const COUNTDOWN_ID = 'time_editor_countdown_id';

const TimeEditor = () => {
  const [minutes, setMinutes] = useState("25")
  const [seconds, setSeconds] = useState("00")

  const [countdown, setCountdown] = useState(false)

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
    setCountdown(!countdown);
  }

  useEffect(() => {
    if (!countdown) {
      // stop the countdown
      const countdownId = sessionStorage.getItem(COUNTDOWN_ID);
      if (countdownId) {
        clearInterval(parseInt(countdownId));
      }
      setMinutes("25");
      setSeconds("00");
    } else {
      // start the countdown
      const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
      let remainingSeconds = totalSeconds;

      const countdownInterval = setInterval(() => {
        if (remainingSeconds <= 0) {
          clearInterval(countdownInterval);
          // Countdown finished, handle completion logic here
          setCountdown(false);
          return;
        }

        remainingSeconds--;
        const updatedMinutes = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
        const updatedSeconds = (remainingSeconds % 60).toString().padStart(2, "0");

        setMinutes(updatedMinutes);
        setSeconds(updatedSeconds);
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
    <div className="flex-center relative isolate h-[54px] max-md:hidden md:w-[248px]">
      <div className="absolute inset-0 -z-10 rounded-[22px] bg-dark opacity-50"></div>
      <div className="flex w-full items-center justify-between px-3 text-primary-light">
        <div className="flex-center ml-10 gap-1">
          <Input
            id="minutes"
            className="input-time-editor"
            value={minutes}
            disabled={countdown}
            onChange={handleMinutesChange}
          />
          <span>:</span>
          <Input
            id="seconds"
            className="input-time-editor"
            value={seconds}
            disabled={countdown}
            onChange={handleSecondsChange}
          />
        </div>
        <Button
          className="h-[40px] w-[80px] rounded-[20px] bg-dark text-[1rem] font-[500px] leading-[20px]"
          onClick={handleCountDownAction}
        >
          {countdown ? "Stop" : "Start"}
        </Button>
      </div>
    </div>
  )
}

export default TimeEditor