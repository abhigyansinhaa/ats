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
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-brand-900">Recruiter</h1>
        <Link
          to="/recruiter/jobs/new"
          className="px-4 py-2 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
        >
          Post new job
        </Link>
      </div>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <ul className="mt-6 space-y-3">
        {jobs.map((j) => (
          <li
            key={j.id}
            className="border border-slate-200 rounded-lg p-4 bg-white flex flex-wrap justify-between gap-2 items-center"
          >
            <div>
              <p className="font-semibold text-brand-900">{j.title}</p>
              <p className="text-sm text-slate-600">
                {j.company} · {j.location}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/recruiter/jobs/${j.id}/applicants`}
                className="text-sm px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50"
              >
                Applicants
              </Link>
              <Link
                to={`/recruiter/jobs/${j.id}/edit`}
                className="text-sm px-3 py-1.5 rounded-md bg-slate-800 text-white hover:bg-slate-900"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
