export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const { code } = req.body;
      console.log('Received auth code:', code);  // 디버깅용
  
      // 액세스 토큰 얻기
      const tokenResponse = await fetch('https://graph.threads.net/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_THREADS_CLIENT_ID,
          client_secret: process.env.THREADS_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
          code: code,
        }),
      });
  
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token error:', errorData);
        return res.status(400).json({ 
          success: false, 
          message: 'Failed to get access token',
          error: errorData,
        });
      }
  
      const tokenData = await tokenResponse.json();
      console.log('Token received:', tokenData);  // 디버깅용
  
      // 토큰을 사용하여 추가 작업 수행 가능
      // 예: 사용자 정보 가져오기, 게시물 작성 등
  
      res.status(200).json({ 
        success: true, 
        message: 'Authentication successful',
        // token: tokenData.access_token  // 필요한 경우 토큰 반환
      });
  
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: error.message,
      });
    }
  }