import React, { useState } from "react";

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <div className="flex items-center">
        <audio ref={audioRef} src={src} />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
          onClick={togglePlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="ml-4">
          <h2 className="text-lg font-bold">Song Title</h2>
          <p className="text-gray-500">Artist Name</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="bg-gray-300 h-2 rounded-full">
          <div className="bg-blue-500 h-full rounded-full"></div>
        </div>
      </div>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;