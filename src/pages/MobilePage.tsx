import React from 'react'
import Navbar from '../components/common/Navbar'
import ChatInterface from '../components/features/chat/ChatInterface'
import { useMessages } from '../hooks/useMessages'
import Footer from '../components/common/Footer'

const MobilePage: React.FC = () => {
  const { isConnected } = useMessages()

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar
        deviceType='mobile'
        title='Mobile Client'
        subtitle='Real-time Communication'
        showConnectionStatus={true}
        isConnected={isConnected}
      />
      <main className='h-[calc(100vh-80px)]'>
        <ChatInterface deviceType='mobile' />
      </main>
      <Footer deviceType='mobile' />
    </div>
  )
}

export default MobilePage
