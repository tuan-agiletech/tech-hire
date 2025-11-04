import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'

interface Role {
  value: 'owner' | 'admin' | 'member'
  label: string
}

const roles: Role[] = [
  { value: 'owner', label: 'Account owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' },
]

interface RoleSelectProps {
  value: 'owner' | 'admin' | 'member'
  onChange: (value: 'owner' | 'admin' | 'member') => void
  disabled?: boolean
}

export default function RoleSelect({ value, onChange, disabled }: RoleSelectProps) {
  const selected = roles.find((r) => r.value === value) || roles[0]

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button
          className={`flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-8 ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <span>{selected.label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {roles.map((role) => (
              <Listbox.Option
                key={role.value}
                value={role.value}
                disabled={role.value === 'owner'}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {role.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                        <Check className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}