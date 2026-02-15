'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, User, Briefcase, Layers, Sparkles, Mail, BookOpen, ChevronDown, ChevronUp, Github, Linkedin, ExternalLink } from 'lucide-react'
import MessageContent from './MessageContent'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_ACTIONS = [
  { id: 'me', label: 'Me', icon: User, color: 'text-green-500', prompt: 'Tell me about yourself' },
  { id: 'projects', label: 'Projects', icon: Briefcase, color: 'text-blue-500', prompt: 'Show me all your projects' },
  { id: 'skills', label: 'Skills', icon: Layers, color: 'text-purple-500', prompt: 'What are your skills and technologies?' },
  { id: 'blogs', label: 'Blogs', icon: BookOpen, color: 'text-indigo-500', prompt: 'Show me your blog posts' },
  { id: 'fun', label: 'Fun', icon: Sparkles, color: 'text-pink-500', prompt: 'Tell me something fun or interesting about you' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'text-orange-500', prompt: 'How can I contact you?' },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSend = async (message?: string) => {
    const userMessage = message || input.trim()
    if (!userMessage || isLoading) return

    setShowQuickActions(false)
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          assistantMessage += chunk

          setMessages([...newMessages, { role: 'assistant', content: assistantMessage }])
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 text-sm mb-1">Bishwa Jung Shah</h2>
          <p className="text-xs text-gray-500">Fullstack Developer</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Quick Links</h3>
            <div className="space-y-1">
              <a href="https://github.com/beesou777" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="https://linkedin.com/in/beesou-shah" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a href="https://medium.com/@shahbishwa21" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors">
                <BookOpen className="w-4 h-4" />
                Medium
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {['Vue.js', 'Nuxt', 'React', 'Next.js', 'Nest.js', 'Hono.js', 'Node.js', 'TypeScript'].map((skill) => (
                <span key={skill} className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Projects</h3>
            <div className="space-y-1 text-xs">
              <a href="https://kamkhoj.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                <span>•</span>
                <span className="flex-1">KamKhoj</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://eventeir.ai/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                <span>•</span>
                <span className="flex-1">EventEir</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://cargosender.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                <span>•</span>
                <span className="flex-1">CargoSender</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="http://ourbaha.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                <span>•</span>
                <span className="flex-1">Baha Connect</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Bishwa Jung Shah</h1>
            <p className="text-sm text-gray-500">Fullstack Developer</p>
          </div>
        </header>

        {/* Main Chat Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="mb-6">
                  <h2 className="text-3xl font-medium text-gray-900 mb-2">
                    How can I help you today?
                  </h2>
                  <p className="text-sm text-gray-500">
                    Ask me about my projects, skills, experience, or anything else
                  </p>
                </div>
              </div>
            ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white rounded-2xl px-4 py-3'
                          : 'text-gray-900'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <MessageContent content={message.content} />
                      ) : (
                        <p className="whitespace-pre-wrap break-words leading-relaxed">
                          {message.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-200 bg-white px-6 py-5"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-700">Quick actions</p>
                <button
                  onClick={() => setShowQuickActions(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                >
                  Hide
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon
                  return (
                    <motion.button
                      key={action.id}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-2.5 px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all group"
                    >
                      <Icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm font-semibold text-gray-700">{action.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {!showQuickActions && messages.length > 0 && (
          <div className="border-t border-gray-200 bg-white px-6 py-2">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setShowQuickActions(true)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                Show quick actions
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-6 py-5">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3 bg-white rounded-2xl px-5 py-4 border-2 border-gray-200 focus-within:border-blue-500 focus-within:shadow-lg transition-all shadow-sm">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message..."
                className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 resize-none outline-none max-h-32 overflow-y-auto text-base"
                rows={1}
                style={{
                  minHeight: '28px',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
