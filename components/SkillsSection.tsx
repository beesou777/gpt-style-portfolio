'use client'

import { motion } from 'framer-motion'
import portfolioData from '@/data/portfolio.json'

export default function SkillsSection() {
  const { skills } = portfolioData as { skills: any }

  const skillCategories = [
    { title: 'Frameworks', skills: skills.frameworks, color: 'blue' },
    { title: 'Languages', skills: skills.languages, color: 'green' },
    { title: 'Databases', skills: skills.databases, color: 'purple' },
    { title: 'Platforms', skills: skills.platforms, color: 'orange' },
    { title: 'Tools', skills: skills.otherTools, color: 'pink' },
  ]

  const colorClasses = {
    blue: 'border-blue-500/30 bg-blue-500/10',
    green: 'border-green-500/30 bg-green-500/10',
    purple: 'border-purple-500/30 bg-purple-500/10',
    orange: 'border-orange-500/30 bg-orange-500/10',
    pink: 'border-pink-500/30 bg-pink-500/10',
  }

  return (
    <section className="min-h-screen bg-chat-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-400">
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl p-6 border ${colorClasses[category.color as keyof typeof colorClasses]}`}
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-chat-sidebar text-sm text-gray-300 rounded-lg border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
