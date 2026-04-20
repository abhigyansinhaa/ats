import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'

export default function MyApplications() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/applications/me')
      .then((r) => setItems(r.data))
      .catch((e) => setError(e.response?.data?.error || e.message))
  }, [])

  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">My applications</h1>
      <ul className="mt-6 space-y-3">
        {items.length === 0 ? (
          <li className="text-slate-500">No applications yet.</li>
        ) : (
          items.map((a) => (
            <li
              key={a.id}
              className="border border-slate-200 rounded-lg p-4 bg-white flex flex-wrap justify-between gap-2"
            >
              <div>
                <Link to={`/jobs/${a.jobId}`} className="font-medium text-brand-900 hover:underline">
                  {a.jobTitle}
                </Link>
                <p className="text-sm text-slate-600">{a.company}</p>
              </div>
              <span className="text-sm font-medium px-2 py-1 rounded bg-slate-100 text-slate-800">
                {a.status}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
