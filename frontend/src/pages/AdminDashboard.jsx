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

  if (error && !data) return <p className="text-red-600">{error}</p>
  if (!data) return <p className="text-slate-500">Loading…</p>

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-brand-900">Admin dashboard</h1>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <dt className="text-sm text-slate-500">Users</dt>
            <dd className="text-2xl font-semibold">{data.totalUsers}</dd>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <dt className="text-sm text-slate-500">Jobs</dt>
            <dd className="text-2xl font-semibold">{data.totalJobs}</dd>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <dt className="text-sm text-slate-500">Applications</dt>
            <dd className="text-2xl font-semibold">{data.totalApplications}</dd>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <dt className="text-sm text-slate-500">Candidates</dt>
            <dd className="text-2xl font-semibold">{data.candidates}</dd>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <dt className="text-sm text-slate-500">Recruiters</dt>
            <dd className="text-2xl font-semibold">{data.recruiters}</dd>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <dt className="text-sm text-slate-500">Admins</dt>
            <dd className="text-2xl font-semibold">{data.admins}</dd>
          </div>
        </dl>
        <h2 className="text-lg font-semibold mt-8">Applications by status</h2>
        <ul className="mt-2 text-sm text-slate-700">
          {Object.entries(data.applicationsByStatus || {}).map(([k, v]) => (
            <li key={k}>
              {k}: {v}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-lg font-semibold text-brand-900">Create user</h2>
        <p className="text-sm text-slate-600 mt-1">Create recruiter or admin accounts (or additional candidates).</p>
        {msg && <p className="text-green-700 text-sm mt-2">{msg}</p>}
        <form onSubmit={createUser} className="mt-4 space-y-3 max-w-md">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="RECRUITER">RECRUITER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CANDIDATE">CANDIDATE</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800"
          >
            Create user
          </button>
        </form>
      </div>
    </div>
  )
}
