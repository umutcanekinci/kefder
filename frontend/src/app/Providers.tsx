"use client"

import { useState } from 'react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import AdminLogin from '@/sections/AdminLogin'
import AdminPanel from '@/sections/AdminPanel'

import { LanguageProvider } from '@/context/LanguageContext'
import { AdminProvider, useAdmin } from '@/context/AdminContext'

function AppContent({ children, settings }: { children: React.ReactNode, settings?: any }) {
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
      <Header settings={settings} />
      <main>
        {children}
      </main>
      <Footer onAdminClick={handleAdminClick} settings={settings} />

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

export default function Providers({ children, settings }: { children: React.ReactNode, settings?: any }) {
  return (
    <LanguageProvider>
      <AdminProvider>
        <AppContent settings={settings}>{children}</AppContent>
      </AdminProvider>
    </LanguageProvider>
  )
}
