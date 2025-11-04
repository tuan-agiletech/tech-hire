import { Plus } from 'lucide-react'

interface TemplatesEmptyStateProps {
  onCreateTemplate: () => void
}

export default function TemplatesEmptyState({ onCreateTemplate }: TemplatesEmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No templates</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating your first interview template.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onCreateTemplate}
          className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
          Create Template
        </button>
      </div>
    </div>
  )
}