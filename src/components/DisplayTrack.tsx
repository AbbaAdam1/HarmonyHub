import { BsMusicNoteBeamed } from 'react-icons/bs';
import NoSSRWrapper from "./no-ssr-wrapper";


const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
    console.log(seconds);
  };
  return (
    <div>
      <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata}/>
      <div className="audio-info">
        <div className="audio-image">
            {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack.title}</p>
          <p>{currentTrack.author}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;