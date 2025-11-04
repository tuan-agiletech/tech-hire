import { Check, CircleArrowUp } from 'lucide-react'

interface PlanFeature {
  name: string
  included: boolean
  comingSoon?: boolean
  limit?: {
    current: number
    max: number
  }
}

interface PlanCardProps {
  name: string
  price?: number
  period?: string
  description?: string
  isCurrentPlan?: boolean
  features: PlanFeature[]
  onUpgrade?: () => void
  highlighted?: boolean
}

export default function PlanCard({
  name,
  price,
  period = 'month',
  description,
  isCurrentPlan = false,
  features,
  onUpgrade,
  highlighted = false,
}: PlanCardProps) {
  return (
    <div
      className={`bg-white shadow-sm sm:rounded-md md:col-span-2 ${
        highlighted ? 'outline outline-2 outline-offset-1 outline-teal-700/75' : ''
      }`}
    >
      <div className="px-4 py-6 sm:p-8">
        {/* Header */}
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900 flex items-center">
              <span>{name}</span>
              {isCurrentPlan && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ml-2">
                  current plan
                </span>
              )}
            </h3>
            {description && (
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>{description}</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          {!isCurrentPlan && onUpgrade && (
            <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:shrink-0 sm:items-center">
              <button
                type="button"
                onClick={onUpgrade}
                className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Upgrade plan
              </button>
            </div>
          )}
        </div>

        {/* Pricing */}
        {price !== undefined && (
          <p className="mt-6 flex items-baseline gap-x-1">
            <span className="text-4xl font-bold tracking-tight text-gray-900">
              ${price}
            </span>
            <span className="text-sm font-semibold leading-6 text-gray-600">
              /{period}
            </span>
          </p>
        )}

        {/* Features */}
        <p className="text-sm font-semibold leading-6 text-gray-900 mt-8">
          {isCurrentPlan ? 'Included in your plan:' : 'Includes:'}
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
          {features.map((feature, index) => (
            <li key={index}>
              <div className="flex gap-x-3 w-full">
                {feature.limit ? (
                  <CircleArrowUp className="h-6 w-6 flex-none text-teal-600" />
                ) : (
                  <Check className="h-6 w-5 ml-0.5 flex-none text-teal-600" />
                )}
                <div className="flex items-center justify-between w-full">
                  <span className="">
                    {feature.name}
                    {feature.comingSoon && (
                      <span className="ml-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        coming soon
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Progress Bar for Limited Features */}
              {feature.limit && (
                <div aria-hidden="true" className="mt-4 pl-9">
                  <div className="overflow-hidden rounded-full bg-gray-200">
                    <div
                      style={{
                        width: `${(feature.limit.current / feature.limit.max) * 100}%`,
                      }}
                      className="h-2 rounded-full bg-teal-600"
                    />
                  </div>
                  <div className="text-right mt-1 text-xs font-medium text-gray-600">
                    currently using {feature.limit.current} of {feature.limit.max}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}