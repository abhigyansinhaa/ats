import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-slate-500">Loading…</div>
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
