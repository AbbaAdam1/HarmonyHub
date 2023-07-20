import { useRef, useState, useEffect } from 'react';
import { tracks } from '../../components/tracks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import { fetchSingleAlbumData } from '../../components/spotifyAPI';

import NoSSRWrapper from "./no-ssr-wrapper";

// import components
const DisplayTrack = dynamic(() => import('../../components/DisplayTrack'), { ssr: false });
const Controls = dynamic(() => import('../../components/controls'), { ssr: false });
const ProgressBar = dynamic(() => import('../../components/ProgressBar'), { ssr: false });
const Album = dynamic(() => import('../../components/album'), { ssr: false });

const AudioPlayer = ({ artistData }) => {
  const router = useRouter();
  const albumId = router.query;

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await fetchSingleAlbumData(albumId);
      // Update the component state with the fetched album data
    };

    fetchAlbumData();
  }, [albumId]);

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              artistData
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