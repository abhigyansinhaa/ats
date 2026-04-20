import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../services/api.js'

const STATUSES = ['SUBMITTED', 'SHORTLISTED', 'REJECTED', 'INTERVIEW_SCHEDULED', 'HIRED']

export default function RecruiterApplicants() {
  const { jobId } = useParams()
  const [applicants, setApplicants] = useState([])
  const [error, setError] = useState('')
  const [scheduling, setScheduling] = useState(null)
  const [when, setWhen] = useState('')

  function load() {
    api
      .get(`/applications/job/${jobId}`)
      .then((r) => setApplicants(r.data))
      .catch((e) => setError(e.response?.data?.error || e.message))
  }

  useEffect(() => {
    load()
  }, [jobId])

  async function updateStatus(appId, status) {
    setError('')
    try {
      await api.put(`/applications/${appId}/status`, { status })
      load()
    } catch (e) {
      setError(e.response?.data?.error || e.message)
    }
  }

  async function scheduleInterview(appId) {
    if (!when) return
    setError('')
    try {
      await api.post('/interviews', {
        applicationId: appId,
        scheduledAt: new Date(when).toISOString(),
        notes: '',
      })
      setScheduling(null)
      setWhen('')
      load()
    } catch (e) {
      setError(e.response?.data?.error || e.message)
    }
  }

  return (
    <div>
      <Link to="/recruiter" className="text-sm text-brand-700 hover:underline">
        ← Back to recruiter
      </Link>
      <h1 className="text-2xl font-bold text-brand-900 mt-4">Applicants for job #{jobId}</h1>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      <ul className="mt-6 space-y-4">
        {applicants.map((a) => (
          <li key={a.id} className="border border-slate-200 rounded-lg p-4 bg-white">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium">{a.candidateName}</p>
                <p className="text-sm text-slate-600">{a.candidateEmail}</p>
              </div>
              <span className="text-sm px-2 py-1 rounded bg-slate-100">{a.status}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <select
                className="text-sm border border-slate-300 rounded-md px-2 py-1"
                value={a.status}
                onChange={(e) => updateStatus(a.id, e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setScheduling(scheduling === a.id ? null : a.id)}
                className="text-sm px-3 py-1 rounded-md border border-slate-300 hover:bg-slate-50"
              >
                Schedule interview
              </button>
            </div>
            {scheduling === a.id && (
              <div className="mt-3 flex flex-wrap gap-2 items-end">
                <div>
                  <label className="block text-xs text-slate-600">Date & time</label>
                  <input
                    type="datetime-local"
                    className="border border-slate-300 rounded-md px-2 py-1 text-sm"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => scheduleInterview(a.id)}
                  className="text-sm px-3 py-1.5 rounded-md bg-brand-600 text-white"
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
        {applicants.length === 0 && <li className="text-slate-500">No applicants yet.</li>}
      </ul>
    </div>
  )
}
