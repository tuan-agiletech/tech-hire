import { Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  Bell, 
  Settings, 
  Search, 
  ChevronDown,
  Sparkles 
} from 'lucide-react'

interface User {
  name: string
  email: string
  initials: string
}

export default function Navbar({ user }: { user: User }) {
  const [isJobListingOpen, setIsJobListingOpen] = useState(false)

  return (
    <nav className="bg-gray-50 sticky top-0 z-50 border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="shrink-0">
              <span className="text-xl font-bold text-teal-600">Growhire</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden lg:ml-6 lg:block">
            <div className="flex space-x-3">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/candidates">Candidates</NavLink>
              <NavLink href="/jobs">Jobs</NavLink>
              <NavLink href="/interviews" icon={<AIIcon />}>
                AI Interviews
              </NavLink>
              <NavLink href="/workflows">Automation</NavLink>
              
              {/* Job Listing Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsJobListingOpen(!isJobListingOpen)}
                  className="text-gray-700 hover:text-gray-600 hover:bg-white/75 rounded-md px-2 py-2 text-sm font-medium flex items-center gap-1"
                >
                  Job Listing
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isJobListingOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                    {/* Dropdown items */}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative text-gray-400 focus-within:text-gray-500">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  id="search"
                  className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400 bg-white">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:ml-4 lg:block">
            <div className="flex items-center">
              {/* Notifications */}
              <button className="relative shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>

              {/* Settings */}
              <Link 
                to="/settings/organization"
                className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="absolute -inset-1.5"></span>
                <Settings className="h-6 w-6" />
              </Link>

              {/* User Avatar */}
              <div className="relative ml-3 shrink-0">
                <button className="relative flex rounded-full bg-gray-50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:ring-offset-gray-50">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white uppercase">
                      {user.initials}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ 
  href, 
  children, 
  icon 
}: { 
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  // Check if current path matches href (you can use usePathname() hook)
  const isActive = false // Replace with actual path checking logic
  
  return (
    <Link
      to={href}
      className={`rounded-md px-2 py-2 text-sm font-medium inline-flex items-center ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-700 hover:text-gray-600 hover:bg-white/75'
      }`}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </Link>
  )
}

// AI Icon with gradient
function AIIcon() {
  return (
    <span 
      className="inline-block w-4 h-4" 
      style={{
        background: 'radial-gradient(circle at -20% -20%, #2ED1A6 0%, #207AF9 50%, #8000FF 100%)',
        WebkitMask: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z' /%3e%3c/svg%3e")`,
        mask: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z' /%3e%3c/svg%3e")`
      }}
    />
  )
}