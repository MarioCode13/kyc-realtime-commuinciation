import { Message } from '../types'

class CrossTabMessageService {
  private messages: Message[] = []
  private listeners: ((messages: Message[]) => void)[] = []
  private broadcastChannel: BroadcastChannel | null = null
  private storageKey = 'kyc_messages'

  constructor() {
    this.initializeBroadcastChannel()
    this.loadMessagesFromStorage()
    this.addStorageEventListener()
    this.addDemoMessages()
  }

  private initializeBroadcastChannel(): void {
    if (typeof BroadcastChannel !== 'undefined') {
      this.broadcastChannel = new BroadcastChannel('kyc_messages')
      this.broadcastChannel.onmessage = (event) => {
        if (event.data.type === 'NEW_MESSAGE') {
          this.addMessage(event.data.message)
        }
      }
    }
  }

  private addStorageEventListener(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === this.storageKey && event.newValue) {
        try {
          const newMessages = JSON.parse(event.newValue)
          this.messages = newMessages
          this.notifyListeners()
        } catch (error) {
          // Handle parsing error 
        }
      }
    })
  }

  async sendMessage(text: string, deviceType: 'desktop' | 'mobile'): Promise<void> {
    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text,
      deviceType,
      userId: this.getUserId(),
      timestamp: new Date(),
      status: 'sent'
    }

    this.addMessage(message)

    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({
        type: 'NEW_MESSAGE',
        message
      })
    }

    this.saveMessagesToStorage()
  }

  subscribeToMessages(callback: (messages: Message[]) => void): () => void {
    this.listeners.push(callback)

    callback(this.messages)

    return () => {
      const index = this.listeners.indexOf(callback)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  unsubscribeFromMessages(): void {
    this.listeners = []
    if (this.broadcastChannel) {
      this.broadcastChannel.close()
      this.broadcastChannel = null
    }
  }

  private addMessage(message: Message): void {
    if (this.messages.find(m => m.id === message.id)) {
      return
    }

    this.messages.push(message)

    if (this.messages.length > 100) {
      this.messages = this.messages.slice(-100)
    }

    this.notifyListeners()
  }

  private getUserId(): string {
    let userId = localStorage.getItem('kyc_user_id')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('kyc_user_id', userId)
    }
    return userId
  }

  private addDemoMessages(): void {
    if (this.messages.length === 0) {
      const demoMessages: Message[] = [
        {
          id: 'demo_1',
          text: 'Welcome to the KYC chat! You can now switch between desktop and mobile seamlessly.',
          deviceType: 'desktop',
          userId: this.getUserId(),
          timestamp: new Date(Date.now() - 60000),
          status: 'delivered'
        },
        {
          id: 'demo_2',
          text: 'Try sending a message from one device and see it appear on the other!',
          deviceType: 'mobile',
          userId: this.getUserId(),
          timestamp: new Date(Date.now() - 30000),
          status: 'delivered'
        }
      ]

      this.messages = demoMessages
      this.saveMessagesToStorage()
      this.notifyListeners()
    }
  }

  private saveMessagesToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.messages))
    } catch (error) {
      // Handle storage error silently
    }
  }

  private loadMessagesFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        this.messages = JSON.parse(stored)
      }
    } catch (error) {
      // Handle parsing error 
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener, index) => {
      try {
        listener(this.messages)
      } catch (error) {
        this.listeners.splice(index, 1)
      }
    })
  }
}

export const crossTabMessageService = new CrossTabMessageService() 