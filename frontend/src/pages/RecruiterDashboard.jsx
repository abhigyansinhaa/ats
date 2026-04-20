import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/jobs')
      .then((r) => setJobs(r.data))
      .catch((e) => setError(e.response?.data?.error || e.message))
  }, [])

  return (
    <div>
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Recruiter</p>
          <h1 className="page-title mt-1">Your jobs</h1>
          <p className="text-fg-muted text-sm mt-2 max-w-xl">
            Post roles, edit listings, and review applicants for each opening.
          </p>
        </div>
        <Link to="/recruiter/jobs/new" className="btn-primary shrink-0">
          Post new job
        </Link>
      </div>
      {error && <p className="mt-4 alert-error inline-block">{error}</p>}
      <ul className="mt-8 space-y-3">
        {jobs.map((j) => (
          <li
            key={j.id}
            className="panel flex flex-wrap justify-between gap-4 items-center"
          >
            <div>
              <p className="font-display font-semibold text-fg">{j.title}</p>
              <p className="text-sm text-fg-muted font-mono mt-0.5">
                {j.company} · {j.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={`/recruiter/jobs/${j.id}/applicants`} className="btn-secondary-sm">
                Applicants
              </Link>
              <Link to={`/recruiter/jobs/${j.id}/edit`} className="btn-dark">
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {jobs.length === 0 && !error && (
        <p className="mt-6 text-fg-muted">No jobs posted yet. Create your first listing.</p>
      )}
    </div>
  )
}
