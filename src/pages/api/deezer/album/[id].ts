// pages/api/deezer/album/[id].ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid album ID' });
  }

  try {
    const response = await fetch(`https://api.deezer.com/album/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // Add more detailed error logging
      const errorText = await response.text();
      console.error(`Deezer API error: ${response.status}`, errorText);
      throw new Error(`Deezer API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in Deezer album endpoint:', error);
    res.status(500).json({
      error: 'Failed to fetch album',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}