export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  
    const { code } = req.body
  
    try {
      // 여기서 code를 사용하여 액세스 토큰을 얻는 API 호출
      // Threads API 엔드포인트로 요청을 보내고 토큰을 받아옴
      
      // 예시:
      // const tokenResponse = await fetch('threads_token_endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     code,
      //     client_id: process.env.THREADS_CLIENT_ID,
      //     client_secret: process.env.THREADS_CLIENT_SECRET,
      //     grant_type: 'authorization_code'
      //   })
      // })
  
      // const tokenData = await tokenResponse.json()
  
      // 성공 응답
      res.status(200).json({ success: true })
    } catch (error) {
      console.error('Token exchange error:', error)
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }