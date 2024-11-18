import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ThreadsAuthButton from '@components/ThreadsAuthButton'

import Image from 'next/image'
import Link from 'next/link'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

// pages/result.js
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

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // URL에서 code 파라미터 추출
    const { code } = router.query
    
    if (code) {
      // API 호출
      fetchThreadsData(code)
    }
  }, [router.query])

  const fetchThreadsData = async (code) => {
    try {
      const response = await fetch('/api/threads/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          startDate: '2024-03-01',  // 원하는 시작 날짜
          endDate: '2024-05-19'     // 원하는 종료 날짜
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('데이터 수집 완료:', data)
        // 데이터 수집 완료 후 처리 (예: 결과 페이지로 이동)
        router.push('/result')
      }
    } catch (error) {
      console.error('데이터 수집 중 오류:', error)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <Image
            src="/main_logo.png"
            alt="TRBG Logo"
            width={200}
            height={100}
            priority
            className="logo"
          />
        </Link>
        <Header title="Welcome to TRBG!!" />
        <p> Welcome to 쓰레받기!! </p>
        <ThreadsAuthButton />
        <p className="description">
          Powered by @<a href="https://www.threads.net/@hehe_bubu" className="description">hehe_bubu </a>
        </p>
      </main>

      <Footer />
    </div>
  )
}