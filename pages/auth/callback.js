import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/AuthCallback.module.css';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('인증 처리 중...');

  useEffect(() => {
    const { code, error, error_message } = router.query;

    if (error) {
      setStatus(`인증 오류: ${error_message || error}`);
      console.error('인증 오류:', error, error_message);
      return;
    }

    if (code) {
      setStatus('인증 코드 확인 완료');
      console.log('인증 코드:', code);
      
      // API 호출하여 코드 처리
      handleAuthCode(code);
    }
  }, [router.query]);

  const handleAuthCode = async (code) => {
    try {
      const tokenResponse = await fetch('/api/threads/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      if (!tokenResponse.ok) {
        setStatus('인증 처리 중 오류가 발생했습니다.');
        return;
      }
  
      const { access_token } = await tokenResponse.json();
  
      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', access_token);
  
      // 최근 1주일간 게시물 가져오기
      const posts = await fetchThreadsData(access_token);
      
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


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Threads 인증</h1>
        <div className={styles.status}>{status}</div>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}