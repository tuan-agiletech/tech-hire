import { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type { FieldArrayPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Check, ChevronDown, Plus, Trash2 } from "lucide-react";
import {
  customFieldSchemaWithConditionals,
  type CustomFieldFormData,
} from "@/lib/validations/custom-field";
import { FormInput } from "@/components/ui/form-input";
import type { CustomField } from "@/types/custom-field";

interface CustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomFieldFormData) => Promise<void>;
  field?: CustomField | null;
}

const fieldTypes = [
  { value: "text", label: "Text (Single line)" },
  { value: "textarea", label: "Text Area (Multiple lines)" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select (Dropdown)" },
  { value: "multiselect", label: "Multi-Select" },
  { value: "checkbox", label: "Checkbox (Yes/No)" },
  { value: "url", label: "URL" },
  { value: "email", label: "Email" },
];

export default function CustomFieldModal({
  isOpen,
  onClose,
  onSubmit,
  field,
}: CustomFieldModalProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomFieldFormData>({
    resolver: zodResolver(customFieldSchemaWithConditionals) as any,
    defaultValues: field
      ? {
          name: field.name,
          type: field.type as any,
          description: field.description || "",
          required: field.required || false,
          options: field.options || [],
        }
      : {
          name: "",
          type: "text",
          description: "",
          required: false,
          options: [],
        },
  });

  const { fields, append, remove } = useFieldArray<
    CustomFieldFormData,
    FieldArrayPath<CustomFieldFormData>
  >({
    control,
    name: "options" as FieldArrayPath<CustomFieldFormData>,
  });

  const selectedType = watch("type");
  const showOptions =
    selectedType === "select" || selectedType === "multiselect";

  const handleFormSubmit = async (data: CustomFieldFormData) => {
    await onSubmit(data);
    reset();
    onClose();
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  {field ? "Edit Custom Field" : "Create Custom Field"}
                </Dialog.Title>

                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="mt-6 space-y-6"
                >
                  {/* Field Name */}
                  <FormInput
                    label="Field Name"
                    error={errors.name?.message}
                    required
                  >
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g., LinkedIn Profile, Years of Experience"
                      {...register("name")}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                  </FormInput>

                  {/* Field Type */}
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                      Field Type
                    </label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Listbox value={field.value} onChange={field.onChange}>
                          <div className="relative">
                            <Listbox.Button className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                              <span>
                                {
                                  fieldTypes.find(
                                    (t) => t.value === field.value
                                  )?.label
                                }
                              </span>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {fieldTypes.map((type) => (
                                  <Listbox.Option
                                    key={type.value}
                                    value={type.value}
                                    className={({ active }) =>
                                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-teal-100 text-teal-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
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
                      )}
                    />
                    {errors.type && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description (Optional)
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      placeholder="Add a description for this field..."
                      {...register("description")}
                      className={`mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.description
                          ? "ring-red-500 focus:ring-red-600"
                          : "ring-gray-300 focus:ring-gray-900"
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Options (for select/multiselect) */}
                  {showOptions && (
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                        Options
                      </label>
                      <div className="space-y-2">
                        {fields.map((field, index) => (
                          <div key={field.id} className="flex gap-2">
                            <input
                              type="text"
                              placeholder={`Option ${index + 1}`}
                              {...register(`options.${index}` as const)}
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => append("")}
                          className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Option
                        </button>
                      </div>
                      {errors.options && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.options.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Required Checkbox */}
                  <div className="flex items-center">
                    <input
                      id="required"
                      type="checkbox"
                      {...register("required")}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                    />
                    <label
                      htmlFor="required"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Make this field required
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-row-reverse gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? "Saving..."
                        : field
                        ? "Update Field"
                        : "Create Field"}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancel
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
