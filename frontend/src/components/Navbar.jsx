import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? 'bg-brand-700 text-white' : 'text-slate-700 hover:bg-slate-100'
  }`

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 py-3">
        <Link to="/" className="text-xl font-bold text-brand-900">
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
              <span className="text-sm text-slate-600 hidden sm:inline">
                {user.name} <span className="text-slate-400">({user.role})</span>
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-sm px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-1.5 rounded-md bg-brand-600 text-white hover:bg-brand-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
