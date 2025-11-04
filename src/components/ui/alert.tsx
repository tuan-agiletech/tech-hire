import { AlertTriangle } from 'lucide-react'

interface AlertProps {
  variant?: 'warning' | 'info' | 'error' | 'success'
  title: string
  description: string | React.ReactNode
}

export default function Alert({ variant = 'info', title, description }: AlertProps) {
  const variants = {
    warning: {
      container: 'bg-yellow-50',
      icon: 'text-yellow-400',
      title: 'text-yellow-800',
      description: 'text-yellow-700',
    },
    info: {
      container: 'bg-blue-50',
      icon: 'text-blue-400',
      title: 'text-blue-800',
      description: 'text-blue-700',
    },
    error: {
      container: 'bg-red-50',
      icon: 'text-red-400',
      title: 'text-red-800',
      description: 'text-red-700',
    },
    success: {
      container: 'bg-green-50',
      icon: 'text-green-400',
      title: 'text-green-800',
      description: 'text-green-700',
    },
  }

  const styles = variants[variant]

  return (
    <div className={`rounded-md p-4 ${styles.container}`}>
      <div className="flex">
        <div className="shrink-0">
          <AlertTriangle className={`size-5 ${styles.icon}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          <div className={`mt-2 text-sm ${styles.description}`}>
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        </div>
      </div>
    </div>
  )
}