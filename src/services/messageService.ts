import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { Message } from '../types'
import { db } from '../firebase/config'

class MessageService {
  private messages: Message[] = []
  private unsubscribe: (() => void) | null = null
  private listeners: ((messages: Message[]) => void)[] = []

  async sendMessage(text: string, deviceType: 'desktop' | 'mobile'): Promise<void> {
    try {
      const message: Omit<Message, 'id'> = {
        text,
        deviceType,
        userId: this.getUserId(),
        timestamp: new Date(),
        status: 'sent'
      }

      await addDoc(collection(db, 'messages'), message)
    } catch (error) {
      throw new Error(`Failed to send message: ${error}`)
    }
  }

  subscribeToMessages(callback: (messages: Message[]) => void): () => void {
    this.listeners.push(callback)

    if (!this.unsubscribe) {
      const q = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(100)
      )

      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newMessages: Message[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          newMessages.push({
            id: doc.id,
            text: data.text,
            deviceType: data.deviceType,
            userId: data.userId,
            timestamp: data.timestamp.toDate(),
            status: data.status
          })
        })

        this.messages = newMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

        this.listeners.forEach(listener => listener(this.messages))
      })
    }

    return () => {
      const index = this.listeners.indexOf(callback)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  unsubscribeFromMessages(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
    this.listeners = []
  }

  private getUserId(): string {
    let userId = localStorage.getItem('kyc_user_id')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('kyc_user_id', userId)
    }
    return userId
  }

  getMessages(): Message[] {
    return this.messages
  }
}

export const messageService = new MessageService() 