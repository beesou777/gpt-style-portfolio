'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, MessageCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  "What technologies does he use?",
  "Show me his best project",
  "Does he have backend experience?",
  "Tell me about his experience",
  "How can I contact him?"
]

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
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

    setShowSuggestions(false)
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

  if (!isOpen) {
    return (
      <section className="bg-chat-sidebar py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chat with AI Assistant
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Ask me anything about Bishwa's portfolio, skills, and projects
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              Start Chatting
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-chat-bg py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Portfolio Assistant
          </h2>
          <p className="text-xl text-gray-400">
            Ask me anything about Bishwa's work and experience
          </p>
        </motion.div>

        <div className="bg-chat-sidebar rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto px-4 py-6">
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation to learn about Bishwa's portfolio</p>
                </div>
              )}

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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-chat-input text-white'
                          : 'bg-chat-bg text-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
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
                  <div className="bg-chat-bg rounded-2xl px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestions */}
          {showSuggestions && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 pb-4 border-t border-gray-700"
            >
              <div className="flex flex-wrap gap-2 pt-4">
                {SUGGESTIONS.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-2 bg-chat-input hover:bg-chat-hover rounded-full text-sm text-gray-300 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input */}
          <div className="border-t border-gray-700 bg-chat-sidebar px-4 py-4">
            <div className="flex items-end gap-3 bg-chat-input rounded-2xl px-4 py-3 border border-gray-600 focus-within:border-gray-500 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Bishwa's portfolio..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none max-h-32 overflow-y-auto"
                rows={1}
                style={{
                  minHeight: '24px',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-lg bg-transparent hover:bg-chat-hover text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
