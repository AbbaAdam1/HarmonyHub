import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay,
         faCirclePause,
         faForward,
         faStepForward,
         faBackward,
         faStepBackward,
         faVolumeLow,
         faVolumeHigh,
         faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: (time: number) => void;
  togglePlayPause: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  activeTrackIndex: number | null;
  onTrackChange: (index: number) => void;
  nextTrack: () => void;
  tracksNumber: number;
}

const Controls: React.FC<ControlsProps> = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  togglePlayPause,
  isPlaying,
  setIsPlaying,
  activeTrackIndex,
  onTrackChange,
  nextTrack,
  tracksNumber,
}) => {
  const playAnimationRef = useRef<number>();

  //progressbar
  const repeat = useCallback(() => {
    if (audioRef.current && progressBarRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(parseFloat(progressBarRef.current.value) / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  //playing
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if(!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (isPlaying && activeTrackIndex !== null && audioRef.current) {
      // If the activeTrackIndex is not null, it means a track is selected, so play it
      audioRef.current.play();
    }
  }, [activeTrackIndex, audioRef, isPlaying]);

  //track control
  const skipForward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5;
    }
  }, [audioRef]);

  const skipBackward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5;
    }
  }, [audioRef]);

  const previousTrack = () => {
    if (activeTrackIndex == 0) {
      onTrackChange(tracksNumber - 1);
    } else {
      onTrackChange((prev) => prev - 1);
    }
  };

  //volume
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        skipForward();
      } else if (event.key === 'ArrowLeft') {
        skipBackward();
      } else if (event.key === ' ') {
        event.preventDefault();
        togglePlayPause();
      } else if (event.key === 'm' || event.key === 'M') {
        setMuteVolume((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skipForward, skipBackward, togglePlayPause]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="flex justify-center relative">
      <div className="space-x-4 sm:space-x-8 md:space-x-16 lg:space-x-20 pt-8 xl:pt-4">
        <button
          className="hover:scale-110 transform transition-transform duration-300"
          onClick={previousTrack}
          aria-label="Previous Track"
        >
          <FontAwesomeIcon icon={faStepBackward} size="lg" />
        </button>
        <button
          className="hover:scale-110 transform transition-transform duration-300"
          onClick={skipBackward}
          data-testid="skipBackward"
        >
          <FontAwesomeIcon icon={faBackward} size="lg" />
        </button>
        <button
          className="hover:scale-110 transform transition-transform duration-300"
          onClick={togglePlayPause}
          data-testid="play/pause-button"
        >
          {isPlaying ? (
            <FontAwesomeIcon
              icon={faCirclePause}
              beatFade
              size="2xl"
              style={{ color: "#F97316" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCirclePlay}
              size="2xl"
              style={{ color: "#F97316" }}
            />
          )}
        </button>
        <button
          className="hover:scale-110 transform transition-transform duration-300 cursor-pointer"
          onClick={skipForward}
          data-testid="skipForward"
        >
          <FontAwesomeIcon icon={faForward} size="lg" />
        </button>
        <button
          className="hover:scale-110 transform transition-transform duration-300 cursor-pointer"
          onClick={nextTrack}
          aria-label="Next Track"
        >
          <FontAwesomeIcon icon={faStepForward} size="lg" />
        </button>
      </div>

      <div className="absolute right-0 flex ml-auto items-center space-x-2 pt-2">
        <button className="hover:scale-110 transform transition-transform duration-300 cursor-pointer"
                onClick={() => setMuteVolume((prev) => !prev)}
                aria-label="Mute Button"
        >
          {muteVolume || volume === 0 ? (
            <FontAwesomeIcon icon={faVolumeXmark} size="sm" />
          ) : volume < 30 ? (
            <FontAwesomeIcon icon={faVolumeLow} size="sm" />
          ) : (
            <FontAwesomeIcon icon={faVolumeHigh} size="sm" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
          aria-label="Volume Slider"
        />
      </div>
    </div>
  );
};

export default Controls;