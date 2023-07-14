import { useRef, useState } from 'react';
import { tracks } from './tracks';
import dynamic from 'next/dynamic';
import ArtistData from '../app/page';

import NoSSRWrapper from "./no-ssr-wrapper";

// import components
const DisplayTrack = dynamic(() => import('./DisplayTrack'), { ssr: false });
const Controls = dynamic(() => import('./controls'), { ssr: false });
const ProgressBar = dynamic(() => import('./ProgressBar'), { ssr: false });
const Album = dynamic(() => import('./album'), { ssr: false });

const AudioPlayer = ({ ArtistData }) => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              ArtistData
            }}
        />
        <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              togglePlayPause,
              isPlaying,
              setIsPlaying
            }}
         />
        <ProgressBar
          {...{ audioRef, progressBarRef, timeProgress, duration }}
          />
      </div>
      <Album togglePlayPause={togglePlayPause}/>
    </div>
  );
};
export default AudioPlayer;