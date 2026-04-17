"use client"

import { useState } from 'react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import AdminLogin from '@/sections/AdminLogin'
import AdminPanel from '@/sections/AdminPanel'

import { LanguageProvider } from '@/context/LanguageContext'
import { AdminProvider, useAdmin } from '@/context/AdminContext'

function AppContent({ children }: { children: React.ReactNode }) {
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
        {children}
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

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AdminProvider>
        <AppContent>{children}</AppContent>
      </AdminProvider>
    </LanguageProvider>
  )
}
