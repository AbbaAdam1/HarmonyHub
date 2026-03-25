// pages/api/deezer/album/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (typeof id !== 'string' || !/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid album ID' });
  }

  const controller = new AbortController();
  const timeoutMs = 8000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`https://api.deezer.com/album/${id}`, {
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Deezer API error: ${response.status}`, errorText);
      return res.status(response.status).json({
        error: 'Failed to fetch album from Deezer'
      });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return res.status(504).json({ error: 'Upstream request timed out' });
    }

    console.error('Error in Deezer album endpoint:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  } finally {
    clearTimeout(timeoutId);
  }
}