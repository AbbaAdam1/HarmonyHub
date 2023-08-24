import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { fetchSingleAlbumData } from '../../components/SpotifyAPI';
import { SpotifyAlbumData } from '../../components/SpotifyAPI';
import Image from 'next/image';

// import components
import DisplayTrack from '../../components/DisplayTrack';
import Controls from '../../components/Controls';
import ProgressBar from '../../components/ProgressBar';
import Album from '../../components/Album';

interface TrackData {
  id: string;
  name: string;
  preview_url: string;
}

const AudioPlayer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const router = useRouter();
  const albumId: string | undefined = router.query.albumId as string | undefined;
  const [albumData, setAlbumData] = useState<SpotifyAlbumData | null>(null);

  const switchTogglePlayPause = () => {
    setIsPlaying(true);
  };
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  //Fetch operation occurs when AlbumId is ready
  useEffect(() => {
    if (albumId) {
      fetchSingleAlbumData(albumId)
        .then((data) => {
          setAlbumData(data as SpotifyAlbumData);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching album data:", error);
          setAlbumData(null);
          setIsLoading(false);
        });
    }
  }, [albumId]);

  const handleTrackChange = (trackIndex: number) => {
    setCurrentTrackIndex(trackIndex);
  };

  const nextTrack = () => {
    if (albumData && albumData.tracks && albumData.tracks.items) {
      if (currentTrackIndex >= albumData.tracks.items.length - 1) {
        handleTrackChange(0);
      } else {
        handleTrackChange(currentTrackIndex + 1);
      }
    }
  };

  //Loading
  if (!albumData || !albumData.tracks || !albumData.tracks.items || albumData.tracks.items.length === 0) {
    return <div></div>;
  }

  // Get the URL of the current track
  const currentTrack: string | undefined = albumData?.tracks?.items[currentTrackIndex]?.preview_url;

  return (
    <div>
      <div className="p-5 pt-20">
        <DisplayTrack
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressBarRef,
            albumData: albumData as SpotifyAlbumData,
            currentTrackIndex,
            nextTrack,
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
            nextTrack,
            activeTrackIndex: currentTrackIndex,
            onTrackChange: handleTrackChange,
            tracksNumber: albumData.tracks.items.length,
          }}
        />
        <ProgressBar
          {...{ audioRef, progressBarRef, timeProgress, duration }}
        />
      </div>
      <Album
        {...{
          togglePlayPause,
          switchTogglePlayPause,
          albumData,
          currentTrackIndex,
          setCurrentTrackIndex,
          onTrackChange: handleTrackChange,
        }}
      />
    </div>
  );
};
export default AudioPlayer;