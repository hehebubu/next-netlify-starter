import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@styles/AuthCallback.module.css'


export default function AuthCallback() {
    const router = useRouter()
    const [status, setStatus] = useState('인증 처리 중...')
  
    useEffect(() => {
      const { code, error, error_message } = router.query
  
      if (error) {
        setStatus(`인증 오류: ${error_message || error}`)
        console.error('인증 오류:', error, error_message)
        return
      }
  
      if (code) {
        setStatus('인증 코드 확인 완료')
        console.log('인증 코드:', code)
        
        // API 호출하여 코드 처리
        handleAuthCode(code)
      }
    }, [router.query])
  
    const handleAuthCode = async (code) => {
      try {
        const response = await fetch('/api/threads/fetch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })
  
        if (response.ok) {
          setStatus('인증 성공! 메인 페이지로 이동합니다...')
          // 3초 후 메인 페이지로 이동
          setTimeout(() => {
            router.push('/')
          }, 3000)
        } else {
          setStatus('인증 처리 중 오류가 발생했습니다.')
        }
      } catch (error) {
        console.error('인증 처리 중 오류:', error)
        setStatus('인증 처리 중 오류가 발생했습니다.')
      }
    }
  
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Threads 인증</h1>
          <div className={styles.status}>{status}</div>
          <div className={styles.loader}></div>
        </div>
      </div>
    )
}