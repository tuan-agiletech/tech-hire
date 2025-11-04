import { FolderPlus, Plus } from 'lucide-react';

interface QuestionnairesEmptyStateProps {
  onCreateQuestionnaire: () => void;
}

export function QuestionnairesEmptyState({
  onCreateQuestionnaire,
}: QuestionnairesEmptyStateProps) {
  return (
    <div className="text-center">
      <FolderPlus className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1.5} />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        No Questionnaires
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Define Questionnaires to collect information from candidates during the
        application process.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onCreateQuestionnaire}
          className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
          Create Questionnaire
        </button>
      </div>
    </div>
  );
}
