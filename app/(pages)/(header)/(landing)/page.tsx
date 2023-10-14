'use client'

import { useAuthSession } from "@/context/UserContext";
import ArtBoard from "@/svg/artboard";
import HeroPic from "@/svg/heropic";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const { user } = useAuthSession();

  return (
    <div className="styles.hero">
      <div className="w-2/3 h-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ArtBoard className="w-full h-auto"></ArtBoard>
      </div>
      <div className="w-2/3 h-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex flex-col justify-center items-center">
          <HeroPic className="w-2/5 h-auto"></HeroPic>
          <h1 className="w-2/3 mb-[2vh] text-black text-center font-inter text-5xl font-bold">
            Multi-purpose environment application.
          </h1>
          <p className="w-5/8 text-gray-400 text-center font-inter text-2xl font-regular leading-8">
            Track emissions and stay up to date on enviromental regulations.
          </p>
          <div className="flex flex-row gap-2 justify-content items-center mt-[4vh]">
            <Link href={user ? '/dashboard' : '/signin'}>
              <Button className="flex p-7 justify-center items-center rounded-xl" color='primary'>
                <p className="w-5/8 text-gray-100 text-center font-inter text-2xl font-bold leading-8 m-0 p-0">
                  Start Now
                </p>
              </Button>
            </Link>
            <Button className="w-5/8 text-gray-400 p-7 text-center font-inter text-2xl font-bold leading-8 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
