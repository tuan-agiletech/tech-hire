import SettingsLayout from '@/components/settings/settings-layout'

// This would come from auth/session
const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = getUserData()
  
  return <SettingsLayout user={user}>{children}</SettingsLayout>
}