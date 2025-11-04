import { HelpCircle } from 'lucide-react';
import type { Integration } from '@/types/integration';
import { Link } from 'react-router-dom';

const ASSESSMENT_INTEGRATIONS: Integration[] = [
  {
    id: 'coderbyte',
    name: 'Coderbyte',
    logo: '/images/coderbyte@2x-IB6ST3WT.png',
    description: 'Technical assessment platform',
    isConnected: false,
    isAvailable: true,
    category: 'assessment',
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    logo: '/images/hackerrank@2x-HUD4AVAW.png',
    description: 'Coding challenges and assessments',
    isConnected: false,
    isAvailable: false,
    category: 'assessment',
  },
  {
    id: 'codility',
    name: 'Codility',
    logo: '/images/codility@2x-LDLJMZMH.png',
    description: 'Developer screening platform',
    isConnected: false,
    isAvailable: false,
    category: 'assessment',
  },
  {
    id: 'coderpad',
    name: 'CoderPad',
    logo: '/images/coderpad@2x-HLY53QBE.png',
    description: 'Technical interview platform',
    isConnected: false,
    isAvailable: false,
    category: 'assessment',
  },
  {
    id: 'codesignal',
    name: 'CodeSignal',
    logo: '/images/codesignal@2x-ZU6XY7JW.png',
    description: 'Skills-based assessment',
    isConnected: false,
    isAvailable: false,
    category: 'assessment',
  },
];

export default function IntegrationsPage() {
  const handleRequestIntegration = () => {
    alert('Integration request feature coming soon!');
  };

  return (
    <div className="space-y-6">
      <section aria-labelledby="integrations-heading">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div className="flex items-center">
              <div className="flex-auto">
                <h2
                  id="integrations-heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Assessment Integrations
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Connect with external systems to automate your hiring processes.
                </p>
              </div>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {ASSESSMENT_INTEGRATIONS.map((integration) => (
                <li
                  key={integration.id}
                  className={`relative col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center border border-gray-200 ${
                    integration.isAvailable
                      ? 'hover:border-teal-500 transition-colors'
                      : 'opacity-50'
                  }`}
                >
                  {integration.isAvailable ? (
                    <Link
                      to={`/settings/integrations/${integration.id}`}
                      className="block"
                    >
                      <div className="flex flex-1 flex-col p-8">
                        <img
                          className="mx-auto h-14 shrink-0 object-contain"
                          src={integration.logo}
                          alt={integration.name}
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-1 flex-col p-8">
                      <img
                        className="mx-auto h-14 shrink-0 object-contain grayscale"
                        src={integration.logo}
                        alt={integration.name}
                      />
                    </div>
                  )}
                </li>
              ))}

              <li className="relative col-span-1 rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <button
                  onClick={handleRequestIntegration}
                  className="flex flex-1 flex-col p-8 pb-4 w-full"
                >
                  <HelpCircle className="mx-auto h-8 shrink-0 text-gray-400" />
                  <div className="mt-2 flex items-center justify-center text-xs font-medium text-gray-600">
                    <span>Request integration</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}