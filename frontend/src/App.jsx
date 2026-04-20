import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import JobList from './pages/JobList.jsx'
import JobDetails from './pages/JobDetails.jsx'
import Apply from './pages/Apply.jsx'
import CandidateProfile from './pages/CandidateProfile.jsx'
import MyApplications from './pages/MyApplications.jsx'
import RecruiterDashboard from './pages/RecruiterDashboard.jsx'
import RecruiterJobForm from './pages/RecruiterJobForm.jsx'
import RecruiterApplicants from './pages/RecruiterApplicants.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-surface"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -left-32 top-20 h-96 w-96 rounded-full bg-brand-600/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-400/5 blur-3xl"
        aria-hidden
      />
      <Navbar />
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />

          <Route
            path="/apply/:jobId"
            element={
              <ProtectedRoute roles={['CANDIDATE']}>
                <Apply />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={['CANDIDATE']}>
                <CandidateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute roles={['CANDIDATE']}>
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter"
            element={
              <ProtectedRoute roles={['RECRUITER', 'ADMIN']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/new"
            element={
              <ProtectedRoute roles={['RECRUITER', 'ADMIN']}>
                <RecruiterJobForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:id/edit"
            element={
              <ProtectedRoute roles={['RECRUITER', 'ADMIN']}>
                <RecruiterJobForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:jobId/applicants"
            element={
              <ProtectedRoute roles={['RECRUITER', 'ADMIN']}>
                <RecruiterApplicants />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
