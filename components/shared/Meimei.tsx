"use client"

import { useState, useRef, useEffect } from "react"
import { meimei_0, meimei_1 } from "@/constants/constants"
import { useMeimei } from "@/context/MeimeiProvider"

const Meimei = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState(meimei_0)
  const { mood } = useMeimei()

  const handleMouseMove = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseMove)
    return () => {
      window.removeEventListener("mousedown", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (mood === "closing") {
      setVideoSrc(meimei_1)
    } else if (mood === "peaceful") {
      setVideoSrc(meimei_0)
    }
  }, [mood])

  return (
    <div className="fixed left-0 top-0 -z-50 size-full overflow-hidden">
      <video ref={videoRef} autoPlay playsInline loop className="size-full object-cover" key={videoSrc.label}>
        <source src={videoSrc.src} type="video/mp4" />
      </video>
    </div>
  )
}

export default Meimei
