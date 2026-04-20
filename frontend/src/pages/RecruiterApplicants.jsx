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
      <Link to="/recruiter" className="link-brand text-sm font-mono">
        ← Back to recruiter
      </Link>
      <h1 className="page-title mt-6">
        Applicants{' '}
        <span className="font-mono text-brand-400 text-lg font-normal">· job #{jobId}</span>
      </h1>
      {error && <p className="mt-4 alert-error">{error}</p>}
      <ul className="mt-8 space-y-4">
        {applicants.map((a) => (
          <li key={a.id} className="panel space-y-3">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium text-fg">{a.candidateName}</p>
                <p className="text-sm text-fg-muted font-mono">{a.candidateEmail}</p>
              </div>
              <span className="badge">{a.status}</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-border">
              <select
                className="select-field text-sm py-1.5"
                value={a.status}
                onChange={(e) => updateStatus(a.id, e.target.value)}
                aria-label={`Status for ${a.candidateName}`}
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
                className="btn-secondary-sm"
              >
                Schedule interview
              </button>
            </div>
            {scheduling === a.id && (
              <div className="flex flex-wrap gap-3 items-end pt-2">
                <div>
                  <label className="block text-xs text-fg-muted mb-1" htmlFor={`dt-${a.id}`}>
                    Date & time
                  </label>
                  <input
                    id={`dt-${a.id}`}
                    type="datetime-local"
                    className="input-field py-2 text-sm"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => scheduleInterview(a.id)}
                  className="btn-primary-sm"
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
        {applicants.length === 0 && <li className="text-fg-muted">No applicants yet.</li>}
      </ul>
    </div>
  )
}
