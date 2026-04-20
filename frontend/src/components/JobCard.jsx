import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <article className="group panel p-5 transition hover:border-brand-500/25 hover:shadow-glow">
      <h2 className="font-display text-lg font-semibold text-fg">{job.title}</h2>
      <p className="text-fg-muted text-sm mt-1 font-mono">
        {job.company} · {job.location}
      </p>
      <p className="text-muted text-sm mt-2 line-clamp-2">{job.description}</p>
      <div className="mt-4 flex justify-between items-center gap-3">
        <span className="text-xs font-mono text-muted">
          Posted by {job.postedByName || '—'}
        </span>
        <Link to={`/jobs/${job.id}`} className="link-brand text-sm">
          View details →
        </Link>
      </div>
    </article>
  )
}
