export interface EmailTemplate {
  id: string;
  organizationId: string;
  name: string;
  subject: EmailTemplateContent;
  body: EmailTemplateContent;
  from: string;
  fromName: string;
  cc: string[];
  replyTo: string[];
  type: EmailTemplateType;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplateContent {
  type: 'doc';
  content: Array<{
    type: string;
    content?: Array<{
      type: string;
      text?: string;
      attrs?: {
        var: string;
      };
    }>;
  }>;
}

export type EmailTemplateType =
  | 'application-confirmation'
  | 'interview-invitation'
  | 'interview-reminder'
  | 'rejection'
  | 'offer'
  | 'custom';

export interface EmailTemplateFormData {
  name: string;
  subject: string;
  body: string;
  fromName: string;
  type: EmailTemplateType;
  isEnabled: boolean;
}

export const EMAIL_TEMPLATE_VARIABLES = [
  'CANDIDATE_FIRST_NAME',
  'CANDIDATE_LAST_NAME',
  'CANDIDATE_EMAIL',
  'JOB_POSTING_TITLE',
  'ORGANIZATION_NAME',
  'INTERVIEW_DATE',
  'INTERVIEW_TIME',
  'INTERVIEW_LOCATION',
  'INTERVIEWER_NAME',
] as const;

export type EmailTemplateVariable = typeof EMAIL_TEMPLATE_VARIABLES[number];
