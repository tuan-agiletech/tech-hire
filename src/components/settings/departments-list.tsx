import { useState } from 'react'
import { Pencil, Trash2, Building2 } from 'lucide-react'
import type { Department } from '@/types/department'

interface DepartmentsListProps {
  departments: Department[]
  onEdit: (department: Department) => void
  onDelete: (id: string) => void
}

export function DepartmentsList({ departments, onEdit, onDelete }: DepartmentsListProps) {
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

  if (departments.length === 0) {
    return null
  }

  return (
    <>
      {departments.map((department) => (
        <tr key={department.id}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8" colSpan={2}>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <div className="font-medium text-gray-900">{department.name}</div>
            </div>
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => onEdit(department)}
                className="text-teal-600 hover:text-teal-900 inline-flex items-center gap-1"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(department.id)}
                className={`inline-flex items-center gap-1 ${
                  deletingId === department.id
                    ? 'text-red-600 hover:text-red-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Trash2 className="h-4 w-4" />
                {deletingId === department.id ? 'Confirm' : 'Delete'}
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
