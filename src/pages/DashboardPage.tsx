import Navbar from '@/components/navigation/navbar'
import StarterGuide from '@/components/dashboard/starter-guide'
import DashboardTabs from '@/components/dashboard/tabs'
import MetricsCards from '@/components/dashboard/metrics-cards'
import RecentActivity from '@/components/dashboard/recent-activity'

const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
  organization: 'Agiletech',
  role: 'Owner'
})

const getMetrics = () => [
  { label: 'New candidates today', value: '—' },
  { label: 'Candidates in pipeline', value: '—', tooltip: 'Active candidates' },
  { label: 'Total candidates', value: '—', tooltip: 'All time candidates' },
  { label: 'Avg. Time to Hire', value: '—', tooltip: 'Average hiring time' }
]

const getRecentActivities = () => []

export default function DashboardPage() {
  const user = getUserData()
  const metrics = getMetrics()
  const activities = getRecentActivities()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StarterGuide />
        
        <DashboardTabs />
        
        <MetricsCards metrics={metrics} />
        
        <RecentActivity activities={activities} />
      </main>
    </div>
  )
}
