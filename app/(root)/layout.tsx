import MeimeiProvider from "@/context/MeimeiProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-screen">
      <MeimeiProvider>{children}</MeimeiProvider>
    </main>
  );
}
