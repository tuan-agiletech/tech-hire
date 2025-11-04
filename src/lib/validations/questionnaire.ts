import { z } from 'zod';

export const questionnaireQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  type: z.enum([
    'short-text',
    'long-text',
    'single-choice',
    'multiple-choice',
    'yes-no',
    'date',
    'file-upload',
  ]),
  options: z.array(z.string()).default([]),
  isRequired: z.boolean().default(false),
}).refine(
  (data) => {
    // Options required for single-choice and multiple-choice
    if (data.type === 'single-choice' || data.type === 'multiple-choice') {
      return data.options.length >= 2;
    }
    return true;
  },
  {
    message: 'At least 2 options are required for choice questions',
    path: ['options'],
  }
);

export const questionnaireSchema = z.object({
  name: z.string().min(1, 'Questionnaire name is required'),
  description: z.string().optional(),
  isRequired: z.boolean().default(false),
  questions: z.array(questionnaireQuestionSchema).min(1, 'At least one question is required'),
});

export type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;
