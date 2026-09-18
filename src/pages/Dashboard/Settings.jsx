import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DashboardLayout from '../../layouts/DashboardLayout'
import useSettings from '../../hooks/useSettings'
import ProfileSettings from '../../components/Settings/ProfileSettings'
import AppearanceSettings from '../../components/Settings/AppearanceSettings'
import NotificationSettings from '../../components/Settings/NotificationSettings'
import AcademicSettings from '../../components/Settings/AcademicSettings'
import AccountSettings from '../../components/Settings/AccountSettings'

const Settings = () => {
  const navigate = useNavigate()

  const { settings, updateProfile, updateNotifications, updateAcademic } = useSettings()

  const handleProfileSave = profile => {
    updateProfile(profile)
    toast.success('Profile successfully updated!')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <DashboardLayout activeMenu='Settings'>
      <div className='space-y-6 my-5 mx-auto w-full min-w-0 px-3 sm:px-6 py-5 sm:py-8'>
        {/* Header */}
        <div>
          <h1 className='text-2xl font-semibold text-primary dark:text-dark'>Settings</h1>

          <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
            Manage your profile, preferences and account settings.
          </p>
        </div>

        {/* Settings Sections */}
        <div className='space-y-6'>
          <ProfileSettings profile={settings.profile} onSave={handleProfileSave} />

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
