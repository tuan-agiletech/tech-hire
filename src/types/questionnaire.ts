export interface Questionnaire {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  questions: QuestionnaireQuestion[];
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionnaireQuestion {
  id: string;
  questionnaireId: string;
  question: string;
  type: QuestionType;
  options: string[];
  isRequired: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type QuestionType = 
  | 'short-text'
  | 'long-text'
  | 'single-choice'
  | 'multiple-choice'
  | 'yes-no'
  | 'date'
  | 'file-upload';

export interface QuestionnaireFormData {
  name: string;
  description?: string;
  isRequired: boolean;
  questions: {
    question: string;
    type: QuestionType;
    options: string[];
    isRequired: boolean;
  }[];
}

export const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'short-text', label: 'Short Text' },
  { value: 'long-text', label: 'Long Text' },
  { value: 'single-choice', label: 'Single Choice' },
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'yes-no', label: 'Yes/No' },
  { value: 'date', label: 'Date' },
  { value: 'file-upload', label: 'File Upload' },
];
