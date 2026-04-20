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
      <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Job</p>
      <h1 className="page-title mt-1">{isEdit ? 'Edit job' : 'New job'}</h1>
      {error && <p className="mt-4 alert-error">{error}</p>}
      <form onSubmit={submit} className="mt-6 panel space-y-4">
        <div>
          <label className="label" htmlFor="job-title">
            Title
          </label>
          <input
            id="job-title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="job-company">
            Company
          </label>
          <input
            id="job-company"
            className="input-field"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="job-location">
            Location
          </label>
          <input
            id="job-location"
            className="input-field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="job-description">
            Description
          </label>
          <textarea
            id="job-description"
            className="input-field min-h-[160px] resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          {isEdit ? 'Save changes' : 'Publish job'}
        </button>
      </form>
    </div>
  )
}
