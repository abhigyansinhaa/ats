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
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold text-brand-900">Confirm application</h1>
      <p className="text-slate-600 mt-2">You are applying to job #{jobId}.</p>
      {error && (
        <p className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
      )}
      {ok && <p className="mt-4 text-green-700">Application submitted. Redirecting…</p>}
      <button
        type="button"
        onClick={submit}
        disabled={submitting || ok}
        className="mt-8 px-8 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit application'}
      </button>
    </div>
  )
}
