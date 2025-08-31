import React from 'react'
import { FooterProps } from '../../../types'

const Footer: React.FC<FooterProps> = ({ deviceType }) => {
  const isDesktop = deviceType === 'desktop'

  return (
    <footer className='bg-white border-t border-gray-200 px-4 py-3'>
      <div className='text-center'>
        <p className='text-xs text-gray-500'>
          Switch between desktop and mobile
        </p>
        <div className='flex justify-center space-x-4 mt-2'>
          {isDesktop ? (
            <>
              <span className='text-xs text-gray-500 font-medium'>
                Desktop View
              </span>
              <span className='text-xs text-gray-400'>|</span>
              <a
                href='/mobile'
                className='text-xs text-kyc-600 hover:text-kyc-700 font-medium'
              >
                Mobile View
              </a>
            </>
          ) : (
            <>
              <a
                href='/'
                className='text-xs text-kyc-600 hover:text-kyc-700 font-medium'
              >
                Desktop View
              </a>
              <span className='text-xs text-gray-400'>|</span>
              <span className='text-xs text-gray-500 font-medium'>
                Mobile View
              </span>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
