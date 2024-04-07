import AuthLogo from "@/components/shared/AuthLogo"

export const metadata = {
  title: "Authentication"
}

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body>
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <AuthLogo />
          {children}
        </div>
      </body>
    </html>
  )
}

export default AuthLayout
