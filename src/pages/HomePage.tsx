import { Navigate } from 'react-router-dom'

export default function HomePage() {
  // Redirect to dashboard by default
  return <Navigate to="/dashboard" replace />
}
