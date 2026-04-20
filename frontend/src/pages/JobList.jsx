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

  if (loading) return <p className="text-slate-500">Loading jobs…</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Open positions</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {jobs.length === 0 ? (
          <p className="text-slate-500">No jobs yet. Recruiters can post from the recruiter dashboard.</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  )
}
