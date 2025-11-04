
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import CustomFieldModal from '@/components/settings/custom-field-modal'
import CustomFieldsTable from '@/components/settings/custom-fields-table'
import CustomFieldsEmptyState from '@/components/settings/custom-fields-empty-state'
import type { CustomFieldFormData } from '@/lib/validations/custom-field'
import type { CustomField } from '@/types/custom-field'

// Mock data
const getCustomFields = (): CustomField[] => []

export default function CustomFieldsSettingsPage() {
  const [customFields, setCustomFields] = useState<CustomField[]>(getCustomFields())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingField, setEditingField] = useState<CustomField | null>(null)

  const handleCreateField = async (data: CustomFieldFormData) => {
    try {
      // API call to create custom field
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newField: CustomField = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        organizationId: 'cmgvkbyut1ica12viy4v4olu0',
        createdAt: new Date().toISOString(),
      }

      setCustomFields([...customFields, newField])
      toast.success('Custom field created successfully')
    } catch (error) {
      toast.error('Failed to create custom field')
      console.error(error)
      throw error
    }
  }

  const handleUpdateField = async (data: CustomFieldFormData) => {
    if (!editingField) return

    try {
      // API call to update custom field
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCustomFields(
        customFields.map((field) =>
          field.id === editingField.id
            ? { ...field, ...data, updatedAt: new Date().toISOString() }
            : field
        )
      )

      toast.success('Custom field updated successfully')
    } catch (error) {
      toast.error('Failed to update custom field')
      console.error(error)
      throw error
    }
  }

  const handleDeleteField = async (fieldId: string) => {
    if (!confirm('Are you sure you want to delete this custom field?')) return

    try {
      // API call to delete custom field
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCustomFields(customFields.filter((field) => field.id !== fieldId))
      toast.success('Custom field deleted successfully')
    } catch (error) {
      toast.error('Failed to delete custom field')
      console.error(error)
    }
  }

  const handleOpenModal = (field?: CustomField) => {
    if (field) {
      setEditingField(field)
    } else {
      setEditingField(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingField(null)
  }

  return (
    <>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="custom-fields-heading">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-6 sm:p-6">
              <div className="flex items-center">
                <div className="flex-auto">
                  <h2
                    id="custom-fields-heading"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Custom Fields
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Create custom fields to capture additional information about candidates
                  </p>
                </div>
                {customFields.length > 0 && (
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      type="button"
                      onClick={() => handleOpenModal()}
                      className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                      <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
                      Create Custom Field
                    </button>
                  </div>
                )}
              </div>

              {customFields.length === 0 ? (
                <CustomFieldsEmptyState onCreate={() => handleOpenModal()} />
              ) : (
                <CustomFieldsTable
                  fields={customFields}
                  onEdit={handleOpenModal}
                  onDelete={handleDeleteField}
                />
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Create/Edit Modal */}
      <CustomFieldModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingField ? handleUpdateField : handleCreateField}
        field={editingField}
      />
    </>
  )
}