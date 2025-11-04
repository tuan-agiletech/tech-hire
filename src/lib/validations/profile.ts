import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png', 'image/webp']

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  photo: z
    .custom<FileList>()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true
      return files[0].size <= MAX_FILE_SIZE
    }, 'File size must be less than 1MB')
    .refine((files) => {
      if (!files || files.length === 0) return true
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type)
    }, 'Only .jpg, .jpeg, .gif, .png and .webp formats are supported'),
})

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
})

export type ProfileFormData = z.infer<typeof profileSchema>
export type EmailFormData = z.infer<typeof emailSchema>