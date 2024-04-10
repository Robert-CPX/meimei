"use client"

import { useState, useRef, useEffect } from "react"
import { meimei_0, meimei_1 } from "@/constants/constants"
import { useMeimei } from "@/context/MeimeiProvider"
import { VideoSource } from "@/constants"

const Meimei = () => {
  const currentVideoRef = useRef<HTMLVideoElement | null>(null)
  const nextVideoRef = useRef<HTMLVideoElement | null>(null)
  const [currentVideoSrc, setCurrentVideoSrc] = useState<VideoSource | null>(meimei_0)
  const [nextVideoSrc, setNextVideoSrc] = useState<VideoSource | null>(null)
  const { reaction } = useMeimei()

  useEffect(() => {
    const nextVideo = nextVideoRef.current
    if (!nextVideo) return

    const nextSource = reaction === "dancing" ? meimei_1 : meimei_0

    nextVideo.src = nextSource.src
    nextVideo.load()
    const handleCanPlay = () => {
      const currentVideo = currentVideoRef.current
      if (!currentVideo) return
      nextVideo.removeEventListener("canplaythrough", handleCanPlay)

      setCurrentVideoSrc(nextSource)
      setNextVideoSrc(null)
      currentVideoRef.current = nextVideoRef.current
      nextVideoRef.current = currentVideo
    }
    nextVideo.addEventListener("canplaythrough", handleCanPlay)
  }, [reaction])

  return (
    <div className="fixed left-0 top-0 -z-50 size-full overflow-hidden">
      <video ref={currentVideoRef}
        autoPlay muted playsInline loop
        className={`size-full object-cover ${nextVideoSrc ? "hidden" : "block"}`}
        key={currentVideoSrc?.label}
      >
        <source src={currentVideoSrc?.src} type="video/mp4" />
      </video>
      <video
        ref={nextVideoRef}
        autoPlay muted playsInline loop
        className={`size-full object-cover ${currentVideoSrc ? "hidden" : "block"}`}
        key={nextVideoSrc?.label}
      >
        <source src={nextVideoSrc?.src} type="video/mp4" />
      </video>
    </div>
  )
}

export default Meimei
