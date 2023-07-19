import { useState, useEffect, useRef, useCallback } from 'react';


// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,Unhandled Runtime Error
TypeError: Cannot read properties of undefined (reading 'currentTime')

Source
src\components\controls.tsx (26:41) @ currentTime

  24 |
  25 | const repeat = useCallback(() => {
> 26 |   const currentTime = audioRef.current.currentTime;
     |                                       ^
  27 |   setTimeProgress(currentTime);
  28 |   progressBarRef.current.value = currentTime;
  29 |   progressBarRef.current.style.setProperty(
  IoPauseSharp,
} from 'react-icons/io5';

const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
              togglePlayPause,
              isPlaying,
              setIsPlaying
    }) => {
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    console.log(duration)
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if(!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button>
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        <button>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
    </div>
  );
};

export default Controls;