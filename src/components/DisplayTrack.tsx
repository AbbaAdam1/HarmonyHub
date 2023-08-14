import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { getDominantColorFromImage } from './colorUtils';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  albumData,
  currentTrackIndex,
  nextTrack,
}) => {
  const [derivedColor, setDerivedColor] = useState([255, 255, 255]);
  const [isLoading, setIsLoading] = useState(true);

  const onLoadedMetadata = () => {
    const seconds = 30;
    setDuration(30);
    progressBarRef.current.max = 30;
  };

  useEffect(() => {
    const loadContent = async () => {
      if (albumData.images && albumData.images.length > 0) {
        const imageUrl = albumData.images[0].url;

        await getDominantColorFromImage(imageUrl).then(dominantColor => {
          console.log('Dominant Color:', dominantColor);
          setDerivedColor(dominantColor);
        });
      }

      setIsLoading(false); // Set loading state to false after everything is loaded
    };

    loadContent();
  }, [albumData]);

  if (isLoading) {
    return null; // Return null while loading
  }

  const derivedColorStyle = `rgba(${derivedColor[0]}, ${derivedColor[1]}, ${derivedColor[2]}, 0.5)`;

  return (
    <div className="relative bg-gradient-to-r from-transparent via-transparent to-transparent">
      <div className="absolute top-0 left-0 right-0 bottom-5 rounded-lg" style={{ backgroundColor: derivedColorStyle }}></div>
      <div className="background bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8">
        <audio src={currentTrack} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={nextTrack}/>
        <div className="flex gap-5">
          <div>
            {albumData.images && albumData.images.length > 0 ? (
              <Image
                src={albumData.images[0].url}
                width={175}
                height={175}
                alt="audio avatar"
              />
            ) : (
              <div className="icon-wrapper">
                <span className="audio-icon">
                  <BsMusicNoteBeamed />
                </span>
              </div>
            )}
          </div>
          <div className="text-white">
            <p className="text-3xl mb-0 leading-10 rounded-lg">{albumData.name}</p>
            <p className="text-lg font-semibold">{albumData.artists[0].name}</p>
            <p className="pt-14 text-sm">Now playing:</p>
            <p className="text-xl font-semibold">{albumData.tracks.items[currentTrackIndex]?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTrack;
