import { useEffect, useState } from 'react'
import api from '../services/api.js'
import JobCard from '../components/JobCard.jsx'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/jobs')
      .then((r) => setJobs(r.data))
      .catch((e) => setError(e.response?.data?.error || e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-fg-muted py-12">
        <span
          className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-brand-400"
          aria-hidden
        />
        <span className="font-mono text-sm">Loading jobs…</span>
      </div>
    )
  }
  if (error) return <p className="alert-error inline-block">{error}</p>

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Open roles</p>
          <h1 className="page-title mt-1">Positions</h1>
          <p className="mt-2 text-fg-muted text-sm max-w-xl">
            Discover roles posted by your team. Select a card for full details and application options.
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {jobs.length === 0 ? (
          <p className="text-fg-muted col-span-full">
            No jobs yet. Recruiters can post from the recruiter dashboard.
          </p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  )
}
