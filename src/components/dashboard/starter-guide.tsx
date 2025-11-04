

import { useState } from 'react'
import { X, CheckCircle2, Circle } from 'lucide-react'

interface Step {
  id: string
  title: string
  completed: boolean
}

export default function StarterGuide() {
  const [isOpen, setIsOpen] = useState(true)
  const [steps] = useState<Step[]>([
    { id: '1', title: 'Complete your profile', completed: true },
    { id: '2', title: 'Add team members', completed: false },
    { id: '3', title: 'Create your first job', completed: false },
    { id: '4', title: 'Set up email templates', completed: false },
    { id: '5', title: 'Configure integrations', completed: false },
  ])

  const completedSteps = steps.filter(s => s.completed).length
  const totalSteps = steps.length

  if (!isOpen) return null

  return (
    <div className="bg-white border-2 border-teal-500 rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Starter guide</h2>
          <p className="text-sm text-gray-600 mt-1">
            Follow this step-by-step guide to set up your recruitment process
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">
            {completedSteps} out of {totalSteps} steps completed
          </span>
          <span className="text-gray-600">
            {Math.round((completedSteps / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            {step.completed ? (
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 shrink-0" />
            )}
            <span className={`text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm font-medium">
        Finish setup
      </button>
    </div>
  )
}