

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { locationSchema, type LocationFormData } from '@/lib/validations/location'
import { COUNTRIES } from '@/lib/enums/countries'

interface LocationFormProps {
  onSubmit: (data: LocationFormData) => void
}

export function LocationForm({ onSubmit }: LocationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: '',
      country: 'United States',
      isRemote: false
    }
  })

  const handleFormSubmit = (data: LocationFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex items-start space-x-2">
      <div className="relative flex-1">
        <input
          type="text"
          {...register('name')}
          className={`block w-full border-0 bg-gray-50 py-1.5 px-3 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 ${
            errors.name ? 'ring-2 ring-red-500' : ''
          }`}
          placeholder="Add location"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="relative flex-1">
        <select
          {...register('country')}
          className={`block w-full border-0 py-1.5 pl-3 pr-10 text-gray-900 bg-gray-50 sm:text-sm sm:leading-6 ${
            errors.country ? 'ring-2 ring-red-500' : ''
          }`}
        >
          <option value="">Select country</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
        )}
      </div>

      <div className="flex items-center h-[38px]">
        <div className="relative flex items-start ml-2">
          <div className="flex h-6 items-center">
            <input
              id="new-remote"
              type="checkbox"
              {...register('isRemote')}
              className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="new-remote" className="font-medium text-gray-900">
              Remote
            </label>
          </div>
        </div>
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
