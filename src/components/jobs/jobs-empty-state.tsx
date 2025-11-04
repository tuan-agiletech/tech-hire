'use client'

import { Plus, Download, Database } from 'lucide-react'
import ActionList from '@/components/ui/action-list'

interface JobsEmptyStateProps {
  onCreateJob: () => void
  onImportJobs: () => void
  onLoadSampleData: () => void
}

export default function JobsEmptyState({
  onCreateJob,
  onImportJobs,
  onLoadSampleData,
}: JobsEmptyStateProps) {
  const actionItems = [
    {
      id: 'create',
      title: 'Create new job',
      description: 'Create your first job posting in just few minutes.',
      icon: <Plus className="h-6 w-6 text-white" />,
      iconBgColor: 'bg-indigo-500',
      onClick: onCreateJob,
    },
    {
      id: 'import',
      title: 'Import jobs',
      description: 'Import your existing data from your website or ATS.',
      icon: <Download className="h-6 w-6 text-white" />,
      iconBgColor: 'bg-purple-500',
      badge: {
        text: 'beta',
        color: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
      },
      onClick: onImportJobs,
    },
    {
      id: 'sample',
      title: 'Load sample data',
      description: 'Explore Growhire without affecting your real data',
      icon: <Download className="h-6 w-6 text-white" />,
      iconBgColor: 'bg-yellow-500',
      onClick: onLoadSampleData,
    },
  ]

  return (
    <ActionList
      title="Create your first job"
      description="Get started by creating a new job posting or importing your existing data."
      items={actionItems}
      footer={
        <div className="flex">
          <a
            href="https://cal.com/chris-growhire/growhire-demo"
            className="text-sm font-medium text-teal-600 hover:text-teal-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Or schedule a call with a recruiting specialist
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      }
    />
  )
}