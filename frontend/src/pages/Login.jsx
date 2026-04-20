import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const u = await login(email, password)
      if (u.role === 'ADMIN') navigate('/admin')
      else if (u.role === 'RECRUITER') navigate('/recruiter')
      else navigate('/jobs')
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="panel">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Welcome back</p>
        <h1 className="page-title mt-2">Log in</h1>
        <p className="text-fg-muted text-sm mt-1">Sign in with your work email and password.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <div className="alert-error">{error}</div>}
          <div>
            <label className="label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-sm text-fg-muted">
          No account?{' '}
          <Link to="/register" className="link-brand">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
