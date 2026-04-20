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
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-brand-400">Profile</p>
        <h1 className="page-title mt-1">Candidate profile</h1>
      </div>
      {error && <p className="alert-error">{error}</p>}
      {message && <p className="alert-success">{message}</p>}
      <div className="panel">
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="label" htmlFor="profile-skills">
              Skills
            </label>
            <textarea
              id="profile-skills"
              className="input-field min-h-[100px] resize-y"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="profile-experience">
              Experience
            </label>
            <textarea
              id="profile-experience"
              className="input-field min-h-[100px] resize-y"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Save profile
          </button>
        </form>
      </div>
      <div className="panel-muted">
        <label className="label" htmlFor="profile-resume">
          Resume
        </label>
        {resumeFileName && (
          <p className="text-sm text-fg-muted mt-1">
            Current file:{' '}
            <code className="rounded-md bg-raised px-2 py-0.5 font-mono text-xs text-brand-400">
              {resumeFileName}
            </code>
          </p>
        )}
        <input
          id="profile-resume"
          type="file"
          className="mt-3 block w-full text-sm text-fg-muted file:mr-3 file:rounded-full file:border-0 file:bg-raised file:px-4 file:py-2 file:text-sm file:font-medium file:text-fg hover:file:bg-border-subtle"
          onChange={onFile}
          accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  )
}
