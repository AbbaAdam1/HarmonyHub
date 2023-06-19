import { tracks } from './tracks';

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useRef, useState } from 'react';

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const audioRef = useRef();
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
        currentTrack="./audio/Heartbeat.mp3"
        audioRef={audioRef}
        />
        <Controls audioRef={audioRef} />
        <ProgressBar />
      </div>
    </div>
  );
};
export default AudioPlayer;