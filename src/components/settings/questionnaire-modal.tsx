'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { X, Check, ChevronDown, Plus, Trash2, GripVertical } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  questionnaireSchema,
  type QuestionnaireFormData,
} from '@/lib/validations/questionnaire';
import { FormInput } from '@/components/ui/form-input';
import type { Questionnaire, QuestionType } from '@/types/questionnaire';
import { QUESTION_TYPES } from '@/types/questionnaire';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaire?: Questionnaire | null;
  onSave: (data: QuestionnaireFormData) => Promise<void>;
}

export function QuestionnaireModal({
  isOpen,
  onClose,
  questionnaire,
  onSave,
}: QuestionnaireModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: questionnaire
      ? {
          name: questionnaire.name,
          description: questionnaire.description || '',
          isRequired: questionnaire.isRequired,
          questions: questionnaire.questions.map((q) => ({
            question: q.question,
            type: q.type,
            options: q.options,
            isRequired: q.isRequired,
          })),
        }
      : {
          name: '',
          description: '',
          isRequired: false,
          questions: [
            {
              question: '',
              type: 'short-text' as QuestionType,
              options: [],
              isRequired: false,
            },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: QuestionnaireFormData) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
      toast.success(
        questionnaire
          ? 'Questionnaire updated successfully'
          : 'Questionnaire created successfully'
      );
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to save questionnaire');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const addQuestion = () => {
    append({
      question: '',
      type: 'short-text',
      options: [],
      isRequired: false,
    });
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    {questionnaire ? 'Edit Questionnaire' : 'Create Questionnaire'}
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormInput
                      label="Questionnaire Name"
                      error={errors.name?.message}
                      required
                    >
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="e.g., Pre-screening Questions"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      />
                    </FormInput>

                    <FormInput
                      label="Description"
                      error={errors.description?.message}
                    >
                      <textarea
                        {...register('description')}
                        rows={2}
                        placeholder="Optional description"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      />
                    </FormInput>

                    <div className="flex items-center">
                      <input
                        {...register('isRequired')}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Required for all applications
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Questions <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={addQuestion}
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Question
                      </button>
                    </div>

                    {errors.questions?.root && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions.root.message}
                      </p>
                    )}

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {fields.map((field, index) => (
                        <QuestionField
                          key={field.id}
                          index={index}
                          register={register}
                          control={control}
                          watch={watch}
                          setValue={setValue}
                          errors={errors}
                          onRemove={() => remove(index)}
                          canRemove={fields.length > 1}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
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
                        : questionnaire
                        ? 'Update Questionnaire'
                        : 'Create Questionnaire'}
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

interface QuestionFieldProps {
  index: number;
  register: any;
  control: any;
  watch: any;
  setValue: any;
  errors: any;
  onRemove: () => void;
  canRemove: boolean;
}

function QuestionField({
  index,
  register,
  control,
  watch,
  setValue,
  errors,
  onRemove,
  canRemove,
}: QuestionFieldProps) {
  const questionType = watch(`questions.${index}.type`);
  const needsOptions = questionType === 'single-choice' || questionType === 'multiple-choice';

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const addOption = () => {
    appendOption('');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <GripVertical className="h-5 w-5 text-gray-400 mt-2 cursor-move" />
        
        <div className="flex-1 space-y-3">
          <div>
            <input
              {...register(`questions.${index}.question`)}
              type="text"
              placeholder="Enter your question"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
            {errors.questions?.[index]?.question && (
              <p className="mt-1 text-sm text-red-600">
                {errors.questions[index].question.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Listbox
                value={questionType}
                onChange={(value) => setValue(`questions.${index}.type`, value)}
              >
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {QUESTION_TYPES.find((t) => t.value === questionType)?.label}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {QUESTION_TYPES.map((type) => (
                        <Listbox.Option
                          key={type.value}
                          value={type.value}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {type.label}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                  <Check className="h-5 w-5" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="flex items-center">
              <input
                {...register(`questions.${index}.isRequired`)}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
              />
              <label className="ml-2 block text-sm text-gray-700">Required</label>
            </div>
          </div>

          {needsOptions && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Options</label>
                <button
                  type="button"
                  onClick={addOption}
                  className="text-xs font-medium text-teal-600 hover:text-teal-700"
                >
                  + Add Option
                </button>
              </div>
              {optionFields.map((field, optionIndex) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input
                    {...register(`questions.${index}.options.${optionIndex}`)}
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                  {optionFields.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(optionIndex)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              {errors.questions?.[index]?.options && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.questions[index].options.message}
                </p>
              )}
            </div>
          )}
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-400 hover:text-red-600 mt-2"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
