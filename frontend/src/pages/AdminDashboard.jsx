import { useEffect, useState } from 'react'
import api from '../services/api.js'

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('RECRUITER')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((r) => setData(r.data))
      .catch((e) => setError(e.response?.data?.error || e.message))
  }, [])

  async function createUser(e) {
    e.preventDefault()
    setMsg('')
    setError('')
    try {
      await api.post('/admin/users', { name, email, password, role })
      setMsg('User created (token returned for convenience in API).')
      const dash = await api.get('/admin/dashboard')
      setData(dash.data)
    } catch (err) {
      setError(err.response?.data?.error || JSON.stringify(err.response?.data) || err.message)
    }
  }

  if (error && !data) return <p className="alert-error inline-block">{error}</p>
  if (!data) {
    return (
      <div className="flex items-center gap-3 text-fg-muted py-12">
        <span
          className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-brand-400"
          aria-hidden
        />
        <span className="font-mono text-sm">Loading…</span>
      </div>
    )
  }

  const statCards = [
    { label: 'Users', value: data.totalUsers },
    { label: 'Jobs', value: data.totalJobs },
    { label: 'Applications', value: data.totalApplications },
    { label: 'Candidates', value: data.candidates },
    { label: 'Recruiters', value: data.recruiters },
    { label: 'Admins', value: data.admins },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Admin</p>
        <h1 className="page-title mt-1">Dashboard</h1>
        {error && <p className="mt-3 alert-error">{error}</p>}
        <dl className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="panel-muted">
              <dt className="text-xs font-mono text-muted uppercase tracking-wide">{s.label}</dt>
              <dd className="mt-2 font-display text-2xl font-semibold text-fg">{s.value}</dd>
            </div>
          ))}
        </dl>
        <h2 className="font-display text-lg font-semibold mt-10 text-fg">Applications by status</h2>
        <ul className="mt-3 text-sm text-fg-muted font-mono space-y-1">
          {Object.entries(data.applicationsByStatus || {}).map(([k, v]) => (
            <li key={k}>
              <span className="text-brand-400">{k}</span>: {v}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border pt-10">
        <h2 className="font-display text-lg font-semibold text-fg">Create user</h2>
        <p className="text-sm text-fg-muted mt-1">
          Create recruiter or admin accounts (or additional candidates).
        </p>
        {msg && <p className="alert-success mt-4">{msg}</p>}
        <form onSubmit={createUser} className="mt-6 panel space-y-3 max-w-md">
          <input
            className="input-field"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <select className="select-field w-full" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="RECRUITER">RECRUITER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CANDIDATE">CANDIDATE</option>
          </select>
          <button type="submit" className="btn-dark w-full justify-center sm:w-auto">
            Create user
          </button>
        </form>
      </div>
    </div>
  )
}
