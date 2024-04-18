import Meimei from "@/components/shared/Meimei"
import ModeTabs from "@/components/shared/ModeTabs"
import BrandMenu from "@/components/shared/brand-menu"
import { ChatRoom, ChatMobileBackground } from "@/components/shared/chat"
import ActionMenu from "@/components/shared/ActionMenu"
import TimeEditor from "@/components/shared/timer/TimeEditor"

const Home = () => {
  return (
    <>
      <div className="meimei-main">
        <Meimei />
      </div>
      <div className="isolate flex h-full justify-between p-4 max-md:flex-col md:px-8">
        {/* Brand menu show on desktop */}
        <div className="max-md:hidden">
          <BrandMenu />
        </div>
        <section className="flex flex-col items-center justify-start gap-4">
          <ModeTabs />
          <TimeEditor />
        </section>
        <section className="mb-auto mt-4 self-end md:hidden">
          <ActionMenu />
        </section>
        <section className="flex max-md:mb-4 max-md:max-h-[35%] md:basis-[26%] lg:basis-[22%]">
          <ChatRoom />
        </section>
        <ChatMobileBackground />
      </div>
    </>
  )
}

export default Home