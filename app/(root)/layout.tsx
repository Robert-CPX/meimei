import MeimeiProvider from "@/context/MeimeiProvider";
import { Toaster } from "@/components/ui/toaster"
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="relative h-full">
      <MeimeiProvider>{children}</MeimeiProvider>
      <Toaster />
    </main>
  );
}

export default RootLayout;