import { useEffect, useState } from 'react';

export default function Result() {
  const [reportUrl, setReportUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const url = localStorage.getItem('reportUrl');
    const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 가져오기
    if (url) setReportUrl(url);
    if (token) setAccessToken(token); // 액세스 토큰 상태 업데이트
  }, []);

  const handleDownload = async () => {
    const response = await fetch('/api/threads/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }), // 액세스 토큰을 요청 본문에 포함
    });

    if (response.ok) {
      const { fileUrl } = await response.json();
      window.open(fileUrl, '_blank'); // 새 탭에서 파일 열기
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
      {accessToken && ( // 액세스 토큰이 있을 때만 다운로드 버튼 표시
        <button onClick={handleDownload}>지난 주 게시물 다운로드</button>
      )}
    </div>
  );
}