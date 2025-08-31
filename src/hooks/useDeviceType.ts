import { useState, useEffect } from 'react'
import { DeviceType } from '../types'

// To potentially use to automatically determine device type
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    const updateDeviceType = () => {
      const newDeviceType = window.innerWidth <= 768 ? 'mobile' : 'desktop'
      setDeviceType(newDeviceType)
    }

    updateDeviceType()

    window.addEventListener('resize', updateDeviceType)

    return () => {
      window.removeEventListener('resize', updateDeviceType)
    }
  }, [])

  return { deviceType }
} 