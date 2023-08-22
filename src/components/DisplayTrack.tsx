import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { getDominantColorFromImage } from './colorUtils';

interface DisplayTrackProps {
  currentTrack: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  setDuration: (duration: number) => void;
  progressBarRef: React.RefObject<HTMLInputElement>;
  albumData: AlbumData; // Define the type for albumData
  currentTrackIndex: number;
  nextTrack: () => void;
}

interface AlbumData {
  images: { url: string }[];
  name: string;
  artists: { name: string }[];
  tracks: { items: { name: string }[] };
}

const DisplayTrack: React.FC<DisplayTrackProps> = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  albumData,
  currentTrackIndex,
  nextTrack,
}) => {
  const [derivedColor, setDerivedColor] = useState<[number, number, number]>([255, 255, 255]);

  const onLoadedMetadata = () => {
    const seconds = 30;
    setDuration(seconds);
    progressBarRef.current!.max = seconds;
  };

  useEffect(() => {
    const loadContent = async () => {
      if (albumData.images && albumData.images.length > 0) {
        const imageUrl = albumData.images[0].url;
        try {
          const dominantColor = await getDominantColorFromImage(imageUrl);
          setDerivedColor(dominantColor);
        } catch (error) {
          console.error("Error retrieving derived color:", error);
        }
      }
    };

    loadContent();
  }, [albumData]);

  const derivedColorStyle = `rgba(${derivedColor[0]}, ${derivedColor[1]}, ${derivedColor[2]}, 0.5)`;

  return (
    <div className="relative bg-gradient-to-r from-transparent via-transparent to-transparent">
      <div className="absolute top-0 left-0 right-0 bottom-5 rounded-lg" style={{ backgroundColor: derivedColorStyle }}></div>
      <div className="background bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8">
        <audio src={currentTrack} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={nextTrack} />
        <div className="flex gap-5">
          <div>
            {albumData.images?.length > 0 ? (
            <a href={albumData.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <Image
                src={albumData.images[0].url}
                width={175}
                height={175}
                alt="audio avatar"
                className="hover:scale-105 transform transition-transform duration-300 cursor-pointer"
              />
            </a>
            ) : (
                <span>
                  <BsMusicNoteBeamed />
                </span>
            )}
          </div>
          <div>
            <p className="text-3xl mb-0 leading-10 rounded-lg">{albumData.name}</p>
            <p className="text-lg font-semibold">{albumData.artists[0].name}</p>
            <section className="pt-14 text-sm">
              <p className="text-gray-300">Now playing:</p>
              <p className="text-xl font-semibold">{albumData.tracks.items[currentTrackIndex]?.name}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTrack;
