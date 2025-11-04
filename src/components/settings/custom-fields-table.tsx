import { useState } from 'react'
import { MoreVertical, Edit2, Trash2 } from 'lucide-react'
import type { CustomField } from '@/types/custom-field'

interface CustomFieldsTableProps {
  fields: CustomField[]
  onEdit: (field: CustomField) => void
  onDelete: (fieldId: string) => void
}

export default function CustomFieldsTable({
  fields,
  onEdit,
  onDelete,
}: CustomFieldsTableProps) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                  Field Name
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Description
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Required
                </th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {fields.map((field) => (
                <CustomFieldRow
                  key={field.id}
                  field={field}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function CustomFieldRow({
  field,
  onEdit,
  onDelete,
}: {
  field: CustomField
  onEdit: (field: CustomField) => void
  onDelete: (fieldId: string) => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const fieldTypeLabels: Record<string, string> = {
    text: 'Text',
    textarea: 'Text Area',
    number: 'Number',
    date: 'Date',
    select: 'Select',
    multiselect: 'Multi-Select',
    checkbox: 'Checkbox',
    url: 'URL',
    email: 'Email',
  }

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        {field.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {fieldTypeLabels[field.type] || field.type}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        {field.description || '—'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {field.required ? (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Required
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
            Optional
          </span>
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit(field)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(field.id)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}