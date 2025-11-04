import type { WorkflowGroup } from '@/types/workflows'
import WorkflowGroupCard from './workflow-group-card'

interface WorkflowsListProps {
  groups: WorkflowGroup[]
  onEditGroup: (groupId: string) => void
  onDeleteGroup: (groupId: string) => void
  onWorkflowClick: (workflowId: string) => void
  onToggleWorkflow: (workflowId: string, enabled: boolean) => void
}

export default function WorkflowsList({
  groups,
  onEditGroup,
  onDeleteGroup,
  onWorkflowClick,
  onToggleWorkflow,
}: WorkflowsListProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <WorkflowGroupCard
          key={group.id}
          group={group}
          onEditGroup={onEditGroup}
          onDeleteGroup={onDeleteGroup}
          onWorkflowClick={onWorkflowClick}
          onToggleWorkflow={onToggleWorkflow}
        />
      ))}
    </div>
  )
}