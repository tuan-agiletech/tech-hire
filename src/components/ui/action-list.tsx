import { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface ActionItem {
  id: string
  title: string
  description: string
  icon: ReactNode
  iconBgColor: string
  badge?: {
    text: string
    color: string
  }
  onClick: () => void
}

interface ActionListProps {
  title: string
  description: string
  items: ActionItem[]
  footer?: ReactNode
}

export default function ActionList({ title, description, items, footer }: ActionListProps) {
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-base font-semibold leading-6 text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      
      <ul className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <div className="group relative flex items-start space-x-3 py-4">
              <div className="shrink-0">
                <span className={`${item.iconBgColor} inline-flex h-10 w-10 items-center justify-center rounded-lg`}>
                  {item.icon}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  <button onClick={item.onClick} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    {item.title}
                    {item.badge && (
                      <span className={`ml-2 inline-flex items-center rounded-full ${item.badge.color} px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset`}>
                        {item.badge.text}
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="shrink-0 self-center">
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  )
}