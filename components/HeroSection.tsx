'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Facebook, BookOpen, ExternalLink } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

export default function HeroSection() {
  const { owner, socialLinks } = portfolioData

  const socialIcons = [
    { name: 'GitHub', icon: Github, url: socialLinks.github },
    { name: 'LinkedIn', icon: Linkedin, url: socialLinks.linkedin },
    { name: 'Instagram', icon: Instagram, url: socialLinks.instagram },
    { name: 'Facebook', icon: Facebook, url: socialLinks.facebook },
    { name: 'Medium', icon: BookOpen, url: socialLinks.medium },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-chat-bg via-chat-sidebar to-chat-bg px-4 py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {owner.name}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-2">
            {owner.role}
          </p>
          <p className="text-lg text-gray-400 mb-4">
            {owner.status} • {owner.location}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {owner.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {owner.professional_background.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-chat-input rounded-full text-sm text-gray-300 border border-gray-600"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 mb-8"
        >
          {socialIcons.map((social) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-chat-input hover:bg-chat-hover rounded-full text-gray-300 hover:text-white transition-colors border border-gray-600"
                aria-label={social.name}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            )
          })}
          <motion.a
            href={socialLinks.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-chat-input hover:bg-chat-hover rounded-full text-gray-300 hover:text-white transition-colors border border-gray-600"
            aria-label="Portfolio"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400 text-sm"
        >
          <p>Scroll down to explore projects and chat with AI assistant</p>
        </motion.div>
      </div>
    </motion.section>
  )
}
