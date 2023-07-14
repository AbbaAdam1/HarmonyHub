const Album = ({ togglePlayPause }: { togglePlayPause: () => void }) => (
  <div className="container flex mx-auto w-full items-center">
    <ul className="flex flex-col bg-gray-300 w-screen p-4">
      <li className="border-red-400 flex flex-row mb-2">
        <div onClick={togglePlayPause} className="select-none cursor-pointer bg-orange-500 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">▷</div>
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">Heartbeat</div>
          </div>
          <div className="text-gray-600 text-xs">03:00</div>
        </div>
      </li>
      <li className="border-gray-400 flex flex-row mb-2">
        <div className="select-none cursor-pointer bg-orange-500 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">⚽️</div>
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">A flicker</div>
          </div>
          <div className="text-gray-600 text-xs">03:00</div>
        </div>
      </li>
      <li className="border-gray-400 flex flex-row mb-2">
        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">?</div>
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">Study</div>
          </div>
          <div className="text-gray-600 text-xs">1:00 PM</div>
        </div>
      </li>
    </ul>
  </div>
);

export default Album;