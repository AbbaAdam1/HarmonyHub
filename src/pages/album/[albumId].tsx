import { useRef, useState, useEffect } from 'react';
import { tracks } from '../../components/tracks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { fetchSingleAlbumData } from '../../components/spotifyAPI';

import NoSSRWrapper from "./no-ssr-wrapper";

// import components
const DisplayTrack = dynamic(() => import('../../components/DisplayTrack'), { ssr: false });
const Controls = dynamic(() => import('../../components/controls'), { ssr: false });
const ProgressBar = dynamic(() => import('../../components/ProgressBar'), { ssr: false });
const Album = dynamic(() => import('../../components/album'), { ssr: false });

const AudioPlayer = () => {
  const router = useRouter();
  const albumId = router.query.albumId;
  console.log(albumId)

  //const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const otherTogglePlayPause = () => {
    setIsPlaying(true);
  };
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const [albumData, setAlbumData] = useState(null);
  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await fetchSingleAlbumData(albumId);
      setAlbumData(data);
      // Update the component state with the fetched album data
    };

    fetchAlbumData();
  }, [albumId]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleTrackChange = (trackIndex) => {
    setCurrentTrackIndex(trackIndex);
  };

  if (!albumData || !albumData.tracks || !albumData.tracks.items || albumData.tracks.items.length === 0) {
    return <div>Loading...</div>;
  }
  //const currentTrack = albumData?.tracks?.items[currentTrackIndex];
  const currentTrack = albumData?.tracks?.items[currentTrackIndex]?.preview_url;

  if (!albumData) {
    // Render a placeholder or loading state when albumData is null
    return <div>Loading...</div>;
  }

  //const [trackIndex, setTrackIndex] = useState(0);
  //const [currentTrack, setCurrentTrack] = useState(albumData.tracks.items.preview_url);
  console.log(currentTrackIndex)
  console.log(currentTrack)
  //const [currentTrack, setCurrentTrack] = useState(
  //  albumData.tracks.items[trackIndex]
  //);


  console.log(albumData)
  console.log("bg-orange-500 bg-opacity-20")

  return (
    <div className="bg-black">
      <div className="inner">
        <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              albumData,
              currentTrackIndex
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
              setIsPlaying,
              activeTrackIndex: currentTrackIndex
            }}
         />
        <ProgressBar
          {...{ audioRef, progressBarRef, timeProgress, duration }}
          />
      </div>
        <Album
          {...{
            togglePlayPause,
            otherTogglePlayPause,
            albumData,
            currentTrackIndex,
            setCurrentTrackIndex,
            onTrackChange: handleTrackChange
          }}
          />
    </div>
  );
};
export default AudioPlayer;