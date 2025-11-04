interface FilterOption {
  id: string
  label: string
  value: string
}

interface FiltersBarProps {
  activeFilters: FilterOption[]
  onClearAll: () => void
  onRemoveFilter: (filterId: string) => void
  onOpenFilters: () => void
  onOpenColumns: () => void
}

export default function FiltersBar({
  activeFilters,
  onClearAll,
  // onRemoveFilter,
  onOpenFilters,
  onOpenColumns,
}: FiltersBarProps) {
  return (
    <div className="flex items-center">
      <section aria-labelledby="filter-heading" className="w-full flex items-center">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        {/* Left side - Filters */}
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <button
                onClick={onOpenFilters}
                className="group flex items-center font-medium text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
                    clipRule="evenodd"
                  />
                </svg>
                Filters
                {activeFilters.length > 0 && (
                  <span className="font-normal ml-1">({activeFilters.length})</span>
                )}
              </button>
            </div>
            {activeFilters.length > 0 && (
              <div className="pl-6">
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Columns button */}
        <div className="col-start-1 row-start-1 py-4 ml-auto">
          <div className="mx-auto flex items-center justify-end gap-x-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={onOpenColumns}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7" />
                <path d="M3 10h18" />
                <path d="M10 3v18" />
                <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M19.001 15.5v1.5" />
                <path d="M19.001 21v1.5" />
                <path d="M22.032 17.25l-1.299 .75" />
                <path d="M17.27 20l-1.3 .75" />
                <path d="M15.97 17.25l1.3 .75" />
                <path d="M20.733 20l1.3 .75" />
              </svg>
              Columns
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}