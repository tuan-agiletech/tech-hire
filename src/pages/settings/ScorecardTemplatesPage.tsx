
import { useState } from 'react'
import { Crown } from 'lucide-react'
import type { ScorecardTemplate } from '@/types/scorecard'
import type { ScorecardTemplateFormData } from '@/lib/validations/scorecard'
import { ScorecardTemplatesEmptyState } from '@/components/settings/scorecard-templates-empty-state'
import { ScorecardTemplateModal } from '@/components/settings/scorecard-template-modal'
import { ScorecardTemplatesList } from '@/components/settings/scorecard-templates-list'
import { toast } from 'sonner'

// Mock data - replace with actual API calls
// const mockTemplates: ScorecardTemplate[] = [
//   {
//     id: '1',
//     name: 'Technical Interview',
//     description: 'Evaluate technical skills and problem-solving abilities',
//     createdAt: new Date('2024-01-15'),
//     updatedAt: new Date('2024-01-15'),
//     attributeCount: 4,
//     attributes: [
//       {
//         id: '1',
//         name: 'Technical Skills',
//         type: AttributeType.RATING,
//         isRequired: true,
//         order: 0
//       },
//       {
//         id: '2',
//         name: 'Problem Solving',
//         type: AttributeType.RATING,
//         isRequired: true,
//         order: 1
//       },
//       {
//         id: '3',
//         name: 'Communication',
//         type: AttributeType.RATING,
//         isRequired: false,
//         order: 2
//       },
//       {
//         id: '4',
//         name: 'Cultural Fit',
//         type: AttributeType.YES_NO,
//         isRequired: true,
//         order: 3
//       }
//     ]
//   }
// ]

export default function ScorecardTemplatesPage() {
  const [templates, setTemplates] = useState<ScorecardTemplate[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<ScorecardTemplate | null>(null)
  const hasFullAccess = false // This would come from subscription check

  const handleCreate = (data: ScorecardTemplateFormData) => {
    if (!hasFullAccess) {
      toast.error('Please upgrade your plan to create scorecard templates')
      return
    }

    const newTemplate: ScorecardTemplate = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      attributeCount: data.attributes.length,
      attributes: data.attributes.map((attr, index) => ({
        id: `${Date.now()}-${index}`,
        name: attr.name,
        type: attr.type,
        options: attr.options,
        isRequired: attr.isRequired,
        order: index
      }))
    }

    setTemplates([...templates, newTemplate])
    setIsModalOpen(false)
    toast.success('Scorecard template created successfully')
  }

  const handleEdit = (template: ScorecardTemplate) => {
    if (!hasFullAccess) {
      toast.error('Please upgrade your plan to edit scorecard templates')
      return
    }

    setEditingTemplate(template)
    setIsModalOpen(true)
  }

  const handleUpdate = (data: ScorecardTemplateFormData) => {
    if (!editingTemplate) return

    const updatedTemplate: ScorecardTemplate = {
      ...editingTemplate,
      name: data.name,
      description: data.description,
      updatedAt: new Date(),
      attributeCount: data.attributes.length,
      attributes: data.attributes.map((attr, index) => ({
        id: editingTemplate.attributes[index]?.id || `${Date.now()}-${index}`,
        name: attr.name,
        type: attr.type,
        options: attr.options,
        isRequired: attr.isRequired,
        order: index
      }))
    }

    setTemplates(templates.map((t) => (t.id === editingTemplate.id ? updatedTemplate : t)))
    setIsModalOpen(false)
    setEditingTemplate(null)
    toast.success('Scorecard template updated successfully')
  }

  const handleDelete = (id: string) => {
    if (!hasFullAccess) {
      toast.error('Please upgrade your plan to delete scorecard templates')
      return
    }

    setTemplates(templates.filter((t) => t.id !== id))
    toast.success('Scorecard template deleted successfully')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTemplate(null)
  }

  return (
    <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <section aria-labelledby="scorecard-templates-heading">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div className="flex items-center">
              <div className="flex-auto">
                <h2 id="scorecard-templates-heading" className="text-lg font-medium leading-6 text-gray-900">
                  <span>Scorecard Templates</span>
                  {!hasFullAccess && (
                    <span className="ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                      <Crown className="w-3 h-3" />
                      <span>Upgrade required</span>
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Create templates to standardize feedback collection across interviews
                </p>
              </div>
              {templates.length > 0 && (
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    Create Template
                  </button>
                </div>
              )}
            </div>

            {templates.length === 0 ? (
              <div className="mt-8">
                <ScorecardTemplatesEmptyState onCreateClick={() => setIsModalOpen(true)} />
              </div>
            ) : (
              <ScorecardTemplatesList
                templates={templates}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </section>

      <ScorecardTemplateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingTemplate ? handleUpdate : handleCreate}
        initialData={
          editingTemplate
            ? {
                name: editingTemplate.name,
                description: editingTemplate.description,
                attributes: editingTemplate.attributes.map((attr) => ({
                  name: attr.name,
                  type: attr.type,
                  options: attr.options || [],
                  isRequired: attr.isRequired
                }))
              }
            : undefined
        }
      />
    </div>
  )
}
