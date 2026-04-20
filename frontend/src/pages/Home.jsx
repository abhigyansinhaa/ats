import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-center py-16 px-4">
      <h1 className="text-4xl font-bold text-brand-900 tracking-tight">
        Applicant Tracking System
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
        Streamline hiring: recruiters post roles, candidates apply, and teams move applications through
        the pipeline with clarity.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/jobs"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
        >
          Browse jobs
        </Link>
        <Link
          to="/register"
          className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-300 font-medium hover:bg-slate-50"
        >
          Create candidate account
        </Link>
      </div>
    </div>
  )
}
