import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  breadcrumb?: ReactNode
  action?: {
    label: string
    onClick?: () => void
    icon?: ReactNode
    disabled?: boolean
  }
  actions?: ReactNode
}

export default function PageHeader({ title, breadcrumb, action, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        {breadcrumb}
        <h2 className="mt-4 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      
      {(action || actions) && (
        <div className="mt-4 flex md:ml-4 md:mt-0 space-x-4">
          {actions}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:bg-gray-400 disabled:opacity-50"
            >
              {action.icon}
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}