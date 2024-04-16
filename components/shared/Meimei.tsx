"use client"

import { useState, useRef, useEffect } from "react"
import { meimei_0, meimei_1 } from "@/constants/constants"
import { useMeimei } from "@/context/MeimeiProvider"
import { VideoSource } from "@/constants"

const Meimei = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoSrc, setVideoSrc] = useState<VideoSource | null>(meimei_0)
  const { reaction } = useMeimei()

  useEffect(() => {
    if (reaction === "peaceful") {
      setVideoSrc(meimei_0)
    } else {
      setVideoSrc(meimei_1)
    }
  }, [reaction])

  return (
    <video ref={videoRef}
      autoPlay muted playsInline loop
      className="size-full object-cover"
      key={videoSrc?.label}
    >
      <source src={videoSrc?.src} type="video/mp4" />
    </video>
  )
}

export default Meimei
