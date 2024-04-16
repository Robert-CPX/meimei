'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { Loader2, ChevronUp } from "lucide-react"
import SignedInBit from "./SignedInBit"

const BrandMenu = () => {
  return (
    <div className="container shadow-md">
      <ClerkLoading>
        <Loader2 size={48} className="dark: size-12 animate-spin text-slate-200" />
      </ClerkLoading>
      <ClerkLoaded>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              Study Cafe
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
