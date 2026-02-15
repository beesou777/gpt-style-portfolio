import { NextRequest } from 'next/server'
import portfolioData from '@/data/portfolio.json'

// Helper function to check if query matches keywords
function matchesKeywords(query: string, keywords: string[]): boolean {
  const lowerQuery = query.toLowerCase()
  return keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))
}

// Generate response based on user query
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  // Skills and technologies
  if (matchesKeywords(query, ['technolog', 'skill', 'stack', 'framework', 'language', 'tool', 'use', 'know'])) {
    return `{{SKILLS_DISPLAY}}`
  }

  // Backend experience
  if (matchesKeywords(query, ['backend', 'server', 'api', 'database', 'mongodb', 'postgres', 'node', 'fullstack', 'nest', 'hono'])) {
    return `Yes! Bishwa has extensive backend and full-stack experience. He works with **Nest.js** and **Hono.js** as his primary backend frameworks, along with **Node.js** and **Express**. He uses **MongoDB** and **PostgreSQL** for databases. He has experience building scalable backend APIs and services using these modern frameworks.`
  }

  // Writing/Blog - Check this BEFORE projects to avoid conflicts
  if (matchesKeywords(query, ['writing', 'article', 'blog', 'medium', 'content', 'write', 'post', 'blogs'])) {
    return `{{BLOG_POSTS}}`
  }

  // Experience and background
  if (matchesKeywords(query, ['experience', 'background', 'work', 'career', 'professional', 'year', 'time', 'job'])) {
    const startYear = portfolioData.owner.startYear || 2021
    
    const workExp = portfolioData.workExperience.map(exp => 
      `**${exp.role}** at ${exp.company} (${exp.duration}) - ${exp.responsibilities}`
    ).join('\n\n')
    
    return `Bishwa started his journey in ${startYear} and has been building modern web applications. Here's some of his professional background:\n\n${workExp}\n\nHis focus is on ${portfolioData.owner.current_focus.toLowerCase()}.`
  }

  // Projects - Check for specific project keywords, but exclude blog-related
  if (matchesKeywords(query, ['project', 'built', 'create', 'portfolio', 'github']) && !matchesKeywords(query, ['blog', 'article', 'writing', 'medium', 'post'])) {
    // Get highlighted projects first, then others
    const highlightedProjects = portfolioData.projects.filter(p => p.highlight)
    const otherProjects = portfolioData.projects.filter(p => !p.highlight)
    const allProjects = [...highlightedProjects, ...otherProjects]
    
    if (lowerQuery.includes('best') || lowerQuery.includes('favorite') || (lowerQuery.includes('show') && !lowerQuery.includes('blog')) || lowerQuery.includes('all')) {
      const projectMarkers = allProjects.slice(0, 8).map(p => `{{PROJECTS:${p.name}}}`).join('')
      return `Here are some of Bishwa's notable projects:\n\n${projectMarkers}`
    }
    
    const projectNames = portfolioData.projects.map(p => `${p.name} ${p.icon || '🚀'}`).join(', ')
    return `Bishwa has worked on several projects including: ${projectNames}.\n\nThese projects demonstrate his skills in creating modern, responsive web applications. Ask me to "show your projects" to see detailed information with images and links!`
  }

  // Specific projects
  for (const project of portfolioData.projects) {
    if (lowerQuery.includes(project.name.toLowerCase()) || lowerQuery.includes(project.name.toLowerCase().replace(/\s+/g, ''))) {
      const projectMarker = `{{PROJECTS:${project.name}}}`
      return `Here's information about **${project.name}**:\n\n${projectMarker}`
    }
  }

  // Contact and social
  if (matchesKeywords(query, ['contact', 'reach', 'social', 'github', 'linkedin', 'instagram', 'medium', 'email', 'connect', 'link', 'whatsapp'])) {
    return `{{CONTACT_DISPLAY}}`
  }

  // Role and position
  if (matchesKeywords(query, ['role', 'position', 'job', 'title', 'developer', 'designer', 'who', 'what does'])) {
    return `Bishwa Jung Shah is a ${portfolioData.owner.role.toLowerCase()}. ${portfolioData.owner.description}\n\nHe's currently working at Detech as a Fullstack Developer, focusing on modern web technologies.`
  }

  // Vue.js specific
  if (matchesKeywords(query, ['vue', 'nuxt', 'vue.js', 'nuxt.js'])) {
    return `Vue.js and Nuxt.js are among Bishwa's primary frontend frameworks. He specializes in building modern, reactive web applications using Vue.js and leverages Nuxt.js for server-side rendering and static site generation. He has commercial experience working with these frameworks at companies like Hyteno and Morgenland.`
  }

  // React/Next.js
  if (matchesKeywords(query, ['react', 'next', 'next.js', 'react.js'])) {
    return `Bishwa also works with React and Next.js! He has built projects like Movix (a React movie app) and uses React for various frontend applications. He's skilled in both Vue.js and React ecosystems.`
  }

  // Nest.js
  if (matchesKeywords(query, ['nest', 'nest.js', 'nestjs'])) {
    return `Bishwa has experience with **Nest.js**, a progressive Node.js framework for building efficient and scalable server-side applications. He uses Nest.js for building robust backend APIs with TypeScript, dependency injection, and modular architecture.`
  }

  // Hono.js
  if (matchesKeywords(query, ['hono', 'hono.js'])) {
    return `Bishwa has experience with **Hono.js**, an ultrafast web framework for building lightweight and performant APIs. He uses Hono.js for building fast backend services and REST APIs with excellent performance.`
  }

  // Company/Workplace
  if (matchesKeywords(query, ['company', 'workplace', 'work at', 'hyteno', 'morgenland', 'mediaholic'])) {
    if (lowerQuery.includes('hyteno') || lowerQuery.includes('morgenland')) {
      return `Bishwa worked as a Junior Developer at Hyteno/Morgenland for 8 months, where he developed web applications, improved coding skills, and worked extensively with Vue.js.`
    }
    if (lowerQuery.includes('mediaholic')) {
      return `Bishwa started his career as an Intern at Mediaholic for 5 months, where he worked on Vue.js projects and contributed to front-end development.`
    }
    return `Bishwa has worked at:\n\n- **Hyteno/Morgenland** - Junior Developer (8 months)\n- **Mediaholic** - Intern (5 months)`
  }


  // Location/About
  if (matchesKeywords(query, ['where', 'location', 'from', 'nepal'])) {
    return `Bishwa is from ${portfolioData.owner.location}. He's a self-taught fullstack developer who has built his skills through hands-on experience and continuous learning. Currently working as a Fullstack Developer at Detech.`
  }


  // Fun facts / Hobbies
  if (matchesKeywords(query, ['fun', 'interesting', 'hobby', 'interest', 'fun fact', 'cool', 'hobbies', 'what do you like'])) {
    const hobbies = portfolioData.owner.hobbies.map(h => `• ${h}`).join('\n')
    return `Here are some fun things about Bishwa:\n\n${hobbies}\n\n**Fun Facts:**\n• 🌴 Currently on vacation and living his best life!\n• 📝 Writes technical articles on Medium about JavaScript, SCSS, and web development\n• 🤖 Enjoys building Discord bots and Telegram bots as side projects\n• 🎨 Passionate about creating interactive and visually appealing applications\n• 💡 Believes in not comparing yourself with others - focus on your own growth!\n• 🚀 Always exploring new technologies and contributing to open-source projects\n\nHe's passionate about web development and loves trying out new things!`
  }

  // About Me / Tell me about yourself
  if (matchesKeywords(query, ['hello', 'hi', 'hey', 'greeting', 'start', 'tell me about yourself', 'about you', 'who are you', 'introduce'])) {
    const startYear = portfolioData.owner.startYear || 2021
    
    return `Hello! I'm Bishwa Jung Shah, a Fullstack Developer. 👋\n\n${portfolioData.owner.detailedDescription}\n\n**Role:** ${portfolioData.owner.role}\n**Location:** ${portfolioData.owner.location}\n**Started:** ${startYear}\n\n**What I Do:**\n• Build modern, responsive web applications\n• Focus on performance optimization and clean code\n• Create interactive UI/UX with smooth animations\n• Manage backend services and databases\n• Write technical blogs and contribute to open-source\n\nYou can ask me about my projects, skills, work experience, hobbies, or how to contact me!`
  }

  // Default response
  return `I can help you learn about Bishwa's skills, projects, and experience. Try asking about:\n\n• What technologies he uses\n• His projects and work\n• His backend/fullstack experience\n• How to contact him\n• His blog posts on Medium\n\nI don't have that specific information in the portfolio yet, but feel free to ask about his skills, projects, or professional background!`
}

// Simulate typing delay for realistic AI-like behavior
function streamText(text: string, delay: number = 20): ReadableStream {
  const encoder = new TextEncoder()
  let index = 0

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delay))
        controller.enqueue(encoder.encode(text[i]))
      }
      controller.close()
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userQuery = lastMessage?.content || ''

    // Generate response based on query
    const response = generateResponse(userQuery)

    // Stream the response with typing animation
    return new Response(streamText(response, 15), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to process chat' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
