import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <article className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-brand-900">{job.title}</h2>
      <p className="text-slate-600 text-sm mt-1">
        {job.company} · {job.location}
      </p>
      <p className="text-slate-500 text-sm mt-2 line-clamp-2">{job.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Posted by {job.postedByName || '—'}
        </span>
        <Link
          to={`/jobs/${job.id}`}
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          View details
        </Link>
      </div>
    </article>
  )
}
