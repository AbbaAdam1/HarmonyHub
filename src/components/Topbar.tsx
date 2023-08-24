import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const Topbar = () => {
  return (
    <div className="max-w-5xl font-mono text-sm lg:flex">
      <div className="fixed left-0 top-0 w-full flex pl-5 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
        <div className="flex items-center flex-col md:flex-row">
          <p className="ml-2 text-xs md:mb-0">Powered by:</p>
          <Image
            src="/Spotify_Icon_CMYK_Green.png"
            alt="Spotify Logo"
            width={25}
            height={25}
            className="ml-2"
          />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <p className="text-lg font-sans font-bold text-orange-500 text-center">
            HarmonyHub
          </p>
        </div>
        <div className="absolute top-0 right-0 flex items-center mr-2">
          <Link href="/" className="flex items-center mt-3">
            <Image
              src="/home.svg"
              alt="Home Icon"
              width={32}
              height={28}
              className="hover:scale-110 transform transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
