import React, { useState, useEffect, useRef } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import MessageBubble from '../MessageBubble'
import { useMessages } from '../../../../hooks/useMessages'
import { ChatInterfaceProps } from '../../../../types'

const ChatInterface: React.FC<ChatInterfaceProps> = ({ deviceType }) => {
  const [newMessage, setNewMessage] = useState<string>('')
  const { messages, isConnected, sendMessage } = useMessages()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      await sendMessage(newMessage.trim(), deviceType)
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto p-6 space-y-3 scrollbar-custom'>
        {messages.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-gray-500'>
            <MessageCircle className='w-16 h-16 mb-4 opacity-50' />
            <p className='body-medium text-center'>
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className='bg-white border-t border-gray-200 p-6'>
        <form
          onSubmit={handleSendMessage}
          className='flex gap-3'
        >
          <input
            type='text'
            value={newMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewMessage(e.target.value)
            }
            placeholder='Type your message...'
            className='input-field'
            disabled={!isConnected}
          />
          <button
            type='submit'
            disabled={!newMessage.trim() || !isConnected}
            className='btn-primary'
          >
            <Send className='w-5 h-5' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
