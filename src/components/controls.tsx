import { useState, useEffect, useRef, useCallback } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faForward, faStepForward, faBackward, faStepBackward, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';


const Controls = ({
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
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if(!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  // New useEffect to handle track changes
  useEffect(() => {
    if (isPlaying && activeTrackIndex !== null) {
      // If the activeTrackIndex is not null, it means a track is selected, so play it
      audioRef.current.play();
    }
  }, [activeTrackIndex, audioRef, isPlaying]);

  const skipForward = () => {
    audioRef.current.currentTime += 5;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 5;
  };

  const previousTrack = () => {
    if (activeTrackIndex == 0) {
      onTrackChange(tracksNumber - 1);
    } else {
      onTrackChange((prev) => prev - 1);
    }
  };

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
          <button className="hover:scale-110 transform transition-transform duration-300" onClick={previousTrack}>
            <FontAwesomeIcon icon={faStepBackward} size="lg"/>
          </button>
          <button className="hover:scale-110 transform transition-transform duration-300" onClick={skipBackward}>
             <FontAwesomeIcon icon={faBackward} size="lg"/>
          </button>

          <button className="hover:scale-110 transform transition-transform duration-300" onClick={togglePlayPause}>
            {isPlaying ? <FontAwesomeIcon icon={faCirclePause} beatFade size="2xl" style={{color: "#F97316",}} /> :
                         <FontAwesomeIcon icon={faCirclePlay} size="2xl" style={{color: "#F97316",}}/> }
          </button>
          <button className="hover:scale-110 transform transition-transform duration-300 cursor-pointer" onClick={skipForward}>
            <FontAwesomeIcon icon={faForward} size="lg"/>
          </button>
          <button className="hover:scale-110 transform transition-transform duration-300 cursor-pointer" onClick={nextTrack}>
            <FontAwesomeIcon icon={faStepForward} size="lg"/>
          </button>
        </div>

      <div className="absolute right-0 flex ml-auto items-center space-x-2 pt-2 xl:pt-6">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
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
        />
      </div>
      </div>
    );
};

export default Controls;