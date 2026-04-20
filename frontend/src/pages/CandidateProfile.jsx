import { useEffect, useState } from 'react'
import api from '../services/api.js'

export default function CandidateProfile() {
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('')
  const [resumeFileName, setResumeFileName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/candidate/profile')
      .then((r) => {
        setSkills(r.data.skills || '')
        setExperience(r.data.experience || '')
        setResumeFileName(r.data.resumeFileName || '')
      })
      .catch((e) => setError(e.response?.data?.error || e.message))
  }, [])

  async function save(e) {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      await api.put('/candidate/profile', { skills, experience })
      setMessage('Profile saved.')
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    }
  }

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setMessage('')
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const { data } = await api.post('/candidate/resume', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResumeFileName(data.resumeFileName)
      setMessage('Resume uploaded.')
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-900">Candidate profile</h1>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      {message && <p className="mt-2 text-green-700">{message}</p>}
      <form onSubmit={save} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Skills</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 min-h-[100px]"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Experience</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 min-h-[100px]"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
        >
          Save profile
        </button>
      </form>
      <div className="mt-8 border-t border-slate-200 pt-6">
        <label className="block text-sm font-medium text-slate-700">Resume</label>
        {resumeFileName && (
          <p className="text-sm text-slate-600 mt-1">
            Current file: <code className="bg-slate-100 px-1 rounded">{resumeFileName}</code>
          </p>
        )}
        <input type="file" className="mt-2 text-sm" onChange={onFile} accept=".pdf,.doc,.docx" />
      </div>
    </div>
  )
}
