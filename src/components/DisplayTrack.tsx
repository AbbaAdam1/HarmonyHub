import { BsMusicNoteBeamed } from 'react-icons/bs';
import NoSSRWrapper from "./no-ssr-wrapper";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  artistData,
}) => {
  const router = useRouter();
  const { albumId } = router.query;

  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await fetchSingleAlbumData(albumId);
      // Update the component state with the fetched album data
    };

    fetchAlbumData();
  }, [albumId]);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  console.log(artistData)

  if (!artistData) {
    // Render a placeholder or loading state when artistData is null
    return <div>Loading...</div>;
  }


  const { external_urls, followers, genres, href, id, images, name, popularity, type, url } = artistData;


  return (
    <div>
      <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata}/>
      <div className="audio-info">
        <div className="audio-image">
            {images && images.length > 0 ? (
                <Image src={images[0].url}
                width={310}
                height={310}
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
          <p className="title">{currentTrack.title}</p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;