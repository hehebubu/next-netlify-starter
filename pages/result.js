import { useEffect, useState } from 'react';

export default function Result() {
  const [reportUrl, setReportUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const url = localStorage.getItem('reportUrl');
    if (url) setReportUrl(url);
  }, []);

  const handleDownload = async () => {
    const response = await fetch('/api/threads/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* Include any necessary data */ }),
    });

    if (response.ok) {
      const { fileUrl } = await response.json();
      setDownloadUrl(fileUrl);
      window.open(fileUrl, '_blank'); // Open the file in a new tab
    } else {
      console.error('Failed to download the file');
    }
  };

  return (
    <div>
      <h1>데이터 수집 완료</h1>
      {reportUrl && (
        <a href={reportUrl} target="_blank" rel="noopener noreferrer">
          리포트 보기
        </a>
      )}
      <button onClick={handleDownload}>지난 주 게시물 다운로드</button>
      {downloadUrl && (
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
          다운로드 링크
        </a>
      )}
    </div>
  );
}