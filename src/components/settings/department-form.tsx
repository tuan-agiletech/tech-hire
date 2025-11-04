'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { departmentSchema, type DepartmentFormData } from '@/lib/validations/department'

interface DepartmentFormProps {
  onSubmit: (data: DepartmentFormData) => void
}

export function DepartmentForm({ onSubmit }: DepartmentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: ''
    }
  })

  const handleFormSubmit = (data: DepartmentFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex items-center space-x-2">
      <div className="relative flex-1">
        <input
          type="text"
          {...register('name')}
          className={`block w-full border-0 bg-gray-50 py-1.5 px-3 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 ${
            errors.name ? 'ring-2 ring-red-500' : ''
          }`}
          placeholder="Add department"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="pl-4">
        <button
          type="submit"
          className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Create
        </button>
      </div>
    </form>
  )
}
