import Navbar from '@/components/navigation/navbar'
import StarterGuide from '@/components/dashboard/starter-guide'
import SettingsSidebar from '@/components/settings/settings-sidebar'

interface SettingsLayoutProps {
  children: React.ReactNode
  user: {
    name: string
    email: string
    initials: string
  }
}

export default function SettingsLayout({ children, user }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />

      <div className="h-full flex flex-col overflow-y-auto max-w-full">
        {/* Starter Guide */}
        <div className="sm:px-6 lg:px-8 mt-4">
          <StarterGuide />
        </div>

        {/* Settings Content */}
        <main className="mx-auto max-w-7xl pb-10 lg:px-8 lg:py-12 w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 w-full">
            <SettingsSidebar />
            
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}