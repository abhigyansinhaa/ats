import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import api from '../services/api.js'

export default function Apply() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function submit() {
    setError('')
    setSubmitting(true)
    try {
      await api.post('/applications', { jobId: Number(jobId) })
      setOk(true)
      setTimeout(() => navigate('/my-applications'), 1500)
    } catch (e) {
      setError(e.response?.data?.error || e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="panel text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Application</p>
        <h1 className="page-title mt-2">Confirm application</h1>
        <p className="text-fg-muted mt-2 text-sm">
          You are applying to job{' '}
          <span className="font-mono text-brand-400">#{jobId}</span>.
        </p>
        {error && <p className="mt-4 alert-error text-left">{error}</p>}
        {ok && <p className="mt-4 alert-success">Application submitted. Redirecting…</p>}
        <button
          type="button"
          onClick={submit}
          disabled={submitting || ok}
          className="btn-primary mt-8 w-full sm:w-auto"
        >
          {submitting ? 'Submitting…' : 'Submit application'}
        </button>
      </div>
    </div>
  )
}
