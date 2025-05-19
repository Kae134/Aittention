import Image from "next/image"

export default function Page() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Image
            src="http://localhost:8000/api/v1/images/682b04c26aea9eb649b80595"
            alt=""
            width={500}
            height={500}
        />
    </div>
  )
}
