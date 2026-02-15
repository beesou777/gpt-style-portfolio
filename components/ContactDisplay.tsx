'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Facebook, BookOpen, Mail, MessageCircle, ExternalLink } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

export default function ContactDisplay() {
  const { socialLinks } = portfolioData

  const contactItems = [
    {
      name: 'Email',
      value: socialLinks.email,
      icon: Mail,
      color: 'from-red-500 to-pink-500',
      link: `mailto:${socialLinks.email}`,
      label: 'Email me'
    },
    {
      name: 'WhatsApp',
      value: `+${socialLinks.whatsapp}`,
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      link: `https://wa.me/${socialLinks.whatsapp}`,
      label: 'Message on WhatsApp'
    },
    {
      name: 'GitHub',
      value: 'beesou777',
      icon: Github,
      color: 'from-gray-700 to-gray-900',
      link: socialLinks.github,
      label: 'View GitHub profile'
    },
    {
      name: 'LinkedIn',
      value: 'bishwa777',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-700',
      link: socialLinks.linkedin,
      label: 'Connect on LinkedIn'
    },
    {
      name: 'Medium',
      value: '@shahbishwa21',
      icon: BookOpen,
      color: 'from-green-600 to-green-700',
      link: socialLinks.medium,
      label: 'Read articles on Medium'
    },
    {
      name: 'Instagram',
      value: 'shah.bishwa77',
      icon: Instagram,
      color: 'from-pink-500 to-purple-500',
      link: socialLinks.instagram,
      label: 'Follow on Instagram'
    },
    {
      name: 'Facebook',
      value: 'Bishwa Jung Shah',
      icon: Facebook,
      color: 'from-blue-500 to-blue-600',
      link: socialLinks.facebook,
      label: 'Connect on Facebook'
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-gray-700 mb-4 leading-relaxed">
        Here's how you can reach out to Bishwa:
      </p>
      
      <div className="space-y-3">
        {contactItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.link}
              target={item.name === 'Email' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0 hover:opacity-70 transition-opacity"
            >
              <Icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.value}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            </a>
          )
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Feel free to reach out for collaboration, questions, or just to say hello.
        </p>
      </div>
    </div>
  )
}
