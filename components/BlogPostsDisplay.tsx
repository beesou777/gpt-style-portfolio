'use client'

import { motion } from 'framer-motion'
import { ExternalLink, BookOpen } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

export default function BlogPostsDisplay() {
  const { blogPosts, socialLinks } = portfolioData

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <p className="text-gray-700 font-medium">
          Bishwa writes technical articles on Medium! Here are his articles:
        </p>
      </div>
      
      <div className="space-y-3">
        {blogPosts.map((blog) => (
          <a
            key={blog.url}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b border-gray-200 pb-3 last:border-0 last:pb-0 hover:opacity-70 transition-opacity"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 mb-1">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {blog.description}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
            </div>
          </a>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: blogPosts.length * 0.1 }}
        className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <p className="text-sm text-blue-900">
          📚 <strong>Read all articles:</strong>{' '}
          <a
            href={socialLinks.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-700"
          >
            {socialLinks.medium}
          </a>
        </p>
        <p className="text-xs text-blue-700 mt-2">
          Bishwa shares knowledge about JavaScript, web development, SCSS, and various programming concepts.
        </p>
      </motion.div>
    </div>
  )
}
