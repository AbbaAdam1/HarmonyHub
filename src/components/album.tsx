const Album = ({ albumData, togglePlayPause }: { albumData: any, togglePlayPause: () => void }) => {
  const msToTime = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="container flex mx-auto w-full items-center">
      {albumData ? (
        <ul className="flex flex-col bg-gray-300 w-screen p-4">
          {albumData.tracks.items.map((track: any) => (
            <li key={track.id} className="border-red-400 flex flex-row mb-2">
              <div
                onClick={togglePlayPause}
                className="select-none cursor-pointer bg-orange-500 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">▷</div>
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium">{track.name}</div>
                </div>
                <div className="text-gray-600 text-xs">{msToTime(track.duration_ms)}</div>
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