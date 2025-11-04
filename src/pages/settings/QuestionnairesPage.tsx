'use client';

import { useState } from 'react';
import { QuestionnairesEmptyState } from '@/components/settings/questionnaires-empty-state';
import { QuestionnairesList } from '@/components/settings/questionnaires-list';
import { QuestionnaireModal } from '@/components/settings/questionnaire-modal';
import type { Questionnaire } from '@/types/questionnaire';
import type { QuestionnaireFormData } from '@/lib/validations/questionnaire';

// Mock data - replace with actual API call
const mockQuestionnaires: Questionnaire[] = [];

export default function QuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>(mockQuestionnaires);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);

  const handleCreateQuestionnaire = () => {
    setSelectedQuestionnaire(null);
    setIsModalOpen(true);
  };

  const handleEditQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setIsModalOpen(true);
  };

  const handleSaveQuestionnaire = async (data: QuestionnaireFormData) => {
    // TODO: Replace with actual API call
    console.log('Saving questionnaire:', data);

    if (selectedQuestionnaire) {
      // Update existing questionnaire
      setQuestionnaires((prev) =>
        prev.map((q) =>
          q.id === selectedQuestionnaire.id
            ? {
                ...q,
                name: data.name,
                description: data.description || null,
                isRequired: data.isRequired,
                questions: data.questions.map((question, index) => ({
                  id: q.questions[index]?.id || Math.random().toString(),
                  questionnaireId: q.id,
                  question: question.question,
                  type: question.type,
                  options: question.options,
                  isRequired: question.isRequired,
                  order: index,
                  createdAt: q.questions[index]?.createdAt || new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                })),
                updatedAt: new Date().toISOString(),
              }
            : q
        )
      );
    } else {
      // Create new questionnaire
      const newQuestionnaire: Questionnaire = {
        id: Math.random().toString(),
        organizationId: 'org1',
        name: data.name,
        description: data.description || null,
        isRequired: data.isRequired,
        questions: data.questions.map((question, index) => ({
          id: Math.random().toString(),
          questionnaireId: Math.random().toString(),
          question: question.question,
          type: question.type,
          options: question.options,
          isRequired: question.isRequired,
          order: index,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setQuestionnaires((prev) => [...prev, newQuestionnaire]);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleDeleteQuestionnaire = async (questionnaireId: string) => {
    // TODO: Replace with actual API call
    console.log('Deleting questionnaire:', questionnaireId);

    setQuestionnaires((prev) => prev.filter((q) => q.id !== questionnaireId));

    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <section aria-labelledby="questionnaires-heading">
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="bg-white px-4 py-6 sm:p-6">
          <div className="flex items-center">
            <div className="flex-auto">
              <h2
                id="questionnaires-heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Questionnaires
              </h2>
              <p className="mt-1 text-sm text-gray-500"></p>
            </div>
            {questionnaires.length > 0 && (
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={handleCreateQuestionnaire}
                  className="block rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Create Questionnaire
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                {questionnaires.length === 0 ? (
                  <QuestionnairesEmptyState
                    onCreateQuestionnaire={handleCreateQuestionnaire}
                  />
                ) : (
                  <QuestionnairesList
                    questionnaires={questionnaires}
                    onEdit={handleEditQuestionnaire}
                    onDelete={handleDeleteQuestionnaire}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuestionnaireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        questionnaire={selectedQuestionnaire}
        onSave={handleSaveQuestionnaire}
      />
    </section>
  );
}
