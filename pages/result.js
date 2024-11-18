import { useEffect, useState } from 'react'

export default function Result() {
  const [reportUrl, setReportUrl] = useState(null)

  useEffect(() => {
    // localStorage나 상태 관리를 통해 생성된 리포트 URL 가져오기
    const url = localStorage.getItem('reportUrl')
    if (url) setReportUrl(url)
  }, [])

  return (
    <div>
      <h1>데이터 수집 완료</h1>
      {reportUrl && (
        <a href={reportUrl} target="_blank" rel="noopener noreferrer">
          리포트 보기
        </a>
      )}
    </div>
  )
}