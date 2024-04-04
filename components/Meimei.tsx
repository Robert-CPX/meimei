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
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden">
      <video ref={videoRef} autoPlay playsInline loop className="object-cover w-full h-full" key={videoSrc.label}>
        <source src={videoSrc.src} type="video/mp4" />
      </video>
    </div>
  )
}

export default Meimei
