import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subdomainSchema } from "@/lib/validations/domain";
import type { SubdomainFormData } from "@/types/domain";
import { toast } from 'sonner'

interface SubdomainFormProps {
  currentSubdomain: string;
  onUpdate: (subdomain: string) => void;
}

export default function SubdomainForm({
  currentSubdomain,
  onUpdate,
}: SubdomainFormProps) {
  const {
    register,
    handleSubmit,
  } = useForm<SubdomainFormData>({
    resolver: zodResolver(subdomainSchema),
    defaultValues: {
      subdomain: currentSubdomain,
    },
  });

  const onSubmit = (data: SubdomainFormData) => {
    onUpdate(data.subdomain);
    toast.success("Subdomain updated successfully");
  };

  return (
    <section aria-labelledby="subdomain-heading">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow sm:overflow-hidden sm:rounded-md"
      >
        <div className="bg-white px-4 py-6 sm:p-6">
          <div>
            <h2
              id="subdomain-heading"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Growhire subdomain
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Specify the growhire subdomain under which your career page will
              be accessible for visitors.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              <strong className="font-semibold">
                Please note that changing your subdomain to a new one will make
                the previous one to stop working. Proceed with caution.
              </strong>
            </p>
          </div>

          <div className="space-y-1 mt-8">
            <label
              htmlFor="subdomain"
              className="block text-sm font-medium text-gray-700"
            >
              Subdomain
            </label>
            <div className="flex w-2/3 items-center">
              <div className="flex-grow">
                <div className="flex rounded-md shadow-sm h-[38px]">
                  <input
                    type="text"
                    id="subdomain"
                    {...register("subdomain")}
                    className="block w-full flex-1 px-3 rounded-none rounded-l-md border-gray-300 focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                    placeholder="yourdomain"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                    .jobs.growhire.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Update subdomain
          </button>
        </div>
      </form>
    </section>
  );
}
