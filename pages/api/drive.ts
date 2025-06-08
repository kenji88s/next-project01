// pages/api/drive.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { drive } from '../../lib/google';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, webViewLink, webContentLink, thumbnailLink)',
    });
    res.status(200).json(response.data.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch files from Google Drive.' });
  }
}
