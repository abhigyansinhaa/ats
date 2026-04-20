import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'
import JobCard from '../components/JobCard.jsx'

export default function MyApplications() {
  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    Promise.all([api.get('/applications/me'), api.get('/jobs')])
      .then(([appRes, jobsRes]) => {
        if (!cancelled) {
          setApplications(appRes.data)
          setJobs(jobsRes.data)
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.response?.data?.error || e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const appliedJobIds = useMemo(
    () => new Set(applications.map((a) => a.jobId)),
    [applications],
  )

  const notYetApplied = useMemo(
    () => jobs.filter((j) => !appliedJobIds.has(j.id)),
    [jobs, appliedJobIds],
  )

  if (loading) {
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

  if (error) return <p className="alert-error inline-block">{error}</p>

  return (
    <div className="space-y-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Candidate</p>
        <h1 className="page-title mt-1">My applications</h1>
        <p className="mt-3 text-fg-muted text-sm max-w-2xl">
          This list shows only roles you have <strong className="text-fg">already applied</strong> to. Open
          postings live under{' '}
          <Link to="/jobs" className="link-brand">
            Positions
          </Link>
          —apply from a job&apos;s detail page to add it here.
        </p>
        <ul className="mt-8 space-y-3">
          {applications.length === 0 ? (
            <li className="text-fg-muted panel py-6 px-4 text-center">
              You haven&apos;t applied to any roles yet.{' '}
              <Link to="/jobs" className="link-brand">
                Browse open jobs
              </Link>
              .
            </li>
          ) : (
            applications.map((a) => (
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

      {notYetApplied.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold text-fg">Open jobs you haven&apos;t applied to</h2>
          <p className="text-fg-muted text-sm mt-1 max-w-2xl">
            These postings are live. Open a job to read the full description and submit an application.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {notYetApplied.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
