import { useState } from 'react'
import { Plus, ChevronDown } from 'lucide-react'
import Navbar from '@/components/navigation/navbar'
import StarterGuide from '@/components/dashboard/starter-guide'
import FiltersBar from '@/components/candidates/filters-bar'
import CandidatesEmptyState from '@/components/candidates/candidates-empty-state'
import CandidatesTable from '@/components/candidates/candidates-table'

// Mock data
const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
})

const getCandidates = () => []

export default function CandidatesPage() {
  const user = getUserData()
  const [candidates] = useState(getCandidates())
  const [activeFilters, setActiveFilters] = useState([
    { id: '1', label: 'Stage', value: 'Applied' },
  ])
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)

  const handleAddCandidate = () => {
    console.log('Add candidate clicked')
    // Open add candidate modal or navigate to form
  }

  const handleImportCandidates = () => {
    console.log('Import candidates clicked')
    // Open import modal
  }

  const handleCandidateClick = (candidateId: string) => {
    console.log('Candidate clicked:', candidateId)
    // Navigate to candidate details
  }

  const handleClearAllFilters = () => {
    setActiveFilters([])
  }

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter((f) => f.id !== filterId))
  }

  const handleOpenFilters = () => {
    console.log('Open filters modal')
  }

  const handleOpenColumns = () => {
    console.log('Open columns customization')
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
        <div className="mx-auto w-full space-y-4 pb-12 pt-8">
          {/* Page Header */}
          <div className="mb-12 md:flex md:items-center md:justify-between sm:px-6 lg:px-8">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Candidates
              </h2>
            </div>

            <div className="mt-4 flex md:ml-4 md:mt-0 space-x-4">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleAddCandidate}
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Plus className="-ml-0.5 h-5 w-5 text-gray-400" />
                  Add Candidate
                </button>

                <div className="relative -ml-px inline-block text-left">
                  <button
                    onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-r-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {isAddMenuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleImportCandidates()
                            setIsAddMenuOpen(false)
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Import from CSV
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <FiltersBar
            activeFilters={activeFilters}
            onClearAll={handleClearAllFilters}
            onRemoveFilter={handleRemoveFilter}
            onOpenFilters={handleOpenFilters}
            onOpenColumns={handleOpenColumns}
          />

          {/* Content */}
          <div className="sm:px-6 lg:px-8">
            {candidates.length === 0 ? (
              <CandidatesEmptyState
                onAddCandidate={handleAddCandidate}
                onImportCandidates={handleImportCandidates}
              />
            ) : (
              <CandidatesTable
                candidates={candidates}
                onCandidateClick={handleCandidateClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
