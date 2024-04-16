"use client"

import { FormEvent, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";

type InputControlProps = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleInput: (input: string) => void;
  loading: boolean;
}

const InputControl = ({
  prompt,
  setPrompt,
  handleInput,
  loading
}: InputControlProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleInput(prompt)
    setPrompt("")
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "48px"
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [prompt])

  return (
    <form onSubmit={onSubmit} className="flex items-center">
      <div className="relative grow">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Tell me about you today"
          className="text-300-14-17 no-scrollbar min-h-12 rounded-[1.25rem] border-white bg-transparent pr-12 text-white placeholder:text-opacity-40 focus-visible:ring-0"
        />
        <Button disabled={!prompt} className="absolute bottom-1 right-0">
          <Image src="/assets/icons/send.svg" alt="send" width={24} height={24} />
        </Button>
      </div>
    </form>
  )
}

export default InputControl
