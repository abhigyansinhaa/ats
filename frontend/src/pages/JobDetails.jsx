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

  if (error) return <p className="text-red-600">{error}</p>
  if (!job) return <p className="text-slate-500">Loading…</p>

  return (
    <article className="max-w-3xl">
      <Link to="/jobs" className="text-sm text-brand-700 hover:underline">
        ← Back to jobs
      </Link>
      <h1 className="text-3xl font-bold text-brand-900 mt-4">{job.title}</h1>
      <p className="text-slate-600 mt-2">
        {job.company} · {job.location}
      </p>
      <div className="mt-6 prose prose-slate max-w-none">
        <p className="whitespace-pre-wrap">{job.description}</p>
      </div>
      {user?.role === 'CANDIDATE' && (
        <div className="mt-8">
          <Link
            to={`/apply/${job.id}`}
            className="inline-flex px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
          >
            Apply for this job
          </Link>
        </div>
      )}
      {!user && (
        <p className="mt-8 text-slate-600">
          <Link to="/login" className="text-brand-700 font-medium">
            Log in
          </Link>{' '}
          as a candidate to apply.
        </p>
      )}
    </article>
  )
}
