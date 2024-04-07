import Meimei from "@/components/shared/Meimei"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-full">
      <Meimei />
      {children}
    </main>
  );
}
