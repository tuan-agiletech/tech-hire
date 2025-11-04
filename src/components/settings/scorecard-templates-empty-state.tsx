import { FolderPlus } from 'lucide-react'

interface ScorecardTemplatesEmptyStateProps {
  onCreateClick: () => void
}

export function ScorecardTemplatesEmptyState({ onCreateClick }: ScorecardTemplatesEmptyStateProps) {
  return (
    <div className="text-center">
      <FolderPlus className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Scorecard Templates</h3>
      <p className="mt-1 text-sm text-gray-500">
        Create a scorecard template to collect feedback from your team.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onCreateClick}
          className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          <FolderPlus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Create Scorecard Template
        </button>
      </div>
    </div>
  )
}
