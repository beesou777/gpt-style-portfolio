'use client'

import { ExternalLink, Github } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import SkillsDisplay from './SkillsDisplay'
import BlogPostsDisplay from './BlogPostsDisplay'
import ContactDisplay from './ContactDisplay'
import MarkdownText from './MarkdownText'

interface Project {
  name: string
  description: string
  type: string
  tech?: string[]
  link?: string
  icon?: string
  image?: string | null
  highlight?: boolean
}

interface MessageContentProps {
  content: string
}

export default function MessageContent({ content }: MessageContentProps) {
  // Check for skills display
  if (content.includes('{{SKILLS_DISPLAY}}')) {
    return <SkillsDisplay />
  }

  // Check for blog posts display
  if (content.includes('{{BLOG_POSTS}}')) {
    return <BlogPostsDisplay />
  }

  // Check for contact display
  if (content.includes('{{CONTACT_DISPLAY}}')) {
    return <ContactDisplay />
  }

  // Check if content contains project data markers
  const projectMarker = '{{PROJECTS:'
  const hasProjects = content.includes(projectMarker)

  if (hasProjects) {
    // Extract project names from markers
    const projectMatches = content.matchAll(/{{PROJECTS:([^}]+)}}/g)
    const projectNames: string[] = []
    for (const match of projectMatches as any) {
      projectNames.push(match[1])
    }

    // Get projects from portfolio data
    const projects:any[] = projectNames
      .map((name) => portfolioData.projects.find((p) => p.name === name))
      .filter((p:any): p is Project => p !== undefined)

    // Remove markers from content
    let cleanContent = content
    projectNames.forEach((name) => {
      cleanContent = cleanContent.replace(`{{PROJECTS:${name}}}`, '')
    })

    // Get all unique tech stacks from projects
    const allTechStacks = new Set<string>()
    projects.forEach(project => {
      project.tech?.forEach((tech: string) => allTechStacks.add(tech))
    })
    const uniqueTechs = Array.from(allTechStacks)

    return (
      <div className="space-y-6">
        <div className="text-gray-700">
          <MarkdownText>{cleanContent.trim()}</MarkdownText>
        </div>
        
        {projects.length > 0 && (
          <>
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{project.icon || '•'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {project.name}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                          >
                            {project.link.includes('github.com') ? (
                              <Github className="w-4 h-4" />
                            ) : (
                              <ExternalLink className="w-4 h-4" />
                            )}
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">
                        {project.description}
                      </p>
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((tech: string) => (
                            <span
                              key={tech}
                              className="text-xs text-gray-500 border border-gray-300 px-2 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Summary */}
            {uniqueTechs.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Through these projects, Bishwa has demonstrated experience with:
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {uniqueTechs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This showcases his potential in full-stack development, modern frameworks, and building scalable web applications.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  // Regular text content - use MarkdownText for proper formatting
  return (
    <div className="text-gray-700">
      <MarkdownText>{content}</MarkdownText>
    </div>
  )
}
