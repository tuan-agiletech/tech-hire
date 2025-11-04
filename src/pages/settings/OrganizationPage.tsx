
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner' // or your toast library
import {
  organizationSchema,
  subdomainSchema,
  type OrganizationFormData,
  type SubdomainFormData,
  type InviteUserFormData,
} from '@/lib/validations/organization'
import { FormInput } from '@/components/ui/form-input'
import InviteUserModal from '@/components/settings/invite-user-modal'
import RoleSelect from '@/components/settings/role-select'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'owner' | 'admin' | 'member'
}

interface Organization {
  id: string
  name: string
}

interface CareerPage {
  id: string
  slug: string
}

// Mock data
const getUserData = () => ({
  name: 'Bùi Tuấn',
  email: 'tuan.ba@agiletechsoftware.com',
  initials: 'BT',
})

const getOrganization = (): Organization => ({
  id: 'cmgvkbyut1ica12viy4v4olu0',
  name: 'Agiletech',
})

const getCareerPage = (): CareerPage => ({
  id: 'cmgvkbyuu1icd12viskrxtp5q',
  slug: 'agiletech-brz16k',
})

const getUsers = (): User[] => [
  {
    id: 'cmgvkbyuu1icb12vizw1xbkkw',
    email: 'tuan.ba@agiletechsoftware.com',
    firstName: 'Bùi',
    lastName: 'Tuấn',
    role: 'owner',
  },
]

export default function OrganizationSettingsPage() {
  const [organization, setOrganization] = useState(getOrganization())
  const [careerPage, setCareerPage] = useState(getCareerPage())
  const [users, setUsers] = useState(getUsers())
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  // Organization Form
  const {
    register: registerOrg,
    handleSubmit: handleSubmitOrg,
    formState: { errors: errorsOrg, isSubmitting: isSubmittingOrg },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization.name,
    },
  })

  // Subdomain Form
  const {
    register: registerSubdomain,
    handleSubmit: handleSubmitSubdomain,
    formState: { errors: errorsSubdomain, isSubmitting: isSubmittingSubdomain },
  } = useForm<SubdomainFormData>({
    resolver: zodResolver(subdomainSchema),
    defaultValues: {
      slug: careerPage.slug,
    },
  })

  const handleUpdateOrganization = async (data: OrganizationFormData) => {
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setOrganization({ ...organization, name: data.name })
      toast.success('Organization updated successfully')
    } catch (error) {
      toast.error('Failed to update organization')
      console.error(error)
    }
  }

  const handleUpdateSubdomain = async (data: SubdomainFormData) => {
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setCareerPage({ ...careerPage, slug: data.slug })
      toast.success('Subdomain updated successfully')
    } catch (error) {
      toast.error('Failed to update subdomain')
      console.error(error)
    }
  }

  const handleInviteUser = async (data: InviteUserFormData) => {
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      console.log('Inviting user:', data)
      toast.success(`Invitation sent to ${data.email}`)
    } catch (error) {
      toast.error('Failed to send invitation')
      console.error(error)
    }
  }

  const handleUpdateUserRole = async (userId: string, newRole: 'owner' | 'admin' | 'member') => {
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      toast.success('User role updated successfully')
    } catch (error) {
      toast.error('Failed to update user role')
      console.error(error)
    }
  }

  const handleRemoveUser = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this user?')) return
    
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      setUsers(users.filter(u => u.id !== userId))
      toast.success('User removed successfully')
    } catch (error) {
      toast.error('Failed to remove user')
      console.error(error)
    }
  }

  return (
    <>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        {/* Organization Information */}
        <section aria-labelledby="organization-heading">
          <form onSubmit={handleSubmitOrg(handleUpdateOrganization)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white px-4 py-6 sm:p-6">
                <div>
                  <h2
                    id="organization-heading"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Organization information
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <FormInput
                      label="Organization name"
                      error={errorsOrg.name?.message}
                      required
                    >
                      <input
                        id="name"
                        type="text"
                        autoComplete="organization"
                        {...registerOrg('name')}
                        className="block w-full rounded-md border-0 px-3 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      />
                    </FormInput>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isSubmittingOrg}
                  className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingOrg ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Career Page */}
        <section aria-labelledby="career-page-heading">
          <form onSubmit={handleSubmitSubdomain(handleUpdateSubdomain)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white px-4 py-6 sm:p-6">
                <div>
                  <h2
                    id="career-page-heading"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Career Page
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Custom subdomain
                    </label>
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <input
                        id="slug"
                        type="text"
                        placeholder="yourdomain"
                        {...registerSubdomain('slug')}
                        className={`block w-full flex-1 rounded-none rounded-l-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ${
                          errorsSubdomain.slug
                            ? 'ring-red-500 focus:ring-red-600'
                            : 'ring-gray-300 focus:ring-teal-500'
                        } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                      />
                      <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        .jobs.growhire.com
                      </span>
                    </div>
                    {errorsSubdomain.slug && (
                      <p className="mt-2 text-sm text-red-600">
                        {errorsSubdomain.slug.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isSubmittingSubdomain}
                  className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingSubdomain ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Users Table */}
        <section aria-labelledby="users-heading">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-6 sm:p-6">
              <div className="flex items-center">
                <div className="flex-auto">
                  <h2
                    id="users-heading"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Users
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">Manage your team.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(true)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Invite User
                  </button>
                </div>
              </div>

              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                            Name
                          </th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Email address
                          </th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Role
                          </th>
                          <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="whitespace-nowrap px-3 text-sm text-gray-500">
                              <RoleSelect
                                value={user.role}
                                onChange={(newRole) => handleUpdateUserRole(user.id, newRole)}
                                disabled={user.role === 'owner'}
                              />
                            </td>
                            <td className="flex items-center justify-end relative whitespace-nowrap py-4 pl-3 pr-4 sm:pr-6 lg:pr-8 space-x-2">
                              {user.role !== 'owner' && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveUser(user.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Invite User Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={handleInviteUser}
      />
    </>
  )
}