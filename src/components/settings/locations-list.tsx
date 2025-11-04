import { useState } from 'react'
import { Pencil, Trash2, MapPin } from 'lucide-react'
import type { Location } from '@/types/location'

interface LocationsListProps {
  locations: Location[]
  onEdit: (location: Location) => void
  onDelete: (id: string) => void
}

export function LocationsList({ locations, onEdit, onDelete }: LocationsListProps) {
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

  if (locations.length === 0) {
    return null
  }

  return (
    <>
      {locations.map((location) => (
        <tr key={location.id}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8" colSpan={2}>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">{location.name}</div>
                <div className="text-gray-500">
                  {location.isRemote ? 'Remote' : location.country}
                </div>
              </div>
            </div>
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => onEdit(location)}
                className="text-teal-600 hover:text-teal-900 inline-flex items-center gap-1"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(location.id)}
                className={`inline-flex items-center gap-1 ${
                  deletingId === location.id
                    ? 'text-red-600 hover:text-red-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Trash2 className="h-4 w-4" />
                {deletingId === location.id ? 'Confirm' : 'Delete'}
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
