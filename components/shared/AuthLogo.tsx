import Image from "next/image"

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image alt="brand" src={"/assets/icons/studycafe_brand.svg"} width={228} height={62} />
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500">In the light of courage, every page of knowledge shines with the starlight of adventure</p>
      </div>
    </div>
  )
}

export default AuthLogo
