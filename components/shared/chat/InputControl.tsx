"use client"
import { FormEvent } from "react";
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
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleInput(prompt)
    setPrompt("")
  }

  return (
    <form onSubmit={onSubmit} className="flex space-x-2">
      <div className="grow">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input w-full"
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
