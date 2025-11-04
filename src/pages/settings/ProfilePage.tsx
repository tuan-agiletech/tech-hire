
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  profileSchema,
  emailSchema,
  type ProfileFormData,
  type EmailFormData,
} from '@/lib/validations/profile'
import { FormInput } from '@/components/ui/form-input'
import AvatarUpload from '@/components/settings/avatar-upload'
import Alert from '@/components/ui/alert'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  photoUrl?: string | null
}

// Mock data
const getUserData = (): User => ({
  id: 'cmgvkbyuu1icb12vizw1xbkkw',
  email: 'tuan.ba@agiletechsoftware.com',
  firstName: 'Bùi',
  lastName: 'Tuấn',
  photoUrl: null,
})

const isExternalProvider = true // Check if user is using Google/Microsoft auth

export default function ProfileSettingsPage() {
  const [user, setUser] = useState(getUserData())
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile, isSubmitting: isSubmittingProfile },
    setValue: setValueProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })

  // Email Form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail, isSubmitting: isSubmittingEmail },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user.email,
    },
  })

  const handleUpdateProfile = async (data: ProfileFormData) => {
    try {
      // Upload photo if exists
      let photoUrl = user.photoUrl

      if (photoFile) {
        const formData = new FormData()
        formData.append('photo', photoFile)

        // Simulate upload
        await new Promise((resolve) => setTimeout(resolve, 1000))
        photoUrl = URL.createObjectURL(photoFile) // In production, use the uploaded URL
      }

      // API call to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser({
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
        photoUrl,
      })

      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
      console.error(error)
    }
  }

  const handleUpdateEmail = async (data: EmailFormData) => {
    try {
      // API call to update email
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser({ ...user, email: data.email })
      toast.success('Email updated successfully')
    } catch (error) {
      toast.error('Failed to update email')
      console.error(error)
    }
  }

  const handlePhotoChange = (file: File | null) => {
    setPhotoFile(file)
    setValueProfile('photo', file ? ([file] as any) : undefined)
  }

  return (
    <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      {/* Profile Info Section */}
      <section aria-labelledby="profile-heading">
        <form onSubmit={handleSubmitProfile(handleUpdateProfile)}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-6 sm:p-6">
              <div>
                <h2
                  id="profile-heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Profile info
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your profile information. This information will be visible to
                  other users.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                {/* Avatar Upload */}
                <AvatarUpload
                  currentPhotoUrl={user.photoUrl}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  onPhotoChange={handlePhotoChange}
                  error={errorsProfile.photo?.message}
                />

                {/* Name Fields */}
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <FormInput
                      label="First name"
                      error={errorsProfile.firstName?.message}
                      required
                    >
                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        {...registerProfile('firstName')}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      />
                    </FormInput>
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <FormInput
                      label="Last name"
                      error={errorsProfile.lastName?.message}
                      required
                    >
                      <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        {...registerProfile('lastName')}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      />
                    </FormInput>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                disabled={isSubmittingProfile}
                className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingProfile ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Email Address Section */}
      <section aria-labelledby="email-heading">
        <form onSubmit={handleSubmitEmail(handleUpdateEmail)}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-6 sm:p-6">
              <div>
                <h2
                  id="email-heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Email address
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your email address for receiving notifications and
                  authentication purposes.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-6">
                {isExternalProvider ? (
                  <div className="col-span-4">
                    <Alert
                      variant="warning"
                      title="Your account is managed by an external identity provider"
                      description={
                        <p>
                          Your account is linked to a Google or Microsoft authentication
                          provider. Please{' '}
                          <a
                            href="mailto:support@growhire.com"
                            className="underline hover:no-underline"
                          >
                            contact support
                          </a>{' '}
                          to change your email address.
                        </p>
                      }
                    />
                  </div>
                ) : (
                  <div className="col-span-4 sm:col-span-2">
                    <FormInput
                      label="Email address"
                      error={errorsEmail.email?.message}
                      required
                    >
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...registerEmail('email')}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      />
                    </FormInput>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                disabled={isSubmittingEmail || isExternalProvider}
                className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingEmail ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}