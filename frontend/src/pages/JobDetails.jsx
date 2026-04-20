import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function JobDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then((r) => setJob(r.data))
      .catch((e) => setError(e.response?.data?.error || e.message))
  }, [id])

  if (error) return <p className="alert-error inline-block">{error}</p>
  if (!job) {
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

  return (
    <article className="max-w-3xl">
      <Link to="/jobs" className="link-brand text-sm font-mono">
        ← Back to jobs
      </Link>
      <div className="mt-6 panel">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-fg tracking-tight">{job.title}</h1>
        <p className="text-fg-muted mt-3 font-mono text-sm">
          {job.company} · {job.location}
        </p>
        <div className="mt-8 prose-invert-local whitespace-pre-wrap border-t border-border pt-8">
          {job.description}
        </div>
      </div>
      {user?.role === 'CANDIDATE' && (
        <div className="mt-8">
          <Link to={`/apply/${job.id}`} className="btn-primary">
            Apply for this job
          </Link>
        </div>
      )}
      {!user && (
        <p className="mt-8 text-fg-muted text-sm">
          <Link to="/login" className="link-brand">
            Log in
          </Link>{' '}
          as a candidate to apply.
        </p>
      )}
    </article>
  )
}
