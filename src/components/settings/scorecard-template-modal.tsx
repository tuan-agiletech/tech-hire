'use client'

import { Fragment } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { X, Plus, Trash2, GripVertical, ChevronDown, Check } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { scorecardTemplateSchema, type ScorecardTemplateFormData } from '@/lib/validations/scorecard'
import { AttributeType } from '@/types/scorecard'
import { FormInput } from '@/components/ui/form-input'

interface ScorecardTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ScorecardTemplateFormData) => void
  initialData?: ScorecardTemplateFormData
}

const attributeTypeOptions = [
  { value: AttributeType.RATING, label: 'Rating (1-5)' },
  { value: AttributeType.YES_NO, label: 'Yes/No' },
  { value: AttributeType.TEXT, label: 'Text' },
  { value: AttributeType.SINGLE_SELECT, label: 'Single Select' },
  { value: AttributeType.MULTI_SELECT, label: 'Multi Select' }
]

function AttributeField({
  index,
  control,
  register,
  watch,
  remove,
  errors
}: any) {
  const attributeType = watch(`attributes.${index}.type`)
  const showOptions = attributeType === AttributeType.SINGLE_SELECT || attributeType === AttributeType.MULTI_SELECT

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: `attributes.${index}.options`
  })

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-2">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Attribute Name"
              required
              error={errors.attributes?.[index]?.name?.message}
            >
              <input
                type="text"
                {...register(`attributes.${index}.name`)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                placeholder="e.g., Technical Skills"
              />
            </FormInput>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <Listbox
                value={attributeType}
                onChange={(value) => {
                  register(`attributes.${index}.type`).onChange({ target: { value } })
                }}
              >
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {attributeTypeOptions.find(opt => opt.value === attributeType)?.label || 'Select type'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {attributeTypeOptions.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-9 ${
                              active ? 'bg-teal-600 text-white' : 'text-gray-900'
                            }`
                          }
                          value={option.value}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                {option.label}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
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
              {errors.attributes?.[index]?.type && (
                <p className="mt-1 text-sm text-red-600">{errors.attributes[index].type.message}</p>
              )}
            </div>
          </div>

          {showOptions && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => appendOption('')}
                  className="text-sm text-teal-600 hover:text-teal-500 font-medium"
                >
                  + Add Option
                </button>
              </div>
              <div className="space-y-2">
                {optionFields.map((field, optionIndex) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      type="text"
                      {...register(`attributes.${index}.options.${optionIndex}`)}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(optionIndex)}
                      className="shrink-0 text-red-600 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.attributes?.[index]?.options && (
                <p className="mt-1 text-sm text-red-600">{errors.attributes[index].options.message}</p>
              )}
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register(`attributes.${index}.isRequired`)}
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
            />
            <label className="ml-2 text-sm text-gray-700">
              Required attribute
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={() => remove(index)}
          className="shrink-0 text-red-600 hover:text-red-500"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export function ScorecardTemplateModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: ScorecardTemplateModalProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(scorecardTemplateSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      attributes: [
        {
          name: '',
          type: AttributeType.RATING,
          options: [],
          isRequired: false
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes'
  })

  const handleFormSubmit = (data: ScorecardTemplateFormData) => {
    onSubmit(data)
    reset()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      {initialData ? 'Edit Scorecard Template' : 'Create Scorecard Template'}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-6">
                      <FormInput
                        label="Template Name"
                        required
                        error={errors.name?.message}
                      >
                        <input
                          type="text"
                          {...register('name')}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          placeholder="e.g., Technical Interview Scorecard"
                        />
                      </FormInput>

                      <FormInput
                        label="Description"
                        error={errors.description?.message}
                      >
                        <textarea
                          {...register('description')}
                          rows={2}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          placeholder="Brief description of this scorecard template"
                        />
                      </FormInput>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-900">
                            Attributes <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              append({
                                name: '',
                                type: AttributeType.RATING,
                                options: [],
                                isRequired: false
                              })
                            }
                            className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-500"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Attribute
                          </button>
                        </div>

                        <div className="space-y-3">
                          {fields.map((field, index) => (
                            <AttributeField
                              key={field.id}
                              index={index}
                              control={control}
                              register={register}
                              watch={watch}
                              remove={remove}
                              errors={errors}
                            />
                          ))}
                        </div>

                        {errors.attributes && typeof errors.attributes.message === 'string' && (
                          <p className="mt-2 text-sm text-red-600">{errors.attributes.message}</p>
                        )}
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:w-auto"
                        >
                          {initialData ? 'Save Changes' : 'Create Template'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
