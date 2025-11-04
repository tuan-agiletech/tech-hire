import { useState } from 'react'
import Navbar from '@/components/navigation/navbar'
import StarterGuide from '@/components/dashboard/starter-guide'
import PageHeader from '@/components/ui/page-header'
import WorkflowsEmptyState from '@/components/workflows/workflows-empty-state'
import WorkflowsList from '@/components/workflows/workflows-list'

// Mock data
const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
})

const getWorkflowGroups = () => []

export default function WorkflowsPage() {
  const user = getUserData()
  const [workflowGroups, setWorkflowGroups] = useState(getWorkflowGroups())

  const handleAddWorkflowGroup = () => {
    console.log('Add workflow group clicked')
    // Open modal or navigate to create workflow group page
  }

  const handleEditGroup = (groupId: string) => {
    console.log('Edit group:', groupId)
    // Open edit modal
  }

  const handleDeleteGroup = (groupId: string) => {
    console.log('Delete group:', groupId)
    // Show confirmation and delete
  }

  const handleWorkflowClick = (workflowId: string) => {
    console.log('Workflow clicked:', workflowId)
    // Navigate to workflow editor
  }

  const handleToggleWorkflow = (workflowId: string, enabled: boolean) => {
    console.log('Toggle workflow:', workflowId, enabled)
    // Update workflow status
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />

      <div className="h-full flex flex-col overflow-y-auto max-w-full">
        {/* Starter Guide */}
        <div className="sm:px-6 lg:px-8 mt-4">
          <StarterGuide />
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full space-y-4 pb-12 pt-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <PageHeader title="Workflows" />

          {/* Content Area */}
          {workflowGroups.length === 0 ? (
            <WorkflowsEmptyState onAddWorkflowGroup={handleAddWorkflowGroup} />
          ) : (
            <WorkflowsList
              groups={workflowGroups}
              onEditGroup={handleEditGroup}
              onDeleteGroup={handleDeleteGroup}
              onWorkflowClick={handleWorkflowClick}
              onToggleWorkflow={handleToggleWorkflow}
            />
          )}
        </div>
      </div>
    </div>
  )
}
