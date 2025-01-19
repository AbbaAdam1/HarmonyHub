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
  try {
    const albumsDataPromises = albumIds.map(id => getAlbumData(id));
    const albumsData = await Promise.all(albumsDataPromises);
    return albumsData;
  } catch (error) {
    console.error('Error fetching album data:', error);
    throw error;
  }
};

export const fetchAlbumsData = async (): Promise<DeezerAlbumData[]> => {
  try {
    const ids = [
      '353182427',
      '96126',
      '298400782',
      '41232611',
      '81797',
      '12350152',
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