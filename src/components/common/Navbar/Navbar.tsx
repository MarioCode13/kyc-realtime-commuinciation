import React from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import { NavbarProps } from '../../../types'

const Navbar: React.FC<NavbarProps> = ({
  deviceType,
  title,
  subtitle,
  showConnectionStatus = true,
  isConnected = false,
}) => {
  const getDeviceIcon = () => {
    return deviceType === 'desktop' ? (
      <Monitor className='w-6 h-6 text-kyc-600' />
    ) : (
      <Smartphone className='w-6 h-6 text-kyc-600' />
    )
  }

  return (
    <header className='bg-white border-b border-gray-200 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-kyc-600 rounded-lg flex items-center justify-center p-5'>
            <span className='text-white text-sm font-bold'>KYC</span>
          </div>
          <div>
            <h1 className='text-xl font-semibold text-gray-900'>{title}</h1>
            {subtitle && <p className='text-xs text-gray-500'>{subtitle}</p>}
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          {showConnectionStatus && (
            <div className='flex items-center space-x-2'>
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <span className='text-xs text-gray-500'>
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          )}

          <div className='flex items-center space-x-2'>
            {getDeviceIcon()}
            <span className='text-xs text-gray-500 capitalize'>
              {deviceType}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
