import { useState, useEffect } from 'react'
import { Message, DeviceType } from '../types'
import { messageService } from '../services/messageService'

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    messageService.subscribeToMessages((newMessages: Message[]) => {
      setMessages(newMessages)
      setIsConnected(true)
    })

    return () => {
      messageService.unsubscribeFromMessages()
    }
  }, [])

  const sendMessage = async (text: string, deviceType: DeviceType): Promise<void> => {
    await messageService.sendMessage(text, deviceType)
  }

  return {
    messages,
    isConnected,
    sendMessage
  }
} 