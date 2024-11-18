import styles from './ThreadsAuthButton.module.css'

export default function ThreadsAuthButton() {
    const handleThreadsAuth = () => {
      const AUTH_URL = 'https://threads.net/oauth/authorize'
      const params = {
        client_id: process.env.NEXT_PUBLIC_THREADS_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        scope: 'threads_basic,threads_content_publish,threads_read_replies,threads_manage_replies,threads_manage_insights',
        response_type: 'code'
      }
  
      const queryString = new URLSearchParams(params).toString()
      window.location.href = `${AUTH_URL}?${queryString}`
    }
  
    return (
        <button className={styles.button} onClick={handleThreadsAuth}>  
            Threads ID로 인증하기
        </button>
    )
  }