"use client"
import { useEffect, useState } from 'react'
import { getNewsData } from './actions'
import { Calendar, ArrowRight, Newspaper, Megaphone, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import ScrollReveal from '@/components/shared/ScrollReveal'

export default function NewsPage() {
  const [data, setData] = useState<{news: any[], press: any[]}>({news: [], press: []})
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { language, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
    getNewsData().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF6F0]">
      <div className="w-12 h-12 border-4 border-orange-50 border-t-orange-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400 font-medium tracking-wide">
        {mounted && language === 'en' ? 'Loading news...' : 'Haberler yükleniyor...'}
      </p>
    </div>
  )

  const currentLang = mounted ? language : 'tr'
  const { news, press } = data

  return (
    <div className="bg-[#FDF6F0] min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 px-4 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full text-white text-base font-bold uppercase tracking-widest mb-8 border border-white/20">
              <Newspaper className="w-5 h-5" />
              {currentLang === 'tr' ? "KEFDER'den Güncel Bilgiler" : "Latest Updates from KEFDER"}
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {currentLang === 'tr' 
                ? 'Derneğimizden en son haberler, etkinlik duyuruları ve toplumsal farkındalık çalışmalarımız.'
                : 'Latest news from our association, event announcements and social awareness activities.'}
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <ScrollReveal key={item._id} delay={index * 0.1} direction="up">
                <article className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-2 h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={item.mainImage || "/images/asset_1.jpg"} 
                      alt={item.title?.[currentLang] || item.title?.tr}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-[11px] font-bold text-[#1F2A44]">
                          {new Date(item.publishedAt).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="text-xl font-bold text-[#1F2A44] mb-4 line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors">
                      {item.title?.[currentLang] || item.title?.tr}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {item.body?.[currentLang]?.[0]?.children?.[0]?.text || 
                       (currentLang === 'tr' 
                        ? 'Haber detayları için tıklayınız.' 
                        : 'Click for news details.')}
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        href={`/haberler/${item.slug}`}
                        className="inline-flex items-center gap-2 text-[#1F2A44] font-bold text-sm hover:text-orange-500 transition-all group/link"
                      >
                        {currentLang === 'tr' ? 'Devamını Oku' : 'Read More'}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200 mb-16">
            <Newspaper className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-400">
              {currentLang === 'tr' ? 'Henüz bir haber yayınlanmamış.' : 'No news published yet.'}
            </h3>
            <p className="text-gray-300 mt-2">
              {currentLang === 'tr' ? 'Daha sonra tekrar kontrol edebilirsiniz.' : 'Please check back later.'}
            </p>
          </div>
        )}

        {/* Basında Biz Section */}
        <section id="press" className="mt-32">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-kefder-teal/10 text-kefder-teal rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {t('about.press.badge')}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44]">{t('about.press.title')}</h2>
            </div>
          </ScrollReveal>

          {press.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {press.map((item: any, index: number) => (
                <ScrollReveal key={item._id} delay={index * 0.1} direction="up">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-white rounded-[32px] p-8 border border-gray-100 hover:border-kefder-teal/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-kefder-gray-light/30 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                        {item.sourceLogoUrl ? (
                          <img src={item.sourceLogoUrl} alt={item.sourceName} className="w-full h-full object-contain" />
                        ) : (
                          <Megaphone className="w-6 h-6 text-kefder-teal/40" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-kefder-gray/40 uppercase tracking-wider">
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-kefder-gray-dark group-hover:text-kefder-teal transition-colors mb-4 line-clamp-2 flex-1">
                      {item.title?.[currentLang] || item.title?.tr}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                      <span className="font-black text-xs uppercase tracking-widest text-kefder-teal">{item.sourceName}</span>
                      <div className="w-10 h-10 rounded-full bg-kefder-gray-light/30 flex items-center justify-center text-kefder-teal group-hover:bg-kefder-teal group-hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="text-center p-16 bg-white rounded-[40px] border border-dashed border-gray-200">
                <Megaphone className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 italic">{t('about.press.empty')}</p>
              </div>
            </ScrollReveal>
          )}
        </section>
      </div>
    </div>
  )
}
