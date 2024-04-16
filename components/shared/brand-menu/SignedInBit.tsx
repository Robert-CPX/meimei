'use client'

import { DropdownMenuContent, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { SignOutButton, SignedIn, UserButton, useClerk, useUser } from "@clerk/nextjs"

const SignedInBit = () => {
  const { session, openUserProfile } = useClerk()
  return (
    <SignedIn>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => openUserProfile()}
            className="flex items-center gap-4"
          >
            <UserButton appearance={{
              elements: {
                avatarBox: 'h-[48px] w-[48px] rounded-full bg-primary-orange flex-center',
              }
            }} />
            <div className="flex flex-col justify-start gap-2">
              <span className="text-500-18-22">{session?.user.username}</span>
              <span className="text-400-14-17">{session?.user.emailAddresses[0].emailAddress}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-400-16-20">Send us feedback!</DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOutButton signOutOptions={{ sessionId: session?.id }}>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </SignedIn>
  )
}

export default SignedInBit
