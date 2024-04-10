import MeimeiProvider from "@/context/MeimeiProvider";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="relative h-full">
      <MeimeiProvider>{children}</MeimeiProvider>
    </main>
  );
}

export default RootLayout;