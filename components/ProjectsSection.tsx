'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

export default function ProjectsSection() {
  const { projects } = portfolioData

  return (
    <section className="min-h-screen bg-chat-sidebar py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-xl text-gray-400">
            A collection of my work and contributions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-chat-input rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl mb-2">{project.icon}</div>
                {project.link && (
                  <div className="flex gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-chat-sidebar hover:bg-chat-hover rounded-lg text-gray-400 hover:text-white transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>

              <p className="text-sm text-gray-400 mb-3 bg-chat-sidebar px-2 py-1 rounded inline-block">
                {project.type}
              </p>

              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              {project.tech && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-chat-sidebar text-xs text-gray-400 rounded border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.focus && (
                <p className="text-sm text-gray-500 italic">
                  Focus: {project.focus}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
