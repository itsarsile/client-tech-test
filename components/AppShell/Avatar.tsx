import { generateRoboHash } from "@/lib/utils";
import Image from "next/image";
import { cookies } from "next/headers";
import { auth } from "@/app/auth";


export default async function Avatar() {
  const session = await auth();
  return (
    <>
      <Image src={generateRoboHash(`${session?.user?.email}`, 200)} alt="avatar" width={200} height={200} />
      <span className="sr-only">Toggle user menu</span>
    </>
  )
}
