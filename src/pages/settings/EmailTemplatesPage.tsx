import { useState } from 'react';
import { EmailTemplatesTable } from '@/components/settings/email-templates-table';
import { EmailTemplateModal } from '@/components/settings/email-template-modal';
import type { EmailTemplate } from '@/types/email-template';
import type { EmailTemplateFormData } from '@/lib/validations/email-template';

// Mock data - replace with actual API call
const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    organizationId: 'org1',
    name: 'Application Confirmation',
    subject: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Thank you for applying to ' },
            { type: 'variableNode', attrs: { var: 'ORGANIZATION_NAME' } },
          ],
        },
      ],
    },
    body: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Dear ' },
            { type: 'variableNode', attrs: { var: 'CANDIDATE_FIRST_NAME' } },
            { type: 'text', text: ',' },
          ],
        },
        { type: 'paragraph' },
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Your application for the position of ' },
            { type: 'variableNode', attrs: { var: 'JOB_POSTING_TITLE' } },
            { type: 'text', text: ' has been received.' },
          ],
        },
        { type: 'paragraph' },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Thank you,' }],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'The ' },
            { type: 'variableNode', attrs: { var: 'ORGANIZATION_NAME' } },
            { type: 'text', text: ' Hiring Team' },
          ],
        },
      ],
    },
    from: '',
    fromName: '',
    cc: [],
    replyTo: [],
    type: 'application-confirmation',
    isEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(
    null
  );

  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setIsModalOpen(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleSaveTemplate = async (data: EmailTemplateFormData) => {
    // TODO: Replace with actual API call
    console.log('Saving template:', data);
    
    if (selectedTemplate) {
      // Update existing template
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === selectedTemplate.id
            ? {
                ...t,
                name: data.name,
                type: data.type,
                fromName: data.fromName || '',
                isEnabled: data.isEnabled,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
    } else {
      // Create new template
      const newTemplate: EmailTemplate = {
        id: Math.random().toString(),
        organizationId: 'org1',
        name: data.name,
        subject: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: data.subject }],
            },
          ],
        },
        body: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: data.body }],
            },
          ],
        },
        from: '',
        fromName: data.fromName || '',
        cc: [],
        replyTo: [],
        type: data.type,
        isEnabled: data.isEnabled,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTemplates((prev) => [...prev, newTemplate]);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleToggleTemplate = async (templateId: string, isEnabled: boolean) => {
    // TODO: Replace with actual API call
    console.log('Toggling template:', templateId, isEnabled);
    
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === templateId
          ? { ...t, isEnabled, updatedAt: new Date().toISOString() }
          : t
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <section aria-labelledby="email-templates-heading">
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="bg-white px-4 py-6 sm:p-6">
          <div className="flex items-center">
            <div className="flex-auto">
              <h2
                id="email-templates-heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Email Templates
              </h2>
              <p className="mt-1 text-sm text-gray-500"></p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                onClick={handleAddTemplate}
                className="block rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Add Email Template
              </button>
            </div>
          </div>

          <EmailTemplatesTable
            templates={templates}
            onEdit={handleEditTemplate}
            onToggle={handleToggleTemplate}
          />
        </div>
      </div>

      <EmailTemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={selectedTemplate}
        onSave={handleSaveTemplate}
      />
    </section>
  );
}
