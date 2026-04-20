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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
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
