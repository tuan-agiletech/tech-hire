import { z } from 'zod';

export const emailTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
  fromName: z.string().optional(),
  type: z.enum([
    'application-confirmation',
    'interview-invitation',
    'interview-reminder',
    'rejection',
    'offer',
    'custom',
  ]),
  isEnabled: z.boolean().default(true),
});

export type EmailTemplateFormData = z.infer<typeof emailTemplateSchema>;
