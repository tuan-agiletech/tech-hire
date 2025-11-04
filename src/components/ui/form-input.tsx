import { forwardRef } from "react";

interface FormInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormInput = forwardRef<HTMLDivElement, FormInputProps>(
  ({ label, error, required, children }, ref) => {
    return (
      <div ref={ref}>
        {label && (
          <label className="block text-sm font-medium leading-6 text-gray-900">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="mt-2">{children}</div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
