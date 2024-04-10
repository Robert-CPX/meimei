"use client"
import { FormEvent, useEffect, useRef } from "react";
import UpRightSVG from "../../icons/UpRightSVG";

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
    textarea.style.height = "49px"
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [prompt])

  return (
    <form onSubmit={onSubmit} className="flex items-end gap-2">
      <div className="grow">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Tell me about you today"
          className="no-scrollbar textarea block h-12 w-full rounded-[25px] bg-[#333333] text-white opacity-50 placeholder:text-opacity-40"
        />
      </div>
      <button
        type="submit"
        disabled={!prompt || loading}
        className={`btn btn-ghost ${loading && "loading"}`}
      >
        {!loading && <UpRightSVG />}
      </button>
    </form>
  )
}

export default InputControl
