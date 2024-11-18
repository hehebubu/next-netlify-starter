import { fetchThreadsData, generateHTML } from '../../../utils/threadsHelper'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { code, startDate, endDate } = req.body

    // Threads API 호출하여 데이터 수집
    const threadsData = await fetchThreadsData(code, startDate, endDate)
    
    // HTML 파일 생성
    const htmlFilePath = await generateHTML(threadsData)

    res.status(200).json({ 
      success: true, 
      message: 'Data collected successfully',
      filePath: htmlFilePath
    })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}