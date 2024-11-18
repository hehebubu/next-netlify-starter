import fs from 'fs/promises';
import path from 'path';

// Function to generate HTML content from posts
function generateHtmlContent(posts) {
    // Example of generating HTML content
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Posts Report</title>
    </head>
    <body>
        <h1>Recent Posts</h1>
        ${posts.map(post => `<div><h2>${post.title}</h2><p>${post.content}</p></div>`).join('')}
    </body>
    </html>
    `;
}

export default async function handler(req, res) {
    const { posts } = req.body; // Assuming you're sending posts in the request body

    const htmlContent = generateHtmlContent(posts); // Generate HTML content
    const filePath = path.join(process.cwd(), 'public', 'reports', 'report.html');

    try {
        await fs.writeFile(filePath, htmlContent);
        res.status(200).json({ fileUrl: '/reports/report.html' });
    } catch (error) {
        console.error('Error writing file:', error);
        res.status(500).json({ message: 'Error generating report' });
    }
}