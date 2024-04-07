import MeimeiProvider from "@/context/MeimeiProvider";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="relative h-screen">
      <MeimeiProvider>{children}</MeimeiProvider>
    </main>
  );
}

export default RootLayout;