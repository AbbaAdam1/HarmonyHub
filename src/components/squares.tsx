import React, { useState, useEffect } from 'react';
import { fetchAlbumsData } from '../components/spotifyAPI';
import Image from "next/image";

const Squares = () => {
  const [albumsData, setAlbumsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsData();
      setAlbumsData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-12">
      {albumsData &&
        albumsData.map((album, index) => (
          <div
            key={index}
            className={`w-full h-0 shadow-lg pb-full rounded-xl bg-black-500 hover:bg-gray-800 relative border border-gray-800 border-[2px]`}
          >
  <div className="flex items-center justify-center">
    <Image
      className="mx-auto pt-7"
      src={album.images[0].url}
      alt="audio avatar"
      width={310}
      height={310}
    />
  <p className="text-shadow-lg font-bold text-xl absolute bottom-2 left-2">{album.name}</p>
  <p className="absolute bottom-2 right-2">{album.artists[0].name}</p>
</div>
          </div>
        ))}
    </div>
  );
};

export default Squares;

  /*
  return (
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="w-full h-0 shadow-lg pb-full rounded-xl bg-yellow-300"></div>
            <div className="w-full h-0 shadow-lg pb-full rounded-xl bg-red-300"></div>
            <div className="w-full h-0 shadow-lg pb-full rounded-xl bg-green-300"></div>
          </div>
  );
};
export default Squares;
*/
