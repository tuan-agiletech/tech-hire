import { useState } from 'react'
import Navbar from '@/components/navigation/navbar'
import StarterGuide from '@/components/dashboard/starter-guide'
import PageHeader from '@/components/ui/page-header'
import Breadcrumb from '@/components/ui/breadcrumb'
import JobsEmptyState from '@/components/jobs/jobs-empty-state'
import JobsList from '@/components/jobs/jobs-list'

// Mock data
const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
})

const getJobs = () => []

const getFilters = () => ({
  locations: [],
  departments: [],
  stages: [
    { id: 'applied', name: 'Applied' },
    { id: 'phone-screening', name: 'Phone Screening' },
    { id: 'interview', name: 'Interview' },
    { id: 'offer', name: 'Offer' },
    { id: 'disqualified', name: 'Disqualified' },
  ],
})

export default function JobsPage() {
  const user = getUserData()
  const [jobs, setJobs] = useState(getJobs())
  const filters = getFilters()

  const breadcrumbItems = [
    { label: 'Jobs', href: '/jobs' },
  ]

  const handleCreateJob = () => {
    console.log('Create job clicked')
    // Navigate to job creation page or open modal
  }

  const handleImportJobs = () => {
    console.log('Import jobs clicked')
    // Open import modal or navigate to import page
  }

  const handleLoadSampleData = () => {
    console.log('Load sample data clicked')
    // Load sample data
  }

  const handleJobClick = (jobId: string) => {
    console.log('Job clicked:', jobId)
    // Navigate to job details page
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />

      <div className="h-full flex flex-col overflow-y-auto max-w-full">
        {/* Starter Guide */}
        <div className="sm:px-6 lg:px-8 mt-4">
          <StarterGuide />
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Page Header */}
          <div className="mb-12 px-4 py-4 sm:px-6 lg:px-8">
            <div className="min-w-0 flex-1">
              {/* Breadcrumb - Hidden by default */}
              <Breadcrumb items={breadcrumbItems} className="hidden" />
              
              <h2 className="mt-4 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Jobs
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
              <span className="sm:ml-3">
                <button
                  onClick={handleCreateJob}
                  className="inline-flex items-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
                >
                  Create Job
                </button>
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-4 sm:px-6 lg:px-8 pb-12">
            {jobs.length === 0 ? (
              <JobsEmptyState
                onCreateJob={handleCreateJob}
                onImportJobs={handleImportJobs}
                onLoadSampleData={handleLoadSampleData}
              />
            ) : (
              <JobsList jobs={jobs} onJobClick={handleJobClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
