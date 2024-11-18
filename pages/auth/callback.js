import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('인증 처리 중...')

  useEffect(() => {
    const { code } = router.query

    if (code) {
      setStatus('인증 코드 확인 완료')
      console.log('인증 코드:', code)
      
      // 3초 후 메인 페이지로 이동
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [router.query])

  return (
    <div className="container">
      <div className="card">
        <h1>Threads 인증</h1>
        <div className="status">{status}</div>
        <div className="loader"></div>
      </div>
    </div>
  )
}