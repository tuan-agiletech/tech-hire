export interface WorkflowAction {
  id: string
  type: string
  config: Record<string, any>
  order: number
}

export interface WorkflowTrigger {
  id: string
  type: 'candidate_stage_change' | 'candidate_created' | 'job_published' | 'scheduled'
  config: Record<string, any>
}

export interface Workflow {
  id: string
  name: string
  description?: string
  enabled: boolean
  groupId: string
  triggerType: string
  trigger?: WorkflowTrigger
  actions: WorkflowAction[]
  actionsCount: number
  executionsCount?: number
  lastExecutedAt?: string
  createdAt: string
  updatedAt?: string
}

export interface WorkflowGroup {
  id: string
  name: string
  description?: string
  organizationId: string
  workflows: Workflow[]
  createdAt: string
  updatedAt?: string
}

export interface WorkflowExecution {
  id: string
  workflowId: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  startedAt: string
  completedAt?: string
  error?: string
  logs: string[]
}