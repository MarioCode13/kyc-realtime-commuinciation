import React from 'react'
import { Smartphone, Monitor } from 'lucide-react'
import { MessageBubbleProps } from '../../../../types'
import { motion } from 'framer-motion'

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isDesktop = message.deviceType === 'desktop'

  const formatTime = (timestamp: Date): string => {
    if (!timestamp) return ''
    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDeviceIcon = (): JSX.Element => {
    return isDesktop ? (
      <Monitor className='w-4 h-4 text-white' />
    ) : (
      <Smartphone className='w-4 h-4 text-white' />
    )
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: [1.3, 0.95, 1],
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='flex justify-end mb-3'
    >
      <div className='message-bubble message-sent'>
        <div className='flex items-center gap-2 mb-2'>
          {getDeviceIcon()}
          <span className='caption text-white/80'>
            {isDesktop ? 'Desktop' : 'Mobile'}
          </span>
          <span className='caption text-white/80'>
            {formatTime(message.timestamp)}
          </span>
        </div>
        <p className='body-medium text-white leading-relaxed'>{message.text}</p>
      </div>
    </motion.div>
  )
}

export default MessageBubble
