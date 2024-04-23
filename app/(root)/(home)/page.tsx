import Meimei from "@/components/shared/Meimei"
import ModeTabs from "@/components/shared/ModeTabs"
import BrandMenu from "@/components/shared/brand-menu"
import { ChatRoom, ChatMobileBackground, ChatHistoryMobile } from "@/components/shared/chat"
import ActionMenu from "@/components/shared/ActionMenu"
import { TimeEditor, TimeSelector } from "@/components/shared/timer"

const Home = () => {
  return (
    <>
      {/* Meimei as background */}
      <div className="meimei-main">
        <Meimei />
      </div>
      <div className="isolate flex h-full justify-between p-4 max-md:flex-col md:px-8">
        {/* Brand menu only show on desktop */}
        <BrandMenu />
        {/* this section is on top */}
        <section className="z-10 flex flex-col items-center justify-start gap-4">
          {/* Mode Tabs disappear only when timer is running */}
          <ModeTabs />
          {/* Time Editor only show on desktop */}
          <TimeEditor />
          {/* Time Selector only show on mobile */}
          <TimeSelector />
        </section>
        {/* ActionMenu is for desktop only */}
        <section className="mb-auto mt-4 self-end md:hidden">
          <ActionMenu />
        </section>
        {/* ChatRoom has threen variants, two for desktop and one for mobile */}
        <section className="flex max-md:mb-4 max-md:max-h-[35%] md:basis-[26%] lg:basis-[23%]">
          <ChatRoom />
        </section>
        {/* ChatMobileBackground is absolute positioned background for mobile chat */}
        <ChatMobileBackground />
        {/* when user set mode=dredge-up on mobile, ChatHistoryMobile take the whole screen under ModeTabs */}
        <ChatHistoryMobile />
      </div>
    </>
  )
}

export default Home