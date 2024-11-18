import styles from './ThreadsAuthButton.module.css'

export default function ThreadsAuthButton() {
  const handleThreadsAuth = () => {
    // Threads 인증 로직 구현
    console.log('Threads 인증 시도')
  }

  return (
    <button className={styles.button} onClick={handleThreadsAuth}>
      Threads ID로 인증하기
    </button>
  )
}