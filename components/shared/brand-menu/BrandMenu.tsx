'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { Loader2, ChevronUp } from "lucide-react"
import SignedInBit from "./SignedInBit"

const BrandMenu = () => {
  return (
    <div className="self-start rounded-[20px] border border-dark bg-light px-2 shadow-md max-md:hidden">
      <ClerkLoading>
        <Loader2 size={48} className="size-12 animate-spin text-dark" />
      </ClerkLoading>
      <ClerkLoaded>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-[48px] w-[198px] gap-2 font-lemon text-[1.25rem] font-normal leading-[26px] focus-visible:ring-0 focus-visible:ring-offset-0">
              StudyCafe
              <ChevronUp />
            </Button>
          </DropdownMenuTrigger>
          <SignedInBit />
        </DropdownMenu>
      </ClerkLoaded>
    </div>
  )
}

export default BrandMenu
