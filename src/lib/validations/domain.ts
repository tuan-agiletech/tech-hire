import { z } from 'zod';

export const domainSchema = z.object({
  domain: z
    .string()
    .min(1, 'Domain is required')
    .regex(
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i,
      'Please enter a valid domain (e.g., careers.example.com)'
    ),
});

export const subdomainSchema = z.object({
  subdomain: z
    .string()
    .min(1, 'Subdomain is required')
    .regex(
      /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i,
      'Subdomain can only contain letters, numbers, and hyphens'
    ),
});
