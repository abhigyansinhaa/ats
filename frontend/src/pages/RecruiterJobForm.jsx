import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api.js'

export default function RecruiterJobForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    api
      .get(`/jobs/${id}`)
      .then((r) => {
        setTitle(r.data.title)
        setDescription(r.data.description)
        setCompany(r.data.company)
        setLocation(r.data.location)
      })
      .catch((e) => setError(e.response?.data?.error || e.message))
  }, [id, isEdit])

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      if (isEdit) {
        await api.put(`/jobs/${id}`, { title, description, company, location })
      } else {
        await api.post('/jobs', { title, description, company, location })
      }
      navigate('/recruiter')
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-900">{isEdit ? 'Edit job' : 'New job'}</h1>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Company</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Location</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 min-h-[160px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
        >
          {isEdit ? 'Save changes' : 'Publish job'}
        </button>
      </form>
    </div>
  )
}
