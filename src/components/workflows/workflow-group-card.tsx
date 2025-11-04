import { ChevronRight, MoreVertical, Play, Pause, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Workflow {
  id: string
  name: string
  description?: string
  enabled: boolean
  triggerType: string
  actionsCount: number
  executionsCount?: number
}

interface WorkflowGroup {
  id: string
  name: string
  description?: string
  workflows: Workflow[]
}

interface WorkflowGroupCardProps {
  group: WorkflowGroup
  onEditGroup: (groupId: string) => void
  onDeleteGroup: (groupId: string) => void
  onWorkflowClick: (workflowId: string) => void
  onToggleWorkflow: (workflowId: string, enabled: boolean) => void
}

export default function WorkflowGroupCard({
  group,
  onEditGroup,
  onDeleteGroup,
  onWorkflowClick,
  onToggleWorkflow,
}: WorkflowGroupCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Group Header */}
      <div className="px-4 py-4 sm:px-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
            {group.description && (
              <p className="mt-1 text-sm text-gray-500">{group.description}</p>
            )}
          </div>
          <div className="relative ml-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-white"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEditGroup(group.id)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Group
                  </button>
                  <button
                    onClick={() => {
                      onDeleteGroup(group.id)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Group
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <ul className="divide-y divide-gray-200">
        {group.workflows.map((workflow) => (
          <li key={workflow.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onWorkflowClick(workflow.id)}
                  className="flex-1 min-w-0 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`shrink-0 w-2 h-2 rounded-full ${workflow.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {workflow.name}
                      </h4>
                      {workflow.description && (
                        <p className="mt-1 text-xs text-gray-500 truncate">
                          {workflow.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span>{workflow.triggerType}</span>
                        <span>•</span>
                        <span>{workflow.actionsCount} actions</span>
                        {workflow.executionsCount !== undefined && (
                          <>
                            <span>•</span>
                            <span>{workflow.executionsCount} executions</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleWorkflow(workflow.id, !workflow.enabled)
                    }}
                    className={`p-2 rounded-md ${
                      workflow.enabled
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={workflow.enabled ? 'Pause workflow' : 'Start workflow'}
                  >
                    {workflow.enabled ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}