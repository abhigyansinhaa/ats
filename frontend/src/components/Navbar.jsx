import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-full text-sm font-medium transition ${
    isActive
      ? 'bg-raised text-fg border border-border shadow-panel'
      : 'text-fg-muted hover:text-fg hover:bg-raised/60'
  }`

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 py-3">
        <Link
          to="/"
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-fg"
        >
          <span
            className="font-mono text-brand-400 text-sm opacity-90 group-hover:opacity-100"
            aria-hidden
          >
            &gt;_
          </span>
          ATS
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/jobs" className={linkClass}>
            Jobs
          </NavLink>
          {user?.role === 'CANDIDATE' && (
            <>
              <NavLink to="/my-applications" className={linkClass}>
                My applications
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
            </>
          )}
          {(user?.role === 'RECRUITER' || user?.role === 'ADMIN') && (
            <NavLink to="/recruiter" className={linkClass}>
              Recruiter
            </NavLink>
          )}
          {user?.role === 'ADMIN' && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-xs font-mono text-fg-muted hidden sm:inline max-w-[12rem] truncate">
                {user.name}{' '}
                <span className="text-muted">· {user.role}</span>
              </span>
              <button type="button" onClick={logout} className="btn-secondary-sm">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary-sm">
                Log in
              </Link>
              <Link to="/register" className="btn-primary-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
