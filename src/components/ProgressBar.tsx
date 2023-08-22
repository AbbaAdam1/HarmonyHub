import React from 'react';

interface ProgressBarProps {
  progressBarRef: React.RefObject<HTMLInputElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
  timeProgress: number;
  duration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}) => {
  const handleProgressChange = () => {
    if (audioRef.current) {
      const currentTime = parseFloat(progressBarRef.current.value);
      audioRef.current.currentTime = currentTime;
    }
  };

  const formatTime = (time: number): string => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <div className="flex items-center gap-5 w-full">
      <span className="text-red-500 text-lg font-mono">
        {formatTime(timeProgress)}
      </span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
        max={duration}
      />
      <span className="text-red-500 text-lg font-mono">
        {formatTime(29)}
      </span>
    </div>
  );
};

export default ProgressBar;
