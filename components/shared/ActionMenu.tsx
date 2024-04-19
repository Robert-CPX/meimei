'use client'

import { useMeimei } from "@/context/MeimeiProvider"
import Link from "next/link"
import Image from "next/image"

const ActionMenu = () => {
  const { mode } = useMeimei()
  return (
    <div className={`flex flex-col gap-4 ${mode === 'focus' && 'hidden'}`}>
      <Link href="/setting" className="flex items-center justify-center bg-transparent">
        <Image src="/assets/icons/setting.svg" alt="settings" width={48} height={48} />
      </Link>
      <Link href="/" className="flex items-center justify-center bg-transparent">
        <Image src="/assets/icons/heart.svg" alt="like" width={48} height={48} />
      </Link>
    </div>
  )
}

export default ActionMenu
