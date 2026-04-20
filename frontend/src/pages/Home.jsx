import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Structured hiring',
    body: 'Recruiters publish roles with clear descriptions; candidates discover opportunities in one place.',
  },
  {
    title: 'Application pipeline',
    body: 'Track statuses from submission through shortlist, interview, and hire with less ambiguity.',
  },
  {
    title: 'Role-aware access',
    body: 'Candidates apply and manage profiles; recruiters and admins operate with the right permissions.',
  },
  {
    title: 'Built for clarity',
    body: 'A focused workflow so teams spend less time on tooling and more time on great hires.',
  },
]

const stats = [
  { label: 'Roles', value: 'Open jobs', hint: 'Browse live postings' },
  { label: 'Apply', value: 'One flow', hint: 'Candidates submit in seconds' },
  { label: 'Track', value: 'Pipeline', hint: 'Status at a glance' },
  { label: 'Teams', value: 'Multi-role', hint: 'Recruiter & admin tools' },
]

export default function Home() {
  return (
    <div className="space-y-24 pb-16">
      <section className="relative pt-6 sm:pt-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-400/90">
            Applicant tracking
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-fg">
            Hire with clarity.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-fg-muted max-w-2xl mx-auto leading-relaxed">
            Streamline hiring: recruiters post roles, candidates apply, and teams move applications through
            the pipeline with a clean, modern experience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link to="/jobs" className="btn-primary">
              Browse jobs
            </Link>
            <Link to="/register" className="btn-secondary">
              Create candidate account
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="panel-muted text-center sm:text-left">
              <p className="font-mono text-xs text-brand-400">{s.label}</p>
              <p className="mt-2 font-display text-xl font-semibold text-fg">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg text-center">
          Why use this ATS?
        </h2>
        <p className="mt-3 text-fg-muted text-center max-w-2xl mx-auto">
          Everything you need for a small team to run recruiting without the noise.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="panel">
              <h3 className="font-display text-lg font-semibold text-fg">{f.title}</h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel text-center max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-fg">Ready to get started?</h2>
        <p className="mt-3 text-fg-muted">
          Explore open roles or create a candidate account to apply and track your applications.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/jobs" className="btn-primary">
            Explore jobs
          </Link>
          <Link to="/register" className="btn-secondary">
            Create account
          </Link>
        </div>
      </section>
    </div>
  )
}
