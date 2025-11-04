import { useState } from "react"

interface CandidatesEmptyStateProps {
  onAddCandidate: () => void
  onImportCandidates: () => void
}

export default function CandidatesEmptyState({
  onAddCandidate,
  onImportCandidates,
}: CandidatesEmptyStateProps) {
  return (
    <div className="mt-12 flex-col mx-auto items-center justify-center">
      {/* SVG Illustration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 830.54531 637.7185"
        className="block mx-auto w-64 h-auto"
      >
        <circle cx="757.16832" cy="550.34836" r="6.53539" fill="#e5e5e5" />
        <rect x="773.18704" y="592.7185" width="2" height="44" fill="#e5e5e5" />
        <circle cx="774.18712" cy="576.40952" r="10.52283" fill="#e5e5e5" />
        <path
          d="M958.91447,757.41152s-1.50327-32.33191-32.3201-28.57379"
          transform="translate(-184.72734 -131.14075)"
          fill="#e5e5e5"
        />
        {/* Add more SVG paths as needed */}
        <path
          d="M1014.27266,768.85925h-381a1,1,0,0,1,0-2h381a1,1,0,1,1,0,2Z"
          transform="translate(-184.72734 -131.14075)"
          fill="#cbcbcb"
        />
      </svg>

      <div className="mt-6 flex-col items-center justify-center">
        <h3 className="mt-2 text-xl font-semibold text-gray-900 text-center">
          You haven't got any candidates yet
        </h3>
        <p className="mt-1 text-sm text-gray-500 text-center">
          Get started by creating a new candidate.
        </p>

        <div className="flex justify-center mt-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={onAddCandidate}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-l-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="-ml-0.5 h-5 w-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              New Candidate
            </button>

            {/* Dropdown */}
            <DropdownMenu onImportCandidates={onImportCandidates} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DropdownMenu({ onImportCandidates }: { onImportCandidates: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative -ml-px inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-r-md bg-teal-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => {
                onImportCandidates()
                setIsOpen(false)
              }}
              className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Import from CSV
            </button>
          </div>
        </div>
      )}
    </div>
  )
}