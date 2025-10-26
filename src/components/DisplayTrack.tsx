import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { getDominantColorFromImage } from './Colorutils';

interface DisplayTrackProps {
  currentTrack: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  setDuration: (duration: number) => void;
  progressBarRef: React.RefObject<HTMLInputElement>;
  albumData: AlbumData;
  currentTrackIndex: number;
  nextTrack: () => void;
}

interface AlbumData {
  images: { url: string }[];
  name: string;
  artists: { name: string }[];
  tracks: { items: { name: string }[] };
  external_urls: { deezer: string };
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
    progressBarRef.current!.max = seconds.toString();
  };

  // Receive the dominant color from an album art
  useEffect(() => {
    const loadContent = async () => {
      if (albumData.images && albumData.images.length > 0) {
        const imageUrl = albumData.images[0].url;
        try {
          const dominantColor = await getDominantColorFromImage(imageUrl);
          const colorArray: [number, number, number] = [
            dominantColor[0],
            dominantColor[1],
            dominantColor[2],
          ];
          setDerivedColor(colorArray);
        } catch (error) {
          console.error("Error retrieving derived color:", error);
        }
      }
    };

    loadContent();
  }, [albumData]);

  const derivedColorStyle = `rgba(${derivedColor[0]}, ${derivedColor[1]}, ${derivedColor[2]}, 0.5)`;
  const derivedColorStyleDark = `rgba(${derivedColor[0]}, ${derivedColor[1]}, ${derivedColor[2]}, 0.8)`;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Vibrant gradient background */}
      <div
        className="absolute inset-0 blur-3xl"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${derivedColorStyleDark}, ${derivedColorStyle} 70%)`
        }}
      />

      {/* Glass morphism container with darker backdrop */}
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 border-2 border-white/30">
        <audio
          src={currentTrack}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={nextTrack}
        />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Album artwork */}
            <div className="flex-shrink-0 group">
              {albumData.images?.length > 0 ? (
                <a
                  href={albumData.external_urls.deezer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-2xl ring-2 ring-white/20">
                    <Image
                      src={albumData.images[0].url}
                      width={200}
                      height={200}
                      alt="album artwork"
                      className="transition-all duration-500 group-hover:scale-110 group-hover:brightness-125"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                        Open in Deezer
                      </span>
                    </div>
                  </div>
                  {/* Stronger reflection effect */}
                  <div
                    className="absolute -bottom-2 left-0 right-0 h-24 opacity-40 blur-xl"
                    style={{
                      background: `linear-gradient(to bottom, ${derivedColorStyleDark}, transparent)`
                    }}
                  />
                </a>
              ) : (
                <div className="w-[200px] h-[200px] rounded-xl bg-gradient-to-br from-gray-600 to-gray-900 flex items-center justify-center shadow-2xl ring-2 ring-white/20">
                  <BsMusicNoteBeamed className="text-6xl text-gray-300" />
                </div>
              )}
            </div>

            {/* Track information */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* Album and artist */}
              <div className="space-y-2">
                <h2 className="text-4xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                  {albumData.name}
                </h2>
                <p className="text-xl md:text-2xl font-semibold text-gray-200">
                  {albumData.artists[0].name}
                </p>
              </div>

              {/* Now playing section */}
              <div className="pt-4 space-y-3 border-t-2 border-white/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1 h-4 bg-white rounded-full" />
                    <span className="w-1 h-4 bg-white rounded-full" />
                    <span className="w-1 h-4 bg-white rounded-full" />
                  </div>
                  <p className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                    Now Playing
                  </p>
                </div>
                <p className="text-2xl font-bold text-white leading-snug line-clamp-2">
                  {albumData.tracks.items[currentTrackIndex]?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTrack;