import MeimeiTimeProvider from "@/context/MeimeiTimeProvider";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MeimeiTimeProvider>{children}</MeimeiTimeProvider>
    </>
  );
}

export default HomeLayout;