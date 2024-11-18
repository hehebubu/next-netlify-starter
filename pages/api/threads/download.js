// pages/api/threads/download.js
import { fetchThreadsData, generateHTML } from '../../../utils/threadsHelper';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { accessToken } = req.body; // Get the access token from the request body
    const posts = await fetchThreadsData(accessToken);
    const fileUrl = await generateHTML(posts); // Generate the HTML file

    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}