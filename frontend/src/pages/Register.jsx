import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(name, email, password)
      navigate('/jobs')
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

  return (
    <div className="max-w-md mx-auto">
      <div className="panel">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Candidate</p>
        <h1 className="page-title mt-2">Register</h1>
        <p className="text-fg-muted text-sm mt-1">
          This form creates a candidate account. Recruiters and admins can sign in from the login page.
        </p>
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
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-sm text-fg-muted">
          Already have an account?{' '}
          <Link to="/login" className="link-brand">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
