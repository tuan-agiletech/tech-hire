import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner'

const INTEGRATION_DETAILS: Record<
  string,
  {
    name: string;
    logo: string;
    description: string;
  }
> = {
  coderbyte: {
    name: 'Coderbyte',
    logo: '/images/coderbyte-avatar-K2RJLVCA.png',
    description:
      'Click the button below to connect your Coderbyte account. You will be redirected to your Coderbyte dashboard.',
  },
  hackerrank: {
    name: 'HackerRank',
    logo: '/integrations/hackerrank.png',
    description:
      'Connect your HackerRank account to automatically send coding assessments to candidates.',
  },
  codility: {
    name: 'Codility',
    logo: '/integrations/codility.png',
    description:
      'Integrate Codility to streamline your technical screening process.',
  },
};

export default function IntegrationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isConnected, setIsConnected] = useState(false);

  const integration = INTEGRATION_DETAILS[slug];

  if (!integration) {
    return (
      <div className="space-y-6">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <p className="text-sm text-gray-500">Integration not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleConnect = () => {
    // In a real app, this would redirect to OAuth or initiate connection
    toast.success(`Connecting to ${integration.name}...`);
    setTimeout(() => {
      setIsConnected(true);
      toast.success(`Successfully connected to ${integration.name}!`);
    }, 1000);
  };

  const handleDisconnect = () => {
    if (confirm(`Are you sure you want to disconnect ${integration.name}?`)) {
      setIsConnected(false);
      toast.success(`Disconnected from ${integration.name}`);
    }
  };

  return (
    <div className="space-y-6">
      <section aria-labelledby="integration-heading">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div>
              <h2
                id="integration-heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {integration.name} integration
              </h2>
            </div>

            <div className="flex justify-between items-start mt-6">
              <div className="flex-1">
                <div className="max-w-xl text-sm text-gray-500">
                  <p>{integration.description}</p>
                </div>

                <div className="mt-5">
                  {!isConnected ? (
                    <button
                      type="button"
                      onClick={handleConnect}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Connect {integration.name}
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Connected</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleDisconnect}
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-6">
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}