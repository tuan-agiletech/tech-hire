import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import CandidatesPage from './pages/CandidatesPage'
import JobsPage from './pages/JobsPage'
import InterviewsPage from './pages/InterviewsPage'
import WorkflowsPage from './pages/WorkflowsPage'
import SettingsPageLayout from './pages/SettingsPageLayout'
import ProfilePage from './pages/settings/ProfilePage'
import OrganizationPage from './pages/settings/OrganizationPage'
import DepartmentsPage from './pages/settings/DepartmentsPage'
import LocationsPage from './pages/settings/LocationsPage'
import CustomFieldsPage from './pages/settings/CustomFieldsPage'
import ScorecardTemplatesPage from './pages/settings/ScorecardTemplatesPage'
import QuestionnairesPage from './pages/settings/QuestionnairesPage'
import EmailsPage from './pages/settings/EmailsPage'
import EmailTemplatesPage from './pages/settings/EmailTemplatesPage'
import IntegrationsPage from './pages/settings/IntegrationsPage'
import IntegrationDetailPage from './pages/settings/IntegrationDetailPage'
import BillingPage from './pages/settings/BillingPage'
import DomainsPage from './pages/settings/DomainsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/candidates',
    element: <CandidatesPage />,
  },
  {
    path: '/jobs',
    element: <JobsPage />,
  },
  {
    path: '/interviews',
    element: <InterviewsPage />,
  },
  {
    path: '/workflows',
    element: <WorkflowsPage />,
  },
  {
    path: '/settings',
    element: <SettingsPageLayout />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'organization',
        element: <OrganizationPage />,
      },
      {
        path: 'departments',
        element: <DepartmentsPage />,
      },
      {
        path: 'locations',
        element: <LocationsPage />,
      },
      {
        path: 'custom-fields',
        element: <CustomFieldsPage />,
      },
      {
        path: 'scorecard-templates',
        element: <ScorecardTemplatesPage />,
      },
      {
        path: 'questionnaires',
        element: <QuestionnairesPage />,
      },
      {
        path: 'emails',
        element: <EmailsPage />,
      },
      {
        path: 'email-templates',
        element: <EmailTemplatesPage />,
      },
      {
        path: 'integrations',
        element: <IntegrationsPage />,
      },
      {
        path: 'integrations/:slug',
        element: <IntegrationDetailPage />,
      },
      {
        path: 'billing',
        element: <BillingPage />,
      },
      {
        path: 'domains',
        element: <DomainsPage />,
      },
    ],
  },
])
