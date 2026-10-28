import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DashboardLayout from '../../layouts/DashboardLayout'
import useSettings from '../../hooks/useSettings'
import useAuth from '../../hooks/useAuth'
import ProfileSettings from '../../components/Settings/ProfileSettings'
import AppearanceSettings from '../../components/Settings/AppearanceSettings'
import NotificationSettings from '../../components/Settings/NotificationSettings'
import AcademicSettings from '../../components/Settings/AcademicSettings'
import AccountSettings from '../../components/Settings/AccountSettings'

const Settings = () => {
  const navigate = useNavigate()

  const { user, logout, updateProfile: updateAuthProfile } = useAuth()

  const {
    settings,
    updateProfile: updateLocalProfile,
    updateNotifications,
    updateAcademic,
  } = useSettings()

  const handleProfileSave = profile => {
    const result = updateAuthProfile({
      name: profile.name,
      email: profile.email,
    })

    if (!result.success) {
      toast.error(result.error)
      return
    }

    updateLocalProfile({
      ...settings.profile,
      ...profile,
      name: result.user.name,
      email: result.user.email,
    })

    toast.success('Profile successfully updated!')
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const profileSettings = {
    ...settings.profile,
    name: user?.name || '',
    email: user?.email || '',
  }

  return (
    <DashboardLayout activeMenu='Settings'>
      <div className='my-5 mx-auto w-full min-w-0 max-w-7xl space-y-6 px-3 py-5 sm:px-6 sm:py-8'>
        <div>
          <h1 className='text-2xl font-semibold text-primary dark:text-dark'>Settings</h1>

          <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
            Manage your profile, preferences and account settings.
          </p>
        </div>

        <div className='space-y-6'>
          <ProfileSettings profile={profileSettings} onSave={handleProfileSave} />

          <AppearanceSettings />

          <NotificationSettings
            notifications={settings.notifications}
            onUpdate={updateNotifications}
          />

          <AcademicSettings academic={settings.academic} onUpdate={updateAcademic} />

          <AccountSettings onLogout={handleLogout} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Settings
