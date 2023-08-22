import React from 'react';

interface AlbumProps {
  albumData: AlbumData;
  togglePlayPause: () => void;
  switchTogglePlayPause: (track: TrackType) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  onTrackChange: (trackIndex: number) => void;
}

interface AlbumData {
  tracks: {
    items: TrackType[];
  };
}

interface TrackType {
  id: string;
  name: string;
  duration_ms: number;
  // Add other properties if needed
}

const Album: React.FC<AlbumProps> = ({
  albumData,
  togglePlayPause,
  switchTogglePlayPause,
  currentTrackIndex,
  setCurrentTrackIndex,
  onTrackChange,
}) => {
  const msToTime = (duration: number): string => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="container flex mx-auto w-full items-center border-t border-gray-400">
      {albumData ? (
        <ul className="flex flex-col w-screen p-4">
          {albumData.tracks.items.map((track: TrackType, index: number) => (
            <li key={track.id} className="border-red-400 flex flex-row mb-2">
              <div
                data-testid="track-element"
                onClick={() => {
                  // If the clicked track is already the current track, toggle play/pause
                  if (currentTrackIndex === index) {
                    togglePlayPause();
                  } else {
                    // Otherwise, switch to the new track and start playing it immediately
                    switchTogglePlayPause(track);
                    onTrackChange(index);
                  }
                }}
                // Selected track is darker
                className={`select-none cursor-pointer rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
                  currentTrackIndex === index ? 'bg-orange-800' : 'bg-orange-500'
                }`}
              >
                <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">▷</div>
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium">{track.name}</div>
                </div>
                <div className="text-xs">{msToTime(track.duration_ms)}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Album;
