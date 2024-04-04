import ModeMenu from "@/components/ModeMenu"
import ChatRoom from "@/components/chat/ChatRoom"

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-4 py-4">
      <div className="flex items-center justify-center">
        <ModeMenu />
      </div>
      <ChatRoom />
    </section>
  )
}

export default Home