"use client"
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaFacebook as Facebook, FaInstagram as Instagram } from 'react-icons/fa';
import { Globe, ChevronDown, Menu, X, CalendarDays, Target, Users, FileText, Scale, Network, History, Archive, Image as ImageIcon, Newspaper, Megaphone, Activity } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const getNavItems = (t: (key: string) => string) => [
  { label: t('nav.home'), href: '/' },
  { 
    label: t('nav.about'), 
    href: '/about', 
    dropdown: [
      { label: t('nav.about.mission'), href: '/about#mission', icon: Target },
      { label: t('nav.about.team'), href: '/about#team', icon: Users },
      { label: t('nav.about.reports'), href: '/about#reports', icon: FileText },
      { label: t('nav.about.rules'), href: '/about#rules', icon: Scale },
      { label: t('nav.about.networks'), href: '/about#networks', icon: Network },
    ]
  },
  { 
    label: t('nav.activities'), 
    href: '/activities', 
    dropdown: [
      { label: t('nav.activities.calendar'), href: '/activities#calendar', icon: CalendarDays },
      { label: t('nav.activities.past'), href: '/activities#past', icon: History },
      { label: t('nav.activities.archive'), href: '/activities#archive', icon: Archive },
      { label: t('nav.activities.gallery'), href: '/activities#gallery', icon: ImageIcon },
    ]
  },
  { 
    label: t('nav.news'), 
    href: '/haberler',
    dropdown: [
      { label: t('nav.news.all'), href: '/haberler', icon: Newspaper },
      { label: t('nav.news.press'), href: '/haberler#press', icon: Megaphone },
    ]
  },
  { label: t('nav.membership'), href: '/volunteer' },
  { label: t('nav.contact'), href: '/contact' },
]

export default function Header({ settings }: { settings?: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = getNavItems(t)
  const { socialLinks } = settings || {}

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }

  // Hydration safety
  const currentLang = mounted ? language : 'tr'

  return (
    <header className="sticky top-0 z-50 bg-kefder-teal border-b border-white/10 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-0 group">
              <div className="w-14 h-14 lg:w-16 lg:h-16 flex-shrink-0">
                <img
                  src={settings?.logoUrl || "/images/logo.png"}
                  alt="KEFDER Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-black text-white leading-tight whitespace-nowrap">KEFDER</h1>
                <p className="text-xs lg:text-sm text-white/80 font-medium leading-tight whitespace-nowrap">
                  {t('nav.associationName')}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex flex-1 items-center justify-center h-full mx-6 xl:mx-10">
            {mounted && navItems.map((item) => (
              <div key={item.label} className="relative group h-full flex items-center">
                <Link
                  href={item.href}
                  className={"px-2 xl:px-4 h-full flex items-center gap-1 xl:gap-1.5 text-sm xl:text-base font-bold transition-colors whitespace-nowrap " + (pathname === item.href ? 'text-white underline underline-offset-8 decoration-2' : 'text-white/80 hover:text-white')}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2 z-50 cursor-default">
                    <div className={"bg-white shadow-xl rounded-xl border border-kefder-gray-light p-2 flex gap-4 " + (item.label === t('nav.activities') ? 'w-[450px] p-4' : 'w-60')}>
                      <div className="flex-1 flex flex-col gap-1">
                        {item.dropdown.map(subItem => (
                          <Link 
                            key={subItem.label} 
                            href={subItem.href} 
                            className="px-4 py-2.5 text-base text-kefder-gray-dark hover:text-kefder-teal hover:bg-kefder-teal/10 rounded-md transition-colors flex items-center gap-3 whitespace-nowrap group/item"
                          >
                            {subItem.icon && <subItem.icon className="w-4 h-4 text-kefder-gray/40 group-hover/item:text-kefder-teal transition-colors" />}
                            {subItem.label}
                          </Link>
                        ))}
                      </div>

                      {/* Graphic component for Activities mega-menu */}
                      {item.label === t('nav.activities') && (
                        <div className="w-[180px] bg-kefder-orange/5 rounded-lg p-3 flex flex-col items-center text-center border border-kefder-orange/20">
                          <div className="w-full h-24 mb-3 relative rounded-md overflow-hidden bg-white flex items-center justify-center">
                            <img src="/images/asset_1.jpg" alt="Calendar Graphic" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
                            <CalendarDays className="relative z-10 w-8 h-8 text-kefder-orange drop-shadow-md" />
                          </div>
                          <span className="text-xs font-semibold text-kefder-gray-dark">{t('nav.activities.dropdown.title')}</span>
                          <Link href="/activities#calendar" className="mt-3 text-[11px] font-medium bg-kefder-orange text-white px-3 py-1.5 rounded-full hover:bg-kefder-orange-dark transition-colors w-full">{t('nav.activities.dropdown.button')}</Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - Icons and Toggle */}
          <div className="flex-shrink-0 flex items-center gap-2 lg:gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 text-base font-bold text-white hover:bg-white/20 transition-all border border-white/20 rounded-full bg-white/10"
            >
              <Globe className="w-5 h-5" />
              <span>{currentLang === 'tr' ? 'English' : 'Türkçe'}</span>
            </button>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.aeccFacebook && (
                <a href={socialLinks.aeccFacebook} target="_blank" rel="noopener noreferrer" className="px-3 h-11 flex items-center justify-center gap-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10 group/aecc">
                  <Facebook className="w-5 h-5 text-[#1877F2] group-hover/aecc:scale-110 transition-transform" />
                  <span className="text-[10px] font-black tracking-widest">AECC</span>
                </a>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-white hover:text-kefder-yellow hover:bg-white/10 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-kefder-teal border-t border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-4 flex flex-col gap-2">
            {mounted && navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                  className={"flex items-center justify-between px-4 py-4 text-base font-bold rounded-lg transition-all " + (pathname === item.href ? 'text-white bg-white/20' : 'text-white hover:bg-white/10')}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-5 h-5 text-white/60" />}
                </Link>
                
                {/* Mobile Dropdown Subitems */}
                {item.dropdown && (
                  <div className="pl-6 pr-4 py-2 flex flex-col gap-1 border-l-2 border-kefder-teal/20 ml-6 mt-1">
                    {item.dropdown.map(subItem => (
                      <Link 
                        key={subItem.label} 
                        href={subItem.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-base text-white hover:text-kefder-yellow flex items-center gap-3"
                      >
                        {subItem.icon && <subItem.icon className="w-5 h-5 text-kefder-gray/40" />}
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center justify-center gap-4 pt-6 pb-2 border-t border-white/10 mt-4">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10">
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10">
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {socialLinks?.aeccFacebook && (
                <a href={socialLinks.aeccFacebook} target="_blank" rel="noopener noreferrer" className="px-4 h-12 flex items-center justify-center gap-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10">
                  <Facebook className="w-6 h-6 text-[#1877F2]" />
                  <span className="text-xs font-black tracking-widest">AECC</span>
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
