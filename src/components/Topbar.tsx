import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const Topbar = () => {
  return (
    <div className="max-w-5xl font-mono text-sm lg:flex">
      <div className="fixed left-0 top-0 w-full flex pl-5 border-b border-gray-300 pb-4 pt-4 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30">
        <div className="flex items-center flex-col md:flex-row">
          <p className="text-xs md:mb-0">Powered by:</p>
          <Image
            src="/Deezer_Logo.png"
            alt="Deezer Logo"
            width={25}
            height={25}
            className="md:ml-2"
          />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <p className="text-lg font-sans font-bold text-orange-500 text-center ml-6 md:ml-0">
            HarmonyHub
          </p>
        </div>
        <div className="absolute top-0 right-0 flex items-center mr-2">
          <Link href="/" className="flex items-center mt-4 md:mt-3">
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
