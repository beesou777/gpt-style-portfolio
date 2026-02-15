'use client'

import { motion } from 'framer-motion'
import portfolioData from '@/data/portfolio.json'

export default function SkillsDisplay() {
  const { skills } = portfolioData

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      items: [
        ...skills.frontend.frameworks,
        ...skills.frontend.styling,
        ...skills.frontend.languages,
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      color: 'from-purple-500 to-pink-500',
      items: [
        ...skills.backend.frameworks,
        ...skills.backend.databases,
        ...skills.backend.languages,
      ],
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      color: 'from-green-500 to-teal-500',
      items: [
        ...skills.tools.versionControl,
        ...skills.tools.design,
        ...skills.tools.devOps,
        ...skills.tools.other,
      ],
    },
    {
      title: 'Expertise',
      icon: '⭐',
      color: 'from-orange-500 to-red-500',
      items: skills.expertise,
    },
  ]

  return (
    <div className="space-y-6">
      <p className="text-gray-700 mb-4 leading-relaxed">
        Here's a comprehensive overview of Bishwa's technical skills and expertise:
      </p>
      
      <div className="space-y-4">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{category.icon}</span>
              <h3 className="font-medium text-gray-900">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Specialization:</strong> Bishwa specializes in Vue.js and Node.js for full-stack development, with a strong focus on performance optimization, clean code practices, and creating interactive user experiences.
        </p>
      </div>
    </div>
  )
}
