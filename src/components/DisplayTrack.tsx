import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({ currentTrack, audioRef }) => {
  return (
    <div>
      <audio src="./audio/Heartbeat.mp3" ref={audioRef} />
      <div className="audio-info">
        <div className="audio-image">
            {"./images/heartbeatthumb.jpg" ? (
            <img src="./images/heartbeatthumb.jpg" alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">Heartbeat</p>
          <p>Kero Kero Bonito</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;