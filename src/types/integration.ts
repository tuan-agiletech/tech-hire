export interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  isConnected: boolean;
  isAvailable: boolean;
  category: 'assessment' | 'ats' | 'calendar' | 'communication';
}
