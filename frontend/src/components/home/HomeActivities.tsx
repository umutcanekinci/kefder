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

  useEffect(() => {
    getHomeActivities().then(data => {
      setActivities(data)
    })
  }, [])

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

        {/* Grid - Dynamic from CMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {activities.slice(0, 6).map((activity, index) => {
            const IconComponent = iconMap[activity.icon] || Activity
            const title = activity.title?.[language] || activity.title?.tr || activity.title
            const desc = activity.description?.[language] || activity.description?.tr
            const imageUrl = activity.imageUrl || "/images/asset_1.jpg"

            return (
              <ScrollReveal key={activity._id || index} delay={index * 0.1}>
                <div className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-kefder-teal shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <IconComponent className="w-6 h-6" />
                       </div>
                    </div>
                    {activity.category && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-kefder-teal shadow-sm">
                          {activity.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-kefder-gray-dark mb-4 group-hover:text-kefder-teal transition-colors">
                      {title}
                    </h3>
                    <p className="text-kefder-gray leading-relaxed mb-8 line-clamp-3">
                      {desc}
                    </p>

                    <Link 
                      href="/activities#work" 
                      className="mt-auto inline-flex items-center gap-2 text-kefder-teal font-bold group/link"
                    >
                      {t('home.activities.more')}
                      <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-16 text-center">
            <Link 
              href="/activities#work" 
              className="inline-flex items-center gap-3 bg-white border-2 border-kefder-teal text-kefder-teal px-10 py-4 rounded-full font-bold shadow-lg hover:bg-kefder-teal hover:text-white transition-all hover:-translate-y-1 group"
            >
              {t('home.activities.all')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
