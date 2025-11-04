import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {items.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 mr-4" />
              )}
              <Link
                to={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}