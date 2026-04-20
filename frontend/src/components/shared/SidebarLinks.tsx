"use client"
import React from 'react'
import { FaFacebook as Facebook } from 'react-icons/fa'
import { ExternalLink, MessageCircle, Heart, Users } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function SidebarLinks({ aeccUrl }: { aeccUrl?: string }) {
  const { language } = useLanguage()

  const links = [
    {
      title: language === 'tr' ? 'Bize Ulaşın' : 'Contact Us',
      href: '/contact',
      icon: MessageCircle
    },
    {
      title: language === 'tr' ? 'Gönüllü Ol' : 'Volunteer',
      href: '/volunteer',
      icon: Heart
    },
    {
      title: language === 'tr' ? 'Üyelik Başvurusu' : 'Membership',
      href: '/membership',
      icon: Users
    }
  ]

  const facebookUrl = aeccUrl || "https://www.facebook.com/groups/aeccizmir"

  return (
    <div className="space-y-8">
      {/* AECC Special Section */}
      <div className="bg-gradient-to-br from-kefder-teal to-kefder-teal-dark rounded-[32px] p-8 text-white shadow-xl shadow-kefder-teal/20 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Facebook className="w-6 h-6" />
            </div>
            <span className="font-black text-xs uppercase tracking-widest opacity-80">Origin Story</span>
          </div>
          
          <h3 className="text-xl font-bold mb-4 leading-tight">
            Amatör İngilizce Konuşma Kulübü (AECC)
          </h3>
          
          <p className="text-white/80 text-sm leading-relaxed mb-8">
            {language === 'tr' 
              ? 'KEFDER\'in temelleri, AECC\'nin yarattığı o muazzam kültürel etkileşim enerjisiyle atıldı. Bu topluluk, derneğimizin kuruluş hikayesinin en canlı parçasıdır.'
              : 'The foundations of KEFDER were laid with the immense energy of cultural interaction created by AECC. This community is the most vibrant part of our story.'
            }
          </p>

          <a 
            href={facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-kefder-teal px-6 py-3 rounded-2xl font-bold text-sm hover:bg-kefder-yellow hover:text-kefder-teal-dark transition-all group/btn shadow-lg"
          >
            AECC Facebook Grubuna Katıl
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-kefder-yellow/10 rounded-full blur-xl"></div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
        <h4 className="text-sm font-black uppercase tracking-widest text-kefder-gray/40 mb-6">
          {language === 'tr' ? 'Hızlı Erişim' : 'Quick Access'}
        </h4>
        <div className="space-y-4">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href}
              className="flex items-center justify-between p-4 bg-kefder-gray-light/30 rounded-2xl hover:bg-kefder-teal/5 hover:text-kefder-teal transition-all group"
            >
              <div className="flex items-center gap-3 font-bold text-kefder-gray-dark group-hover:text-kefder-teal">
                <link.icon className="w-5 h-5 text-kefder-teal/40 group-hover:text-kefder-teal" />
                {link.title}
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}
