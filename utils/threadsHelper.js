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
// 액세스 토큰을 가져오는 함수
async function getAccessToken(code, clientId, clientSecret, redirectUri) {
    const url = "https://graph.threads.net/oauth/access_token";
    const data = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code: code
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.access_token; // 1차 액세스 토큰 반환
    } else {
        throw new Error("Failed to get access token");
    }
}

// 장기 액세스 토큰을 가져오는 함수
async function getLongLivedToken(shortToken, clientSecret) {
    const url = `https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=${clientSecret}&access_token=${shortToken}`;
    
    const response = await fetch(url, {
        method: 'GET',
    });

    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.access_token; // 장기 액세스 토큰 반환
    } else {
        throw new Error("Failed to get long-lived token");
    }
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