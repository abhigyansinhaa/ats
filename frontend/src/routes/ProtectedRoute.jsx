import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-fg-muted">
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand-400"
          aria-hidden
        />
        <span className="text-sm font-mono">Loading…</span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: 'protected' }} />
  }

  if (roles && roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
