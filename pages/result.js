import { useEffect, useState } from 'react';

export default function Result() {
    const [reportUrl, setReportUrl] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const url = localStorage.getItem('reportUrl');
        const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 가져오기
        if (url) setReportUrl(url);
        if (token) setAccessToken(token); // 액세스 토큰 상태 업데이트
    }, []);

    return (
        <div>
            <h1>데이터 수집 완료</h1>
            {reportUrl && (
                <a href={reportUrl} target="_blank" rel="noopener noreferrer">
                    리포트 보기
                </a>
            )}
            {accessToken && (
                <div>
                    <h2>액세스 토큰:</h2>
                    <p>{accessToken}</p> {/* 액세스 토큰 표시 */}
                </div>
            )}
        </div>
    );
}