import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (isPlaying && activeTrackIndex !== null && audioRef.current) {
      audioRef.current.play();
    }
  }, [activeTrackIndex, audioRef, isPlaying]);

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
    if (activeTrackIndex === 0) {
      onTrackChange(tracksNumber - 1);
    } else if (activeTrackIndex !== null) {
      const newIndex = activeTrackIndex - 1;
      onTrackChange(newIndex);
    }
  };

  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
    <div className="relative pt-6 md:pt-0">
      {/* Volume controls - positioned above on small screens */}
      <div className="flex justify-center mb-6 md:mb-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
        <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <button
            className="group p-1.5 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={() => setMuteVolume((prev) => !prev)}
            aria-label="Mute Button"
          >
            {muteVolume || volume === 0 ? (
              <Image
                src="/volume-xmark.svg"
                alt="Mute volume"
                width={22}
                height={22}
                className="group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
            ) : volume < 30 ? (
              <Image
                src="/volume-low.svg"
                alt="Low volume"
                width={22}
                height={22}
                className="group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <Image
                src="/volume-high.svg"
                alt="High volume"
                width={22}
                height={22}
                className="group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #fb923c ${volume}%, rgba(255, 255, 255, 0.2) ${volume}%)`,
            }}
            aria-label="Volume Slider"
          />
        </div>
      </div>

      {/* Main playback controls */}
      <div className="flex justify-center relative items-center py-6">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <button
            className="group p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={previousTrack}
            aria-label="Previous Track"
          >
            <Image
              src="/backward-step.svg"
              alt="Previous track"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
          </button>

          <button
            className="group p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={skipBackward}
            data-testid="skipBackward"
          >
            <Image
              src="/backward.svg"
              alt="Skip backward"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
          </button>

          <button
            className="group relative p-3 transition-all duration-300 hover:scale-110"
            onClick={togglePlayPause}
            data-testid="play/pause-button"
          >
            {isPlaying && (
              <span className="absolute inset-1 rounded-full bg-white/20 animate-ping" />
            )}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-md" />
            <Image
              src={isPlaying ? '/pause.svg' : '/play.svg'}
              alt={isPlaying ? 'Pause' : 'Play'}
              width={40}
              height={40}
              className="relative transition-transform duration-300 drop-shadow-lg"
            />
          </button>

          <button
            className="group p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={skipForward}
            data-testid="skipForward"
          >
            <Image
              src="/forward.svg"
              alt="Skip forward"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
          </button>

          <button
            className="group p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={nextTrack}
            aria-label="Next Track"
          >
            <Image
              src="/forward-step.svg"
              alt="Next track"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;