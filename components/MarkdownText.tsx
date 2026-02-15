'use client'

import { ReactNode } from 'react'

interface MarkdownTextProps {
  children: string
}

export default function MarkdownText({ children }: MarkdownTextProps) {
  // Parse markdown-like syntax and convert to React elements
  const parseMarkdown = (text: string): ReactNode[] => {
    const parts: ReactNode[] = []
    let currentIndex = 0
    
    // Match **bold**, *italic*, and links
    const boldRegex = /\*\*(.*?)\*\*/g
    const italicRegex = /\*(.*?)\*/g
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    
    // First, find all matches with their positions
    const matches: Array<{ type: 'bold' | 'italic' | 'link'; start: number; end: number; content: string; url?: string }> = []
    
    let match
    while ((match = boldRegex.exec(text)) !== null) {
      matches.push({
        type: 'bold',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      })
    }
    
    while ((match = italicRegex.exec(text)) !== null) {
      matches.push({
        type: 'italic',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      })
    }
    
    while ((match = linkRegex.exec(text)) !== null) {
      matches.push({
        type: 'link',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
        url: match[2],
      })
    }
    
    // Sort matches by position
    matches.sort((a, b) => a.start - b.start)
    
    // Build the result
    let lastIndex = 0
    matches.forEach((match) => {
      // Add text before match
      if (match.start > lastIndex) {
        parts.push(text.substring(lastIndex, match.start))
      }
      
      // Add the formatted content
      if (match.type === 'bold') {
        parts.push(<strong key={`bold-${match.start}`} className="font-semibold text-gray-900">{match.content}</strong>)
      } else if (match.type === 'italic') {
        parts.push(<em key={`italic-${match.start}`} className="italic">{match.content}</em>)
      } else if (match.type === 'link') {
        parts.push(
          <a
            key={`link-${match.start}`}
            href={match.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            {match.content}
          </a>
        )
      }
      
      lastIndex = match.end
    })
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }
    
    // If no matches, return original text
    if (matches.length === 0) {
      return [text]
    }
    
    return parts
  }
  
  // Split by newlines and process each line
  const lines = children.split('\n')
  
  return (
    <div className="space-y-3">
      {lines.map((line, index) => {
        const trimmedLine = line.trim()
        
        // Empty line
        if (trimmedLine === '') {
          return <div key={index} className="h-2" />
        }
        
        // Check if it's a bullet point (• or -)
        if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
          const content = trimmedLine.substring(1).trim()
          return (
            <div key={index} className="flex items-start gap-3">
              <span className="text-gray-500 mt-0.5 flex-shrink-0">•</span>
              <div className="flex-1 leading-relaxed">{parseMarkdown(content)}</div>
            </div>
          )
        }
        
        // Check if it's a heading (starts and ends with **)
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.length > 4) {
          const content = trimmedLine.replace(/\*\*/g, '')
          return (
            <h3 key={index} className="font-semibold text-gray-900 mt-4 mb-2 text-base">
              {content}
            </h3>
          )
        }
        
        // Regular paragraph
        return (
          <p key={index} className="leading-relaxed text-gray-700">
            {parseMarkdown(line)}
          </p>
        )
      })}
    </div>
  )
}
