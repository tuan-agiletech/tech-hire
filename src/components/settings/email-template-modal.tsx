import { Fragment, useState } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { X, Check, ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  emailTemplateSchema,
  type EmailTemplateFormData,
} from '@/lib/validations/email-template';
import { FormInput } from '@/components/ui/form-input';
import type { EmailTemplate, EmailTemplateType } from '@/types/email-template';

interface EmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: EmailTemplate | null;
  onSave: (data: EmailTemplateFormData) => Promise<void>;
}

const TEMPLATE_TYPES: { value: EmailTemplateType; label: string }[] = [
  { value: 'application-confirmation', label: 'Application Confirmation' },
  { value: 'interview-invitation', label: 'Interview Invitation' },
  { value: 'interview-reminder', label: 'Interview Reminder' },
  { value: 'rejection', label: 'Rejection' },
  { value: 'offer', label: 'Offer' },
  { value: 'custom', label: 'Custom' },
];

export function EmailTemplateModal({
  isOpen,
  onClose,
  template,
  onSave,
}: EmailTemplateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: template
      ? {
          name: template.name,
          subject: extractTextFromContent(template.subject),
          body: extractTextFromContent(template.body),
          fromName: template.fromName,
          type: template.type,
          isEnabled: template.isEnabled,
        }
      : {
          name: '',
          subject: '',
          body: '',
          fromName: '',
          type: 'custom',
          isEnabled: true,
        },
  });

  const selectedType = watch('type');

  const onSubmit = async (data: EmailTemplateFormData) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
      toast.success(
        template ? 'Template updated successfully' : 'Template created successfully'
      );
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to save template');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    {template ? 'Edit Email Template' : 'Add Email Template'}
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormInput
                    label="Template Name"
                    error={errors.name?.message}
                    required
                  >
                    <input
                      {...register('name')}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                  </FormInput>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Template Type <span className="text-red-500">*</span>
                    </label>
                    <Listbox
                      value={selectedType}
                      onChange={(value) => setValue('type', value)}
                    >
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6">
                          <span className="block truncate">
                            {
                              TEMPLATE_TYPES.find((t) => t.value === selectedType)
                                ?.label
                            }
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDown
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {TEMPLATE_TYPES.map((type) => (
                              <Listbox.Option
                                key={type.value}
                                value={type.value}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? 'bg-teal-100 text-teal-900'
                                      : 'text-gray-900'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {type.label}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                        <Check className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  <FormInput
                    label="From Name"
                    error={errors.fromName?.message}
                  >
                    <input
                      {...register('fromName')}
                      type="text"
                      placeholder="Your Company Name"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                  </FormInput>

                  <FormInput
                    label="Subject"
                    error={errors.subject?.message}
                    required
                  >
                    <input
                      {...register('subject')}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                  </FormInput>

                  <FormInput label="Body" error={errors.body?.message} required>
                    <textarea
                      {...register('body')}
                      rows={8}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                  </FormInput>

                  <div className="flex items-center">
                    <input
                      {...register('isEnabled')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Enable this template
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? 'Saving...'
                        : template
                        ? 'Update Template'
                        : 'Create Template'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// Helper function to extract text from email template content
function extractTextFromContent(content: any): string {
  if (!content || !content.content) return '';
  
  return content.content
    .map((node: any) => {
      if (!node.content) return '';
      return node.content
        .map((item: any) => {
          if (item.text) return item.text;
          if (item.attrs?.var) return `{{${item.attrs.var}}}`;
          return '';
        })
        .join('');
    })
    .join('\n');
}
