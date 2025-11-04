'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import type { ScorecardTemplate } from '@/types/scorecard'

interface ScorecardTemplatesListProps {
  templates: ScorecardTemplate[]
  onEdit: (template: ScorecardTemplate) => void
  onDelete: (id: string) => void
}

export function ScorecardTemplatesList({ templates, onEdit, onDelete }: ScorecardTemplatesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (deletingId === id) {
      onDelete(id)
      setDeletingId(null)
    } else {
      setDeletingId(id)
      setTimeout(() => setDeletingId(null), 3000)
    }
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Template Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Attributes
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Created
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {templates.map((template) => (
                <tr key={template.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">{template.name}</div>
                    {template.description && (
                      <div className="text-gray-500 mt-0.5">{template.description}</div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {template.attributeCount} {template.attributeCount === 1 ? 'attribute' : 'attributes'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(template)}
                        className="text-teal-600 hover:text-teal-900 inline-flex items-center gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className={`inline-flex items-center gap-1 ${
                          deletingId === template.id
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Trash2 className="h-4 w-4" />
                        {deletingId === template.id ? 'Confirm' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
