import { Outlet } from 'react-router-dom'
import SettingsLayout from '@/components/settings/settings-layout'

// This would come from auth/session
const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
})

export default function SettingsPageLayout() {
  const user = getUserData()
  
  return (
    <SettingsLayout user={user}>
      <Outlet />
    </SettingsLayout>
  )
}
