import Link from "next/link"
import Image from "next/image"
// import { SignedIn, UserButton } from "@clerk/nextjs"

const ActionMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* <SignedIn>
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px] rounded-full bg-primary-orange flex-center',
            }
          }}
        />
      </SignedIn> */}
      <Link href="/setting" className="flex-center bg-transparent">
        <Image src="/assets/icons/setting.svg" alt="settings" width={48} height={48} />
      </Link>
      <Link href="/" className="flex-center bg-transparent">
        <Image src="/assets/icons/heart.svg" alt="like" width={48} height={48} />
      </Link>
    </div>
  )
}

export default ActionMenu
