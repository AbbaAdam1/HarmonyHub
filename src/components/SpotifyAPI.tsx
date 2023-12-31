import axios from 'axios';
import React, { useState, useEffect } from 'react';

const clientId = '34980fdd86484119b151be617f1d5444';
const clientSecret = 'fc6d9335209c474a89fb02f364bde157';

export interface SpotifyAlbumData {
  id: string;
  tracks: {
    items: TrackData[];
  };
  images: { url: string }[];
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
}

interface TrackData {
  id: string;
  name: string;
  preview_url: string;
  duration_ms: number;
}

export const requestAccessToken = async () => {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error requesting access token:', error);
    throw error;
  }
};

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await requestAccessToken();
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

// Single Album
export const getSingleAlbumData = async (albumId : string) => {
  try {
    const response = await axiosInstance.get(`/albums/${albumId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single album data:', error);
    throw error;
  }
};

export const fetchSingleAlbumData = async (albumId: string): Promise<SpotifyAlbumData> => {
  try {
    const albumData = await getSingleAlbumData(albumId);
    return albumData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Multiple Albums
export const getAlbumsData = async (albumIds: string[]) => {
  try {
    const albumsDataPromises = albumIds.map(async (id) => {
      const response = await axiosInstance.get(`/albums/${id}`);
      return response.data;
    });

    const albumsData = await Promise.all(albumsDataPromises);
    return albumsData;
  } catch (error) {
    console.error('Error fetching album data:', error);
    throw error;
  }
};

export const fetchAlbumsData = async (): Promise<SpotifyAlbumData[]> => {
  try {
    const ids = [
      '5vDVFuzV8aAIymXSkpyJoe',
      '2ANVost0y2y52ema1E9xAZ',
      '4VZ7jhV0wHpoNPCB7Vmiml',
      '1c9Sx7XdXuMptGyfCB6hHs',
      '0FZK97MXMm5mUQ8mtudjuK',
      '6f5gAJpM85TE6aQ81h46T5',
      '27ThgFMUAx3MXLQ297DzWF',
      '71QyofYesSsRMwFOTafnhB',
      '5eg56dCpFn32neJak2vk0f',
      '22PkV1Le9P3X4RY4xtmK0q',
      '0UMMIkurRUmkruZ3KGBLtG',
      '3OvZYx7AAGplmJjwD29JiV'
    ];
    const albumsData = await getAlbumsData(ids);
    return albumsData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
