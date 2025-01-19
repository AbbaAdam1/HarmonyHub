import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { fetchSingleAlbumData } from '../../components/DeezerAPI';
import { DeezerAlbumData } from '../../components/DeezerAPI';
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
  const [error, setError] = useState<string | null>(null);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const router = useRouter();
  const [albumData, setAlbumData] = useState<DeezerAlbumData | null>(null);

  // Don't fetch until we have the albumId
  const { albumId } = router.query;

  const switchTogglePlayPause = () => {
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    // Reset states when albumId changes
    if (!albumId) {
      return;
    }

    const fetchAlbum = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchSingleAlbumData(albumId as string);
        setAlbumData(data);
      } catch (err) {
        console.error("Error fetching album data:", err);
        setError(err instanceof Error ? err.message : 'Failed to load album');
        setAlbumData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  const handleTrackChange = (trackIndex: number) => {
    setCurrentTrackIndex(trackIndex);
  };

  const nextTrack = () => {
    if (albumData?.tracks?.items) {
      if (currentTrackIndex >= albumData.tracks.items.length - 1) {
        handleTrackChange(0);
      } else {
        handleTrackChange(currentTrackIndex + 1);
      }
    }
  };

  // Handle loading and error states
  if (!albumId) {
    return <div className="p-5 pt-20">Loading...</div>;
  }

  if (isLoading) {
    return <div className="p-5 pt-20">Loading album...</div>;
  }

  if (error) {
    return <div className="p-5 pt-20">Error: {error}</div>;
  }

  if (!albumData || !albumData.tracks?.items?.length) {
    return <div className="p-5 pt-20">No album data found</div>;
  }

  // Get the URL of the current track
  const currentTrack = albumData.tracks.items[currentTrackIndex]?.preview_url;

  return (
    <div>
      <div className="p-5 pt-20">
        <DisplayTrack
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressBarRef,
            albumData,
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