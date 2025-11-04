import { z } from "zod";

export const customFieldSchema = z.object({
  name: z
    .string()
    .min(1, "Field name is required")
    .min(2, "Field name must be at least 2 characters")
    .max(100, "Field name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9\s_-]+$/,
      "Field name can only contain letters, numbers, spaces, hyphens and underscores"
    ),
  type: z
    .enum([
      "text",
      "textarea",
      "number",
      "date",
      "select",
      "multiselect",
      "checkbox",
      "url",
      "email",
    ])
    .refine((val) => !!val, { message: "Please select a field type" }),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  required: z.boolean().default(false).catch(false),
  options: z.array(z.string().min(1)).default([]).catch([]),
});

export type CustomFieldFormData = z.infer<typeof customFieldSchema>;

// Validation based on field type
export const customFieldSchemaWithConditionals = customFieldSchema.refine(
  (data) => {
    if (data.type === "select" || data.type === "multiselect") {
      return data.options && data.options.length > 0;
    }
    return true;
  },
  {
    message: "Options are required for select and multiselect fields",
    path: ["options"],
  }
);
