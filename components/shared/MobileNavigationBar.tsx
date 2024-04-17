import Link from "next/link";
import { X } from "lucide-react";

type MobileNavigationBarProps = {
  title: string;
  rootPath?: string;
}

const MobileNavigationBar = ({
  title, rootPath
}: MobileNavigationBarProps) => {
  return (
    <section className="background-dark_light flex h-12 items-center justify-between md:hidden">
      <div className="size-10" />
      <p className="mobile-nav-title text-dark_light mx-auto">{title}</p>
      {rootPath && (
        <Link href={rootPath} className="text-dark_light flex-center size-10">
          <X />
        </Link>
      )}
    </section>
  )
}

export default MobileNavigationBar
