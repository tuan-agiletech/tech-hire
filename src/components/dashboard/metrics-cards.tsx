import { HelpCircle } from 'lucide-react'

interface Metric {
  label: string
  value: string | number
  tooltip?: string
}

export default function MetricsCards({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}

function MetricCard({ label, value, tooltip }: Metric) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        {tooltip && (
          <button className="text-gray-400 hover:text-gray-600">
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {value || '—'}
      </div>
    </div>
  )
}