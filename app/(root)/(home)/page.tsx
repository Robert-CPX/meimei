import ModeMenu from "@/components/shared/ModeMenu"
import ChatRoom from "@/components/shared/chat/ChatRoom"
import Meimei from "@/components/shared/Meimei"
import ActionMenu from "@/components/shared/ActionMenu"
const Home = () => {
  return (
    <>
      <Meimei />
      <section className="flex size-full flex-col justify-between gap-4 py-4">
        <nav className="flex-center">
          <ModeMenu />
        </nav>
        <section className="flex h-4/5 w-full">
          <ChatRoom />
        </section>
        <div className="absolute right-3 top-4 z-50">
          <ActionMenu />
        </div>
      </section>
    </>
  )
}

export default Home
