import { Crown } from 'lucide-react'

export default function UpgradeBadge() {
  return (
    <span className="ml-1 inline-flex items-center gap-x-1.5 rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
      <Crown className="w-3 h-3" />
      <span>Upgrade required</span>
    </span>
  )
}