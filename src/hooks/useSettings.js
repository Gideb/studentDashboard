import { useEffect, useState } from 'react'
import { defaultSettings } from '../data/SettingsData'

const SETTINGS_STORAGE_KEY = 'settings'

const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)

      if (savedSettings) {
        return {
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        }
      }

      return defaultSettings
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error)

      return defaultSettings
    }
  })

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateProfile = updates => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates,
      },
    }))
  }

  const updateNotifications = updates => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...updates,
      },
    }))
  }

  const updateAcademic = updates => {
    setSettings(prev => ({
      ...prev,
      academic: {
        ...prev.academic,
        ...updates,
      },
    }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return {
    settings,
    updateProfile,
    updateNotifications,
    updateAcademic,
    resetSettings,
  }
}

export default useSettings
