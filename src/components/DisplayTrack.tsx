import { BsMusicNoteBeamed } from 'react-icons/bs';
import NoSSRWrapper from "./no-ssr-wrapper";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { fetchArtistData } from '../components/spotifyAPI';
import { fetchAlbumData } from '../components/spotifyAPI';
import { useState, useEffect } from 'react';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  albumData,
  currentTrackIndex
}) => {
  if (!currentTrack) {
    return <div>Loading...</div>;
  }
  const onLoadedMetadata = () => {
    const seconds = 30;
    setDuration(30);
    progressBarRef.current.max = 30;
  };
/*
  const [artistData, setArtistData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtistData();
      setArtistData(data);
    };

    fetchData();
  }, []);
*/

/*
  const [albumData, setAlbumData] = useState(null);
  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await fetchSingleAlbumData(albumId);
      setAlbumData(data);
      // Update the component state with the fetched album data
    };

    fetchAlbumData();
  }, [albumId]);

  console.log(albumData)
/*
  if (!artistData) {
    // Render a placeholder or loading state when artistData is null
    return <div>Loading...</div>;
  }
*/
console.log(albumData)
  if (!albumData) {
    // Render a placeholder or loading state when albumData is null
    return <div>Loading...</div>;
  }
  console.log(albumData)

 // const { external_urls, followers, genres, href, id, images, name, popularity, type, url } = artistData;

  return (
    <div>
      <audio src={currentTrack} ref={audioRef} onLoadedMetadata={onLoadedMetadata}/>
      <div className="audio-info">
        <div className="audio-image">
            {albumData.images && albumData.images.length > 0 ? (
                <Image src={albumData.images[0].url}
                width={albumData.images[0].width}
                height={albumData.images[0].height}
                alt="audio avatar" />
        ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{albumData.name}</p>
          <p>{albumData.artists[0].name}</p>
        </div>
      </div>
      <p>{albumData.tracks.items[currentTrackIndex]?.name}</p>
    </div>
  );
};
export default DisplayTrack;