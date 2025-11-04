import { Link } from "react-router-dom"

interface Tab {
  label: string
  href: string
  active?: boolean
}

interface TabsProps {
  tabs: Tab[]
  className?: string
}

export default function Tabs({ tabs, className = '' }: TabsProps) {
  return (
    <nav 
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 mx-4 sm:mx-6 lg:mx-8 ${className}`}
      aria-label="Tabs"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          to={tab.href}
          data-state={tab.active ? 'active' : 'inactive'}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
            tab.active
              ? 'bg-white text-gray-900 shadow-sm'
              : 'hover:bg-white/50'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}