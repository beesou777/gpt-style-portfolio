import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const rssUrl = 'https://medium.com/feed/@shahbishwa21'
    const response = await fetch(rssUrl)
    
    if (!response.ok) {
      throw new Error('Failed to fetch Medium RSS feed')
    }
    
    const xml = await response.text()
    
    // Parse RSS XML (simple regex-based parsing)
    const items: Array<{ title: string; link: string; description: string; pubDate: string }> = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match
    
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1]
      const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/)
      const descriptionMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)
      const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/)
      
      if (titleMatch && linkMatch) {
        items.push({
          title: titleMatch[1] || '',
          link: linkMatch[1] || '',
          description: descriptionMatch ? descriptionMatch[1].substring(0, 200) + '...' : '',
          pubDate: pubDateMatch ? pubDateMatch[1] : '',
        })
      }
    }
    
    return Response.json({ articles: items.slice(0, 10) })
  } catch (error: any) {
    console.error('Medium RSS error:', error)
    return Response.json({ articles: [] }, { status: 200 })
  }
}
