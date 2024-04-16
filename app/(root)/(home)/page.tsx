import Meimei from "@/components/shared/Meimei"
import ModeMenu from "@/components/shared/ModeMenu"
import BrandMenu from "@/components/shared/brand-menu/BrandMenu"
import ChatRoom from "@/components/shared/chat/ChatRoom"
import ChatMobileBackground from "@/components/shared/chat/ChatMobileBackground"

const Home = () => {
  return (
    <>
      <div className="meimei-main">
        <Meimei />
      </div>
      <div className="isolate flex h-full justify-between p-4 max-md:flex-col md:px-8">
        <div className="max-md:hidden">
          <BrandMenu />
        </div>
        <div className="md:hidden">
          <ModeMenu />
        </div>
        <div className="flex max-md:mb-4 max-md:max-h-[35%] md:basis-2/5 lg:basis-[30%]">
          <ChatRoom />
        </div>
        <ChatMobileBackground />
      </div>
    </>
  )
}

export default Home