// components/DeezerAPI.tsx
export interface DeezerAlbumData {
  id: string;
  tracks: {
    items: TrackData[];
  };
  images: { url: string }[];
  name: string;
  artists: { name: string }[];
  external_urls: { deezer: string };
}

interface TrackData {
  id: string;
  name: string;
  preview_url: string;
  duration_ms: number;
}

export const getAlbumData = async (albumId: string) => {
  try {
    const response = await fetch(`/api/deezer/album/${albumId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const albumData = await response.json();

    // Deezer can return an error object with HTTP 200 (e.g. code 800: no data).
    if (albumData?.error) {
      throw new Error(`Deezer error for album ${albumId}: ${albumData.error.message ?? 'Unknown error'}`);
    }

    if (!albumData?.tracks?.data || !albumData?.artist?.name) {
      throw new Error(`Unexpected Deezer payload for album ${albumId}`);
    }

    return {
      id: albumData.id.toString(),
      tracks: {
        items: albumData.tracks.data.map((track: any) => ({
          id: track.id.toString(),
          name: track.title,
          preview_url: track.preview,
          duration_ms: track.duration * 1000
        }))
      },
      images: [{ url: albumData.cover_xl }],
      name: albumData.title,
      artists: [{ name: albumData.artist.name }],
      external_urls: { deezer: albumData.link }
    };
  } catch (error) {
    console.error('Error fetching single album data:', error);
    throw error;
  }
};

export const fetchSingleAlbumData = async (albumId: string): Promise<DeezerAlbumData> => {
  try {
    const albumData = await getAlbumData(albumId);
    return albumData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getAlbumsData = async (albumIds: string[]) => {
  const albumResults = await Promise.allSettled(albumIds.map((id) => getAlbumData(id)));

  const fulfilledAlbums = albumResults
    .filter((result): result is PromiseFulfilledResult<DeezerAlbumData> => result.status === 'fulfilled')
    .map((result) => result.value);

  const rejectedAlbums = albumResults.filter((result) => result.status === 'rejected');
  if (rejectedAlbums.length > 0) {
    console.warn(`Skipped ${rejectedAlbums.length} album(s) due to Deezer payload errors.`);
  }

  if (fulfilledAlbums.length === 0) {
    throw new Error('No albums could be fetched from Deezer');
  }

  return fulfilledAlbums;
};

export const fetchAlbumsData = async (): Promise<DeezerAlbumData[]> => {
  try {
    const ids = [
      '353182427',
      '96126',
      '298400782',
      '41232611',
      '81797',
      '412317617',
      '68258021',
      '13204564',
      '113976',
      '405525497',
      '686316781',
      '146495172',
    ];
    const albumsData = await getAlbumsData(ids);
    return albumsData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
/*
export const searchAlbum = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error searching albums:', error);
    throw error;
  }
};
*/