'use client';

import { Crown } from 'lucide-react';

export default function CustomDomainSection() {
  const hasFullAccess = false; // Mock - would come from subscription

  const handleConfigureDomain = () => {
    if (!hasFullAccess) {
      alert('Please upgrade your plan to use custom domains');
      return;
    }
    // Handle domain configuration
  };

  return (
    <section aria-labelledby="custom-domain-heading">
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="bg-white px-4 py-6 sm:p-6">
          <div>
            <h2
              id="custom-domain-heading"
              className="text-lg font-medium leading-6 text-gray-900 inline-flex items-center space-x-2"
            >
              <span>Custom domain</span>
              {!hasFullAccess && (
                <span className="ml-1 inline-flex items-center gap-x-1.5 rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                  <Crown className="w-3 h-3" />
                  <span>Upgrade required</span>
                </span>
              )}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your career page is always available on{' '}
              <a
                className="text-teal-700 hover:underline"
                target="_blank"
                rel="noreferrer nofollow"
                href="https://your-company.jobs.growhire.com"
              >
                your-company.jobs.growhire.com
              </a>
              .
            </p>
            <p className="mt-1 text-sm text-gray-500">
              You can also point a custom domain you own to this page.
            </p>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleConfigureDomain}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Configure domain
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
