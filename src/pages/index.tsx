import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { fetchAlbumsData } from '../components/SpotifyAPI';

export default function Home() {
  const [albumsData, setAlbumsData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsData();
      setAlbumsData(data);
    };

    fetchData();
  }, []);

  const navigateToAlbum = (albumId) => {
    router.push(`/album/${albumId}`);
  };

  return (
   <main>
     <div className="sm:ml-64 sm:mt-10 fixed z-[-1]">
       <div className="before:rounded-full before:bg-gradient-radial before:from-yellow-300 before:to-transparent before:blur-2xl after:absolute after:h-[700px] after:w-[700px] after:rounded-full after:bg-gradient-radial after:from-orange-300 after:via-orange-500 after:to-transparent after:blur-2xl before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-orange-700 before:dark:opacity-10 after:dark:from-orange-900 after:dark:via-[#ff5b16] after:dark:opacity-40"/>
     </div>

     <div className="flex flex-col items-center justify-center pt-12">
       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
         {albumsData &&
           albumsData.map((album, index) => (
             <div
               key={index}
               className={`pb-3 shadow-lg rounded-xl hover:bg-gray-800 relative border border-gray-800 border-2 cursor-pointer`}
               onClick={() => navigateToAlbum(album.id)}
             >
               <div className="flex flex-col h-full">
                 <div className="flex-grow flex items-center justify-center pt-10 pl-12 pr-12">
                   <Image
                     className="mx-auto"
                     src={album.images[0].url}
                     alt="audio avatar"
                     width={310}
                     height={310}
                   />
                 </div>
                 <p className="text-shadow-lg font-bold text-xl text-center">{album.name}</p>
                 <p className="text-center">{album.artists[0].name}</p>
               </div>
             </div>
           ))}
       </div>
     </div>
   </main>
  )
}