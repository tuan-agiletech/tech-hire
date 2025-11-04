'use client';

import { useState } from 'react';
import CustomDomainSection from '@/components/settings/custom-domain-section';
import SubdomainForm from '@/components/settings/subdomain-form';

export default function DomainsPage() {
  const [subdomain, setSubdomain] = useState('your-company');

  const handleUpdateSubdomain = (newSubdomain: string) => {
    setSubdomain(newSubdomain);
    // In a real app, this would make an API call to update the subdomain
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Domains</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure your career page domain settings
        </p>
      </div>

      <CustomDomainSection />
      <SubdomainForm
        currentSubdomain={subdomain}
        onUpdate={handleUpdateSubdomain}
      />
    </div>
  );
}
