// Desc: This is a single chat box component that will be used on desktop when user switch to Focus mode. It will show the latest message from the chat history. It will be used in ChatRoom.tsx.
type SingleChatBoxProps = {
  text: string
}

const SingleChatBox = ({ text }: SingleChatBoxProps) => {
  return (
    <div className="flex h-[60px] items-center justify-start self-stretch rounded-[20px] bg-dark/80 px-[20px] py-3">
      <p className="text-[0.875rem] font-normal leading-[17.5px] text-light">{text}</p>
    </div>
  )
}

export default SingleChatBox
