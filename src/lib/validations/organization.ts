import { z } from 'zod'
import { Role } from '../enums/role'

export const organizationSchema = z.object({
  name: z
    .string()
    .min(1, 'Organization name is required')
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must not exceed 100 characters'),
})

export const subdomainSchema = z.object({
  slug: z
    .string()
    .min(3, 'Subdomain must be at least 3 characters')
    .max(50, 'Subdomain must not exceed 50 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Subdomain can only contain lowercase letters, numbers, and hyphens'
    ),
})

export const inviteUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  role: z.nativeEnum(Role, 'Please select a role'),
})

export type OrganizationFormData = z.infer<typeof organizationSchema>
export type SubdomainFormData = z.infer<typeof subdomainSchema>
export type InviteUserFormData = z.infer<typeof inviteUserSchema>