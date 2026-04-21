import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const ROLES = [
  {
    id: 'CANDIDATE',
    label: 'Candidate',
    blurb: 'Browse roles, apply, and track your applications.',
  },
  {
    id: 'RECRUITER',
    label: 'Recruiter',
    blurb: 'Post jobs, review applicants, and schedule interviews.',
  },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialRole = useMemo(() => {
    const param = (searchParams.get('role') || '').toUpperCase()
    return param === 'RECRUITER' ? 'RECRUITER' : 'CANDIDATE'
  }, [searchParams])

  const [role, setRole] = useState(initialRole)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setRole(initialRole)
  }, [initialRole])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const u = await register(name, email, password, role)
      if (u.role === 'RECRUITER') navigate('/recruiter')
      else navigate('/jobs')
    } catch (err) {
      const d = err.response?.data
      setError(
        typeof d === 'object' && d?.error
          ? d.error
          : typeof d === 'object'
            ? JSON.stringify(d)
            : err.message || 'Registration failed',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const active = ROLES.find((r) => r.id === role) || ROLES[0]

  return (
    <div className="max-w-md mx-auto">
      <div className="panel">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-400">
          {active.label}
        </p>
        <h1 className="page-title mt-2">Create your account</h1>
        <p className="text-fg-muted text-sm mt-1">{active.blurb}</p>

        <div
          role="tablist"
          aria-label="Account type"
          className="mt-5 grid grid-cols-2 gap-1 rounded-full border border-border bg-raised/40 p-1"
        >
          {ROLES.map((r) => {
            const selected = r.id === role
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setRole(r.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  selected
                    ? 'bg-brand-500 text-white shadow-panel'
                    : 'text-fg-muted hover:text-fg hover:bg-raised/60'
                }`}
              >
                {r.label}
              </button>
            )
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <div className="alert-error">{error}</div>}
          <div>
            <label className="label" htmlFor="reg-name">
              Name
            </label>
            <input
              id="reg-name"
              type="text"
              required
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="reg-email">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              required
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="reg-password">
              Password (min 6)
            </label>
            <input
              id="reg-password"
              type="password"
              required
              minLength={6}
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting
              ? 'Creating account…'
              : `Create ${active.label.toLowerCase()} account`}
          </button>
        </form>
        <p className="mt-6 text-sm text-fg-muted">
          Already have an account?{' '}
          <Link to="/login" className="link-brand">
            Log in
          </Link>
        </p>
        <p className="mt-2 text-xs text-muted">
          Admin accounts are provisioned only by an existing administrator.
        </p>
      </div>
    </div>
  )
}
