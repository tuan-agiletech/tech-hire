import { Pencil, Trash2 } from 'lucide-react';
import type { Questionnaire } from '@/types/questionnaire';
import { toast } from 'sonner';
import { useState } from 'react';

interface QuestionnairesListProps {
  questionnaires: Questionnaire[];
  onEdit: (questionnaire: Questionnaire) => void;
  onDelete: (questionnaireId: string) => Promise<void>;
}

export function QuestionnairesList({
  questionnaires,
  onEdit,
  onDelete,
}: QuestionnairesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this questionnaire?')) {
      return;
    }

    setDeletingId(id);
    try {
      await onDelete(id);
      toast.success('Questionnaire deleted successfully');
    } catch (error) {
      toast.error('Failed to delete questionnaire');
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Questions
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {questionnaires.map((questionnaire) => (
                <tr key={questionnaire.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 lg:pl-8">
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-900">
                        {questionnaire.name}
                      </div>
                      {questionnaire.description && (
                        <div className="text-sm text-gray-500">
                          {questionnaire.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {questionnaire.questions.length}{' '}
                    {questionnaire.questions.length === 1 ? 'question' : 'questions'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {questionnaire.isRequired ? (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        Optional
                      </span>
                    )}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => onEdit(questionnaire)}
                        className="text-slate-600 hover:text-slate-900"
                      >
                        <Pencil className="w-5 h-5" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(questionnaire.id)}
                        disabled={deletingId === questionnaire.id}
                        className="text-slate-600 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
