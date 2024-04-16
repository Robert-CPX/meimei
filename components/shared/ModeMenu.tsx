import { Modes } from "@/constants/constants"

const ModeMenu = () => {
  return (
    <ul className="flex-center menu menu-horizontal h-[44px] rounded-[22px] bg-[#333333] px-4 py-0 text-white opacity-50">
      {Modes.map((mode) => (
        <li key={mode.name}>
          <a className="text-white active:bg-primary active:text-white">{mode.name}</a>
        </li>
      ))}
    </ul>
  )
}

export default ModeMenu
