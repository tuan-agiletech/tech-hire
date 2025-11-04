import { useState } from 'react'
import { MoreVertical, Copy, Edit2, Trash2, Play } from 'lucide-react'

interface InterviewTemplate {
  id: string
  name: string
  description?: string
  questionsCount: number
  duration?: number // in minutes
  difficulty?: 'easy' | 'medium' | 'hard'
  jobRoles?: string[]
  createdAt: string
  updatedAt?: string
  usageCount?: number
}

interface TemplatesListProps {
  templates: InterviewTemplate[]
  onTemplateClick: (templateId: string) => void
  onEditTemplate: (templateId: string) => void
  onDuplicateTemplate: (templateId: string) => void
  onDeleteTemplate: (templateId: string) => void
  onUseTemplate: (templateId: string) => void
}

export default function TemplatesList({
  templates,
  onTemplateClick,
  onEditTemplate,
  onDuplicateTemplate,
  onDeleteTemplate,
  onUseTemplate,
}: TemplatesListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onClick={() => onTemplateClick(template.id)}
          onEdit={() => onEditTemplate(template.id)}
          onDuplicate={() => onDuplicateTemplate(template.id)}
          onDelete={() => onDeleteTemplate(template.id)}
          onUse={() => onUseTemplate(template.id)}
        />
      ))}
    </div>
  )
}

function TemplateCard({
  template,
  onClick,
  onEdit,
  onDuplicate,
  onDelete,
  onUse,
}: {
  template: InterviewTemplate
  onClick: () => void
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onUse: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <button onClick={onClick} className="flex-1 text-left">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600">
              {template.name}
            </h3>
          </button>
          <div className="relative ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                  <div className="py-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onUse()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Use Template
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDuplicate()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </button>
                    <div className="border-t border-gray-200 my-1" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {template.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {template.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {template.questionsCount} questions
          </span>

          {template.duration && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {template.duration} min
            </span>
          )}

          {template.difficulty && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[template.difficulty]}`}>
              {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
            </span>
          )}
        </div>

        {template.jobRoles && template.jobRoles.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500">For: {template.jobRoles.join(', ')}</p>
          </div>
        )}

        {template.usageCount !== undefined && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Used {template.usageCount} {template.usageCount === 1 ? 'time' : 'times'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}