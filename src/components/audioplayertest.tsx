import { useRef, useState } from 'react';
import { tracks } from './tracks';
import dynamic from 'next/dynamic';

import NoSSRWrapper from "./no-ssr-wrapper";

// import components
const DisplayTrack = dynamic(() => import('./DisplayTrack'), { ssr: false });
const Controls = dynamic(() => import('./controls'), { ssr: false });
const ProgressBar = dynamic(() => import('./ProgressBar'), { ssr: false });

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
            }}
        />
        <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
            }}
         />
        <ProgressBar
          {...{ audioRef, progressBarRef, timeProgress, duration }}
          />
      </div>
    </div>
  );
};
export default AudioPlayer;