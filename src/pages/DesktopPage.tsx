import React from 'react'
import Navbar from '../components/common/Navbar'
import ChatInterface from '../components/features/chat/ChatInterface'
import { useMessages } from '../hooks/useMessages'
import Footer from '../components/common/Footer'

const DesktopPage: React.FC = () => {
  const { isConnected } = useMessages()

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
          <Navbar
            deviceType='desktop'
            title='Desktop Client'
            subtitle='Real-time Communication'
            showConnectionStatus={true}
            isConnected={isConnected}
          />
          <div className='h-[500px]'>
            <ChatInterface deviceType='desktop' />
          </div>
        </div>
      </main>
      <Footer deviceType='desktop' />
    </div>
  )
}

export default DesktopPage
