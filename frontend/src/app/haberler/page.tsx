"use client"
import { useEffect, useState } from 'react'
import { getNews } from './actions'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    setMounted(true)
    getNews().then(data => {
      setNews(data)
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

  return (
    <div className="bg-[#FDF6F0] min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-[#1F2A44] text-white py-24 px-4 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            <Newspaper className="w-4 h-4" />
            {currentLang === 'tr' ? "KEFDER'den Güncel Bilgiler" : "Latest Updates from KEFDER"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {currentLang === 'tr' ? 'Haberler ve Duyurular' : 'News and Announcements'}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {currentLang === 'tr' 
              ? 'Derneğimizden en son haberler, etkinlik duyuruları ve toplumsal farkındalık çalışmalarımız.'
              : 'Latest news from our association, event announcements and social awareness activities.'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item) => (
              <article key={item._id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-2">
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
                    {/* Snippet from body or a localized static description if body is complex */}
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
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <Newspaper className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-400">
              {currentLang === 'tr' ? 'Henüz bir haber yayınlanmamış.' : 'No news published yet.'}
            </h3>
            <p className="text-gray-300 mt-2">
              {currentLang === 'tr' ? 'Daha sonra tekrar kontrol edebilirsiniz.' : 'Please check back later.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
