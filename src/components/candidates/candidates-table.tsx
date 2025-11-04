import { useState } from 'react'
import { MoreVertical, Mail, Phone } from 'lucide-react'

interface Candidate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  jobTitle?: string
  stage?: string
  appliedAt: string
  photoUrl?: string
}

interface CandidatesTableProps {
  candidates: Candidate[]
  onCandidateClick: (candidateId: string) => void
}

export default function CandidatesTable({ candidates, onCandidateClick }: CandidatesTableProps) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Contact
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Job Title
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stage
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Applied
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {candidates.map((candidate) => (
                  <CandidateRow
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => onCandidateClick(candidate.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function CandidateRow({ candidate, onClick }: { candidate: Candidate; onClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={onClick}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0">
            {candidate.photoUrl ? (
              <img className="h-10 w-10 rounded-full" src={candidate.photoUrl} alt="" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium">
                {candidate.firstName[0]}
                {candidate.lastName[0]}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {candidate.firstName} {candidate.lastName}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{candidate.email}</span>
          </div>
          {candidate.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{candidate.phone}</span>
            </div>
          )}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {candidate.jobTitle || '—'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {candidate.stage || 'New'}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Date(candidate.appliedAt).toLocaleDateString()}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsMenuOpen(!isMenuOpen)
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </td>
    </tr>
  )
}