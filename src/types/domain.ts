export interface Domain {
  id: string;
  domain: string;
  status: 'pending' | 'verified' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface DomainFormData {
  domain: string;
}

export interface SubdomainFormData {
  subdomain: string;
}
