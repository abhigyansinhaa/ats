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

  if (error) return <p className="alert-error inline-block">{error}</p>

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Candidate</p>
      <h1 className="page-title mt-1">My applications</h1>
      <ul className="mt-8 space-y-3">
        {items.length === 0 ? (
          <li className="text-fg-muted">No applications yet.</li>
        ) : (
          items.map((a) => (
            <li
              key={a.id}
              className="panel flex flex-wrap justify-between gap-3 items-center"
            >
              <div>
                <Link
                  to={`/jobs/${a.jobId}`}
                  className="font-display font-semibold text-fg hover:text-brand-400 transition-colors"
                >
                  {a.jobTitle}
                </Link>
                <p className="text-sm text-fg-muted font-mono mt-0.5">{a.company}</p>
              </div>
              <span className="badge-status">{a.status}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
