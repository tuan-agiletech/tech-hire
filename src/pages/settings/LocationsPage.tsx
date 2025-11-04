
import { useState } from 'react'
import type { Location } from '@/types/location'
import type { LocationFormData } from '@/lib/validations/location'
import { LocationForm } from '@/components/settings/location-form'
import { LocationsList } from '@/components/settings/locations-list'
import { LocationModal } from '@/components/settings/location-modal'
import { toast } from 'sonner'

// Mock data - replace with actual API calls
const mockLocations: Location[] = []

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)

  const handleCreate = (data: LocationFormData) => {
    const newLocation: Location = {
      id: Date.now().toString(),
      name: data.name,
      country: data.country,
      isRemote: data.isRemote,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setLocations([...locations, newLocation])
    toast.success('Location created successfully')
  }

  const handleEdit = (location: Location) => {
    setEditingLocation(location)
    setIsModalOpen(true)
  }

  const handleUpdate = (data: LocationFormData) => {
    if (!editingLocation) return

    const updatedLocation: Location = {
      ...editingLocation,
      name: data.name,
      country: data.country,
      isRemote: data.isRemote,
      updatedAt: new Date()
    }

    setLocations(locations.map((l) => (l.id === editingLocation.id ? updatedLocation : l)))
    setIsModalOpen(false)
    setEditingLocation(null)
    toast.success('Location updated successfully')
  }

  const handleDelete = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id))
    toast.success('Location deleted successfully')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingLocation(null)
  }

  return (
    <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <section aria-labelledby="locations-heading">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div className="flex items-center">
              <div className="flex-auto">
                <h2 id="locations-heading" className="text-lg font-medium leading-6 text-gray-900">
                  Locations
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
                          Location
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
                          <LocationForm onSubmit={handleCreate} />
                        </td>
                      </tr>
                      <LocationsList
                        locations={locations}
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

      <LocationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingLocation ? handleUpdate : handleCreate}
        initialData={
          editingLocation
            ? {
                name: editingLocation.name,
                country: editingLocation.country,
                isRemote: editingLocation.isRemote
              }
            : undefined
        }
      />
    </div>
  )
}
