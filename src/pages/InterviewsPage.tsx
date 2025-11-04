import { Plus } from 'lucide-react'
import Navbar from '@/components/navigation/navbar'
import StarterGuide from '@/components/dashboard/starter-guide'
import PageHeader from '@/components/ui/page-header'
import Tabs from '@/components/ui/tabs'
import EmptyState from '@/components/ui/empty-state'

const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
})

const getInterviews = () => []

export default function InterviewsPage() {
  const user = getUserData()
  const interviews = getInterviews()

  const tabs = [
    { label: 'Sessions', href: '/interviews', active: true },
    { label: 'Templates', href: '/interviews/templates', active: false },
  ]

  const handleCreateInterview = () => {
    console.log('Create interview clicked')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />

      <main className="h-full flex flex-col overflow-y-auto max-w-full">
        <div className="sm:px-6 lg:px-8 mt-4">
          <StarterGuide />
        </div>

        <div className="mx-auto w-full space-y-4 pb-12 pt-8">
          <PageHeader
            title="AI Interviews"
            action={{
              label: 'Create Interview',
              onClick: handleCreateInterview,
              icon: <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />,
            }}
          />

          <Tabs tabs={tabs} />

          {/* Filters Section (Hidden when empty) - reuse from previous code */}
          
          {interviews.length === 0 ? (
            <EmptyState
              title="No interviews"
              description="Get started by creating your first interview template."
            />
          ) : (
            <div className="sm:px-6 lg:px-8">
              {/* Interview list */}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
