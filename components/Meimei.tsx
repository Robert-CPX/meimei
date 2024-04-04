"use client"

import { useState, useRef, useEffect } from "react"
import { dancingGirl, amikoUpperbody, amikoWholebody } from "@/constants/constants"

const Meimei = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState(amikoUpperbody)

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

  return (
    <div className="fixed left-0 top-0 -z-50 size-full overflow-hidden">
      <video ref={videoRef} autoPlay playsInline loop className="size-full object-cover" key={videoSrc.label}>
        <source src={videoSrc.src} type="video/mp4" />
      </video>
    </div>
  )
}

export default Meimei
