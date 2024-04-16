import Meimei from "@/components/shared/Meimei"
import ModeMenu from "@/components/shared/ModeMenu"
import BrandMenu from "@/components/shared/brand-menu/BrandMenu"
import ChatRoom from "@/components/shared/chat/ChatRoom"

const Home = () => {
  return (
    <>
      <div className="meimei-main">
        {/* <Meimei /> */}
      </div>
      <div className="flex h-full justify-between max-md:flex-col">
        <div className="max-md:hidden">
          <BrandMenu />
        </div>
        <ModeMenu />
        <section className="mr-8 flex max-w-[1/5] border">
          <ChatRoom />
        </section>
      </div>
    </>
  )
}

export default Home