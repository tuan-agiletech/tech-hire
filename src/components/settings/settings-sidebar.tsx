

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {
  User,
  Globe2,
  CreditCard,
  Code2,
  Mail,
  ClipboardList,
  Star,
  MapPin,
  Building2,
  Puzzle
} from 'lucide-react'

const navigation = [
  { name: 'Your Profile', href: '/settings/profile', icon: User },
  { name: 'Organization', href: '/settings/organization', icon: Globe2 },
  { name: 'Plan & Billing', href: '/settings/billing', icon: CreditCard },
  { name: 'Custom Fields', href: '/settings/custom-fields', icon: Code2 },
  { name: 'Email settings', href: '/settings/emails', icon: Mail },
  { name: 'Email templates', href: '/settings/email-templates', icon: Mail },
  { name: 'Questionnaires', href: '/settings/questionnaires', icon: ClipboardList },
  { name: 'Scorecard templates', href: '/settings/scorecard-templates', icon: Star },
  { name: 'Locations', href: '/settings/locations', icon: MapPin },
  { name: 'Departments', href: '/settings/departments', icon: Building2 },
  { name: 'Domains', href: '/settings/domains', icon: Globe2 },
  { name: 'Integrations', href: '/settings/integrations', icon: Puzzle },
]

export default function SettingsSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (href: string) => {
    if (href === '/settings/integrations') {
      return pathname.startsWith('/settings/integrations')
    }
    return pathname === href
  }

  return (
    <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
      <nav className="space-y-1">
        {navigation.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                active
                  ? 'bg-gray-50 text-teal-600'
                  : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                className={`-ml-1 mr-3 h-6 w-6 shrink-0 ${
                  active ? 'text-slate-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}