type SingleChatBoxProps = {
  latestMessage: string
}

const SingleChatBox = ({ latestMessage }: SingleChatBoxProps) => {
  return (
    <div className="flex h-[60px] items-center justify-start self-stretch rounded-[20px] bg-dark px-[20px] py-3 opacity-80">
      <p className="text-[0.875rem] font-normal leading-[17.5px] text-light">{latestMessage}</p>
    </div>
  )
}

export default SingleChatBox
