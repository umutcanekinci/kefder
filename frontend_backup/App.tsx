import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './sections/Header'
import Hero from './sections/Hero'
import Footer from './sections/Footer'
import AdminLogin from './sections/AdminLogin'
import AdminPanel from './sections/AdminPanel'

import MembershipPage from './pages/MembershipPage'
import ContactPage from './pages/ContactPage'
import ActivitiesPage from './pages/ActivitiesPage'

import { LanguageProvider } from './context/LanguageContext'
import { AdminProvider, useAdmin } from './context/AdminContext'

function HomePage() {
  return <Hero />
}

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-3xl font-bold">
      Hakkımızda Sayfası
    </div>
  )
}

function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-3xl font-bold">
      Haberler Sayfası
    </div>
  )
}

function AppContent() {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const { isLoggedIn } = useAdmin()

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setShowAdminPanel(true)
    } else {
      setShowAdminLogin(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/haberler" element={<NewsPage />} />
          <Route path="/volunteer" element={<MembershipPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer onAdminClick={handleAdminClick} />

      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </LanguageProvider>
  )
}

export default App