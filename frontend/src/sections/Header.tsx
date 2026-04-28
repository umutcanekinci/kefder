"use client"
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Globe, ChevronDown, Menu, X, CalendarDays, Target, Users, FileText,
  Scale, Network, History, Archive, Image as ImageIcon, Newspaper,
  Megaphone
} from 'lucide-react'
import { 
  FaFacebook as Facebook, 
  FaInstagram as Instagram, 
  FaYoutube as Youtube, 
  FaXTwitter as Twitter, 
  FaLinkedin as Linkedin 
} from 'react-icons/fa6'
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

const platformIcons: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin
}

export default function Header({ settings }: { settings?: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = getNavItems(t)
  const socialLinks = Array.isArray(settings?.socialLinks) ? settings.socialLinks : []

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }

  const currentLang = mounted ? language : 'tr'

  return (
    <header className="sticky top-0 z-50 bg-kefder-teal border-b border-white/10 shadow-lg">
      {/* ── Main bar ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 lg:gap-3 py-3 lg:py-0 lg:h-20 xl:h-24">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3 shrink-0 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src={settings?.logoUrl || "/images/logo.png"}
                alt="KEFDER Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-lg lg:text-xl xl:text-2xl font-black text-white whitespace-nowrap tracking-tight">KEFDER</span>
              <span className="hidden lg:block text-[10px] xl:text-[12px] text-white/80 font-medium whitespace-normal leading-tight">
                {t('nav.associationName')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav – takes all remaining space */}
          <nav className="hidden lg:flex flex-1 min-w-0 items-center justify-center h-full">
            {mounted && navItems.map((item) => (
              <div key={item.label} className="relative group h-full flex items-center">
                <Link
                  href={item.href}
                  className={
                    "px-2 xl:px-3 h-full flex items-center gap-0.5 xl:gap-1 text-[11px] xl:text-sm font-bold transition-colors whitespace-nowrap " +
                    (pathname === item.href
                      ? 'text-white underline underline-offset-8 decoration-2'
                      : 'text-white/80 hover:text-white')
                  }
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-3 h-3 shrink-0 group-hover:rotate-180 transition-transform" />}
                </Link>

                {item.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2 z-50">
                    <div className={"bg-white shadow-xl rounded-xl border border-kefder-gray-light p-2 flex gap-4 " + (item.label === t('nav.activities') ? 'w-[450px] p-4' : 'w-60')}>
                      <div className="flex-1 flex flex-col gap-1">
                        {item.dropdown.map(subItem => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="px-4 py-2.5 text-sm text-kefder-gray-dark hover:text-kefder-teal hover:bg-kefder-teal/10 rounded-md transition-colors flex items-center gap-3 whitespace-nowrap group/item"
                          >
                            {subItem.icon && <subItem.icon className="w-4 h-4 text-kefder-gray/40 group-hover/item:text-kefder-teal transition-colors" />}
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                      {item.label === t('nav.activities') && (
                        <div className="w-[180px] bg-kefder-orange/5 rounded-lg p-3 flex flex-col items-center text-center border border-kefder-orange/20">
                          <div className="w-full h-24 mb-3 relative rounded-md overflow-hidden bg-white flex items-center justify-center">
                            <img src="/images/asset_1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
                            <CalendarDays className="relative z-10 w-8 h-8 text-kefder-orange drop-shadow-md" />
                          </div>
                          <span className="text-xs font-semibold text-kefder-gray-dark">{t('nav.activities.dropdown.title')}</span>
                          <Link href="/activities#calendar" className="mt-3 text-[11px] font-medium bg-kefder-orange text-white px-3 py-1.5 rounded-full hover:bg-kefder-orange-dark transition-colors w-full">
                            {t('nav.activities.dropdown.button')}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right controls – shrink-0 prevents them from ever being squeezed */}
          <div className="shrink-0 flex items-center gap-1.5 xl:gap-2 ml-auto lg:ml-0">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 xl:gap-2 px-2.5 xl:px-4 py-2 text-[11px] xl:text-sm font-bold text-white hover:bg-white/20 transition-all border border-white/20 rounded-full bg-white/10 whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
              {/* Küçük ekran: kısaltma */}
              <span className="hidden sm:inline xl:hidden">{currentLang === 'tr' ? 'EN' : 'TR'}</span>
              {/* Büyük ekran: tam metin */}
              <span className="hidden xl:inline">{currentLang === 'tr' ? 'English' : 'Türkçe'}</span>
            </button>

            {/* Social icons – visible on lg+ (icon only on lg, icon+label on xl+) */}
            {socialLinks.length > 0 && (
              <div className="hidden lg:flex items-center gap-1">
                {socialLinks.map((social: any, idx: number) => {
                  const Icon = platformIcons[social.platform] || Globe
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label || social.platform}
                      className="w-8 h-8 xl:w-9 xl:h-9 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10 shrink-0"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </a>
                  )
                })}
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-all"
              aria-label="Menüyü aç/kapat"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-kefder-teal border-t border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {mounted && navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                  className={
                    "flex items-center justify-between px-4 py-3.5 text-sm font-bold rounded-lg transition-all " +
                    (pathname === item.href ? 'text-white bg-white/20' : 'text-white hover:bg-white/10')
                  }
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4 text-white/60" />}
                </Link>

                {item.dropdown && (
                  <div className="pl-4 pr-2 py-1 flex flex-col gap-0.5 border-l-2 border-white/20 ml-6 mt-0.5 mb-1">
                    {item.dropdown.map(subItem => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 text-sm text-white/80 hover:text-white flex items-center gap-3"
                      >
                        {subItem.icon && <subItem.icon className="w-4 h-4 text-white/40" />}
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Social icons in mobile menu */}
            {socialLinks.length > 0 && (
              <div className="flex items-center justify-center flex-wrap gap-3 pt-5 pb-2 border-t border-white/10 mt-3">
                {socialLinks.map((social: any, idx: number) => {
                  const Icon = platformIcons[social.platform] || Globe
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        "flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all border border-white/10 " +
                        (social.label ? "px-4 gap-2 h-11" : "w-11 h-11")
                      }
                    >
                      <Icon className="w-5 h-5" />
                      {social.label && <span className="text-[11px] font-black tracking-widest">{social.label}</span>}
                    </a>
                  )
                })}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
