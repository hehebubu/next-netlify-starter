import fs from 'fs/promises'
import path from 'path'

async function getAccessToken(code) {
    const response = await fetch('https://graph.threads.net/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_THREADS_CLIENT_ID,
        client_secret: process.env.THREADS_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        code: code
      })
    })
  
    if (!response.ok) {
      throw new Error('Failed to get access token')
    }
  
    const data = await response.json()
    return data.access_token
  }

export async function generateHTML(data) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Threads Data</title>
        <style>
          /* CSS 스타일 정의 */
          body { font-family: Arial, sans-serif; }
          .post { border: 1px solid #ddd; margin: 10px; padding: 15px; }
          /* ... 추가 스타일 ... */
        </style>
      </head>
      <body>
        <h1>Threads Posts</h1>
        ${data.map(post => `
          <div class="post">
            <h3>${post.timestamp}</h3>
            <p>${post.text}</p>
            <div class="stats">
              <span>좋아요: ${post.likes}</span>
              <span>답글: ${post.replies}</span>
              <span>조회수: ${post.views}</span>
            </div>
          </div>
        `).join('')}
      </body>
    </html>
  `

  const fileName = `threads_data_${Date.now()}.html`
  const filePath = path.join(process.cwd(), 'public', 'reports', fileName)
  
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, htmlContent)

  return `/reports/${fileName}`
}
