import { Navigate, Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import LoginPage from '../pages/auth/Login'
import RegisterPage from '../pages/auth/Register'
import DashboardPage from '../pages/dashboard/Dashboard'
import TemplatesPage from '../pages/templates/Templates'
import DocumentsPage from '../pages/documents/Documents'
import ReviewPage from '../pages/review/Review'
import SettingsPage from '../pages/settings/Settings'

function NotFoundPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
