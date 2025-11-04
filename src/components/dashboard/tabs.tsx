'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${
            activeTab === 'analytics'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Analytics
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}