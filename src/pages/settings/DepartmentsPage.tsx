
import { useState } from 'react'
import type { Department } from '@/types/department'
import type { DepartmentFormData } from '@/lib/validations/department'
import { DepartmentForm } from '@/components/settings/department-form'
import { DepartmentsList } from '@/components/settings/departments-list'
import { DepartmentModal } from '@/components/settings/department-modal'
import { toast } from 'sonner'

// Mock data - replace with actual API calls
const mockDepartments: Department[] = []

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)

  const handleCreate = (data: DepartmentFormData) => {
    const newDepartment: Department = {
      id: Date.now().toString(),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setDepartments([...departments, newDepartment])
    toast.success('Department created successfully')
  }

  const handleEdit = (department: Department) => {
    setEditingDepartment(department)
    setIsModalOpen(true)
  }

  const handleUpdate = (data: DepartmentFormData) => {
    if (!editingDepartment) return

    const updatedDepartment: Department = {
      ...editingDepartment,
      name: data.name,
      updatedAt: new Date()
    }

    setDepartments(departments.map((d) => (d.id === editingDepartment.id ? updatedDepartment : d)))
    setIsModalOpen(false)
    setEditingDepartment(null)
    toast.success('Department updated successfully')
  }

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id))
    toast.success('Department deleted successfully')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDepartment(null)
  }

  return (
    <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <section aria-labelledby="departments-heading">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div className="flex items-center">
              <div className="flex-auto">
                <h2 id="departments-heading" className="text-lg font-medium leading-6 text-gray-900">
                  Departments
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  This information is visible in job postings and in search engines.
                </p>
              </div>
            </div>

            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 w-2/3"
                        >
                          Department
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        ></th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          colSpan={3}
                        >
                          <DepartmentForm onSubmit={handleCreate} />
                        </td>
                      </tr>
                      <DepartmentsList
                        departments={departments}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DepartmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingDepartment ? handleUpdate : handleCreate}
        initialData={editingDepartment ? { name: editingDepartment.name } : undefined}
      />
    </div>
  )
}
