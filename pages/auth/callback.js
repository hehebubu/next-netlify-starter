import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchThreadsData, generateHTML } from '../../utils/threadsHelper'; // Ensure these are correctly imported

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('인증 처리 중...');

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      handleAuthCode(code);
    }
  }, [router.query]);

  const handleAuthCode = async (code) => {
    const clientId = process.env.NEXT_PUBLIC_THREADS_CLIENT_ID; // Ensure these are set in your environment
    const clientSecret = process.env.THREADS_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    try {
      // 1차 액세스 토큰 받기
      const shortToken = await getAccessToken(code, clientId, clientSecret, redirectUri);
      console.log('Short-lived access token:', shortToken);

      // 장기 액세스 토큰 받기
      const longLivedToken = await getLongLivedToken(shortToken, clientSecret);
      console.log('Long-lived access token:', longLivedToken);

      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', longLivedToken);

      // 최근 1주일간 게시물 가져오기
      const posts = await fetchThreadsData(longLivedToken);
      
      // HTML 파일 생성
      const htmlFilePath = await generateHTML(posts);
      setStatus(`HTML 파일이 생성되었습니다: <a href="${htmlFilePath}" target="_blank">${htmlFilePath}</a>`);
      
      // 3초 후 메인 페이지로 이동
      setTimeout(() => {
        router.push('/result');
      }, 3000);
    } catch (error) {
      console.error('인증 처리 중 오류:', error);
      setStatus('인증 처리 중 오류가 발생했습니다.');
    }
  };

  // 1차 액세스 토큰을 가져오는 함수
  const getAccessToken = async (code, clientId, clientSecret, redirectUri) => {
    const url = "https://graph.threads.net/oauth/access_token";
    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code: code
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.access_token; // 1차 액세스 토큰 반환
    } else {
      throw new Error("Failed to get access token");
    }
  };

  // 장기 액세스 토큰을 가져오는 함수
  const getLongLivedToken = async (shortToken, clientSecret) => {
    const url = `https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=${clientSecret}&access_token=${shortToken}`;
    
    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.access_token; // 장기 액세스 토큰 반환
    } else {
      throw new Error("Failed to get long-lived token");
    }
  };

  const generateHtmlReport = async (posts) => {
        const response = await fetch('/api/generateHtml', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ posts }), // Send posts data to the API
        });

        if (response.ok) {
            const { fileUrl } = await response.json();
            console.log('HTML report generated at:', fileUrl);
        } else {
            console.error('Failed to generate HTML report');
        }
    };

  return (
    <div>
      <h1>인증 처리 중...</h1>
      <div dangerouslySetInnerHTML={{ __html: status }} />
    </div>
  );
}