// import { FolderPlus } from 'lucide-react'

interface WorkflowsEmptyStateProps {
  onAddWorkflowGroup: () => void
}

export default function WorkflowsEmptyState({ onAddWorkflowGroup }: WorkflowsEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No workflows</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new workflow group
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onAddWorkflowGroup}
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="-ml-0.5 mr-1.5 h-5 w-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Add Workflow Group
        </button>
        <p className="mt-2 text-sm">
          <span className="text-gray-500">or</span>{' '}
          <a
            href="https://help.growhire.com/creating-a-workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 underline hover:no-underline"
          >
            Visit our help center
          </a>
        </p>
      </div>
    </div>
  )
}