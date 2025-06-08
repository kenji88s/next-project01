// pages/index.tsx
import { useEffect, useState } from 'react';

type FileItem = {
  id: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
};

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    fetch('/api/drive')
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>📁 Google Drive 画像ビューア</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {files.map((file) => (
          <a key={file.id} href={file.webViewLink} target="_blank" rel="noopener noreferrer">
            <img src={file.thumbnailLink} alt={file.name} style={{ width: 120, height: 120, objectFit: 'cover' }} />
            <p style={{ width: 120, wordWrap: 'break-word' }}>{file.name}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
