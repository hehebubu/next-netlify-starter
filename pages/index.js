import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ThreadsAuthButton from '@components/ThreadsAuthButton'

import Image from 'next/image'
import Link from 'next/link'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
          startDate: '2024-01-01',  // 원하는 시작 날짜
          endDate: '2024-03-19'     // 원하는 종료 날짜
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
        <Header title="Welcome to TRBG!" />
        
        <ThreadsAuthButton />
        <p className="description">
          Powered by @<a href="https://www.threads.net/@hehe_bubu" className="description">hehe_bubu </a>
        </p>
      </main>

      <Footer />
    </div>
  )
}