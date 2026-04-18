"use client"
import React, { useEffect, useState } from 'react'
import { ArrowRight, GraduationCap, Palette, Music, Landmark, Heart, Globe, Activity } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { getHomeActivities } from '@/app/homeActions'
import { useLanguage } from '@/context/LanguageContext'

const iconMap: Record<string, any> = {
  GraduationCap,
  Palette,
  Music,
  Landmark,
  Heart,
  Globe,
  Activity
}

export default function HomeActivities() {
  const [activities, setActivities] = useState<any[]>([])
  const { language, t } = useLanguage()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomeActivities().then(data => {
      setActivities(data)
      setLoading(false)
    })
  }, [])

  // 6 default groups for demonstration or fallback
  const defaultActivities = [
    { title: { tr: 'Eğitim', en: 'Education' }, category: 'Eğitim', icon: 'GraduationCap', desc: { tr: 'Geleceğin liderleri için kapsayıcı eğitim programları.', en: 'Inclusive education programs for future leaders.' } },
    { title: { tr: 'Sanat', en: 'Art' }, category: 'Kültür', icon: 'Palette', desc: { tr: 'Yaratıcılığı destekleyen sanatsal projeler ve sergiler.', en: 'Artistic projects and exhibitions supporting creativity.' } },
    { title: { tr: 'Müzik', en: 'Music' }, category: 'Kültür', icon: 'Music', desc: { tr: 'Kültürlerarası köprüler kuran müzikal etkileşimler.', en: 'Musical interactions building intercultural bridges.' } },
    { title: { tr: 'Kültürel Miras', en: 'Cultural Heritage' }, category: 'Mirasa Sahip Çık', icon: 'Landmark', desc: { tr: 'Geleneksel değerlerimizi koruma ve tanıtma çalışmaları.', en: 'Protecting and promoting our traditional values.' } },
    { title: { tr: 'Dayanışma', en: 'Solidarity' }, category: 'Toplum', icon: 'Heart', desc: { tr: 'Toplumsal bağları güçlendiren yardımlaşma ağları.', en: 'Support networks strengthening social bonds.' } },
    { title: { tr: 'Dijital Farkındalık', en: 'Digital Awareness' }, category: 'Teknoloji', icon: 'Globe', desc: { tr: 'Dijital dünyada güvenli ve bilinçli etkileşim eğitimleri.', en: 'Training for safe and conscious interaction in the digital world.' } },
  ]

  const displayActivities = activities.length > 0 ? activities : defaultActivities

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-4 py-2 bg-kefder-teal/10 text-kefder-teal rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {t('nav.activities')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-kefder-gray-dark mb-6">
              {t('home.activities.title')}
            </h2>
            <p className="text-kefder-gray text-lg leading-relaxed">
              {t('home.activities.desc')}
            </p>
          </div>
        </ScrollReveal>

        {/* Grid - 3x2 Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayActivities.slice(0, 6).map((activity, index) => {
            const IconComponent = iconMap[activity.icon] || Activity
            const title = activity.title?.[language] || activity.title?.tr || activity.title
            const desc = activity.description?.[language] || activity.description?.tr || activity.desc?.[language] || activity.desc?.tr

            return (
              <ScrollReveal key={activity._id || index} delay={index * 0.1}>
                <div className="group relative bg-kefder-gray-light/30 rounded-[40px] p-10 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-kefder-teal/10 h-full flex flex-col">
                  {/* Icon & Category */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-kefder-teal shadow-sm group-hover:bg-kefder-teal group-hover:text-white transition-all duration-500">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-kefder-gray/40 group-hover:text-kefder-teal transition-colors">
                      {activity.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-kefder-gray-dark mb-4 group-hover:text-kefder-teal transition-colors">
                      {title}
                    </h3>
                    <p className="text-kefder-gray leading-relaxed mb-8">
                      {desc}
                    </p>
                  </div>

                  {/* Action */}
                  <Link 
                    href="/activities" 
                    className="mt-auto inline-flex items-center gap-2 text-kefder-teal font-bold group/link"
                  >
                    {t('home.activities.more')}
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                  </Link>

                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-kefder-teal/5 rounded-bl-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
