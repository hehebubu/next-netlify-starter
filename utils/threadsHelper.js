import fs from 'fs/promises'
import path from 'path'

// utils/threadsHelper.js
import { subDays, format } from 'date-fns';

export async function fetchThreadsData(accessToken) {
  const oneWeekAgo = subDays(new Date(), 7);
  const formattedDate = format(oneWeekAgo, 'yyyy-MM-dd');

  const url = `https://graph.threads.net/v1.0/me/threads?since=${formattedDate}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch threads data');
  }

  const data = await response.json();
  return data.data; // Return the posts data
}

export async function fetchThreadsData(accessToken) {
    const response = await fetch('https://api.threads.net/v1.0/me/threads', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch threads data'); // 오류 발생 시 예외 던지기
    }
  
    const data = await response.json();
    return data.data; // 게시물 데이터 반환
  }

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
// utils/threadsHelper.js
export async function generateHTML(posts) {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Threads 데이터 요약</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .post { border: 1px solid #ddd; margin: 10px; padding: 15px; }
        </style>
      </head>
      <body>
        <h1>지난 주의 Threads 게시물</h1>
        ${posts.map(post => `
          <div class="post">
            <h3>${post.timestamp}</h3>
            <p>${post.text}</p>
          </div>
        `).join('')}
      </body>
      </html>
    `;
  
    const fileName = `threads_data_${Date.now()}.html`;
    const filePath = path.join(process.cwd(), 'public', 'reports', fileName);
    
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, htmlContent);
  
    return `/reports/${fileName}`;
  }