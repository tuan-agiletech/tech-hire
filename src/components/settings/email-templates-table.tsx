import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Pencil } from 'lucide-react';
import type { EmailTemplate } from '@/types/email-template';
import { toast } from 'sonner';

interface EmailTemplatesTableProps {
  templates: EmailTemplate[];
  onEdit: (template: EmailTemplate) => void;
  onToggle: (templateId: string, isEnabled: boolean) => Promise<void>;
}

export function EmailTemplatesTable({
  templates,
  onEdit,
  onToggle,
}: EmailTemplatesTableProps) {
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = async (template: EmailTemplate) => {
    setTogglingId(template.id);
    try {
      await onToggle(template.id, !template.isEnabled);
      toast.success(
        `Template ${template.isEnabled ? 'disabled' : 'enabled'} successfully`
      );
    } catch (error) {
      toast.error('Failed to update template status');
      console.error(error);
    } finally {
      setTogglingId(null);
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
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 sm:w-1/3"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 sm:w-1/3"
                ></th>
                <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {templates.map((template) => (
                <tr key={template.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 w-2/3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(template)}
                        className="py-2 cursor-pointer hover:text-teal-600"
                      >
                        {template.name}
                      </button>
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8 space-x-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={template.isEnabled}
                        onChange={() => handleToggle(template)}
                        disabled={togglingId === template.id}
                        className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:opacity-50"
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute size-full rounded-md bg-white"
                        />
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out ${
                            template.isEnabled ? 'bg-teal-600' : 'bg-gray-200'
                          }`}
                        />
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute left-0 inline-block size-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
                            template.isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </Switch>
                      <span className="text-sm text-gray-500">
                        {template.isEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8 space-x-2">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => onEdit(template)}
                        className="text-slate-600 hover:text-slate-900"
                      >
                        <Pencil className="w-5 h-5" />
                        <span className="sr-only">edit</span>
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
