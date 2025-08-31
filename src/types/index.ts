export interface Message {
  id: string
  text: string
  deviceType: DeviceType
  userId: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
  roomId?: string // For future private session 
}

export interface User {
  id: string
  email?: string
  name?: string
  role: 'customer' | 'admin' | 'super_admin'
  deviceType?: DeviceType
  isOnline: boolean
  lastSeen?: Date
  roomId?: string // For future private session
}

export interface ChatSession {
  id: string
  roomId: string
  customerId: string
  adminId?: string
  status: 'active' | 'completed' | 'abandoned'
  createdAt: Date
  updatedAt: Date
  messages: Message[]
}

export interface ChatInterfaceProps {
  deviceType: DeviceType
  roomId?: string // For future private session
}

export interface MessageBubbleProps {
  message: Message
}

export interface NavbarProps {
  deviceType: DeviceType
  title: string
  subtitle?: string
  showConnectionStatus?: boolean
  isConnected?: boolean
}

export interface FooterProps {
  deviceType: DeviceType
}

export type DeviceType = 'desktop' | 'mobile'

export type UserRole = 'customer' | 'admin' | 'super_admin'

export type SessionStatus = 'active' | 'completed' | 'abandoned' 