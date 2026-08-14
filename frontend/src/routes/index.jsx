import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
