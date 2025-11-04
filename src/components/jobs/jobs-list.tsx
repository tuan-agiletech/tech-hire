interface Job {
  id: string
  title: string
  department?: string
  location?: string
  status: 'draft' | 'published' | 'closed'
  candidatesCount?: number
  createdAt: string
}

interface JobsListProps {
  jobs: Job[]
  onJobClick: (jobId: string) => void
}

export default function JobsList({ jobs, onJobClick }: JobsListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {jobs.map((job) => (
          <li key={job.id}>
            <button
              onClick={() => onJobClick(job.id)}
              className="w-full block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      {job.department && (
                        <span className="mr-4">{job.department}</span>
                      )}
                      {job.location && <span>{job.location}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {job.candidatesCount || 0} candidates
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatusBadge({ status }: { status: Job['status'] }) {
  const styles = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    closed: 'bg-red-100 text-red-800',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}