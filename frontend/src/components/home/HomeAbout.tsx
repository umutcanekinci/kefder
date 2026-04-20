"use client"
import React from 'react'
import { BookOpen, Palette, Recycle, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import ScrollReveal from '@/components/shared/ScrollReveal'
import Link from 'next/link'

export default function HomeAbout() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with Badge */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-square rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/asset_1.jpg" 
                  alt="KEFDER Hakkımızda" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative element */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-kefder-orange/10 rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-kefder-orange/10 text-kefder-orange-dark rounded-full text-xs font-bold uppercase tracking-widest">
                {t('home.about.badge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-kefder-gray-dark leading-tight">
                {t('home.about.title')}
              </h2>
              <p className="text-lg text-kefder-gray leading-relaxed">
                {t('home.about.desc')}
              </p>

              {/* Icon List */}
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-kefder-orange/10 flex items-center justify-center text-kefder-orange group-hover:bg-kefder-orange group-hover:text-white transition-all duration-300">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-kefder-gray-dark mb-1">{t('home.about.item1.title')}</h4>
                    <p className="text-kefder-gray">{t('home.about.item1.desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-kefder-teal/10 flex items-center justify-center text-kefder-teal group-hover:bg-kefder-teal group-hover:text-white transition-all duration-300">
                    <Palette className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-kefder-gray-dark mb-1">{t('home.about.item2.title')}</h4>
                    <p className="text-kefder-gray">{t('home.about.item2.desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-kefder-orange/10 flex items-center justify-center text-kefder-orange group-hover:bg-kefder-orange group-hover:text-white transition-all duration-300">
                    <Recycle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-kefder-gray-dark mb-1">{t('home.about.item3.title')}</h4>
                    <p className="text-kefder-gray">{t('home.about.item3.desc')}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href="/about"
                  className="inline-flex items-center gap-3 bg-kefder-teal text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-kefder-teal/20 hover:-translate-y-1 transition-all group"
                >
                  {t('hero.discover')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
