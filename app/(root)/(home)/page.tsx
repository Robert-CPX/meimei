import Meimei from "@/components/shared/Meimei"
import ModeMenu from "@/components/shared/ModeMenu"
import BrandMenu from "@/components/shared/brand-menu/BrandMenu"
import ChatRoom from "@/components/shared/chat/ChatRoom"

const Home = () => {
  return (
    <>
      <div className="meimei-main">
        <Meimei />
      </div>
      <div className="flex h-full justify-between px-8 py-4 max-md:flex-col">
        <div className="max-md:hidden">
          <BrandMenu />
        </div>
        {/* <ModeMenu /> */}
        <section className="flex basis-[30%] rounded-[20px]">
          <ChatRoom />
        </section>
      </div>
    </>
  )
}

export default Home