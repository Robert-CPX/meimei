"use client"
import { FormEvent } from "react";

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
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleInput(prompt)
    setPrompt("")
  }

  return (
    <form onSubmit={onSubmit} className="flex">
      <div className="grow">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Tell me about you today"
          className="input h-[50px] w-full rounded-[25px] bg-[#333333] text-white opacity-50 placeholder:text-opacity-40"
        />
      </div>
    </form>
  )
}

export default InputControl
