'use client'

import { CalendarDays, ChevronLeft, ChevronRight, Clock3, List, MapPin, GraduationCap, Palette, Music, Landmark, Heart, Globe, Activity, Images, X, ChevronRight as ArrowRight, ChevronLeft as ArrowLeft, ZoomIn } from 'lucide-react'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { getActivitiesData } from './actions'
import { FileText, Download } from 'lucide-react'

const iconMap: Record<string, any> = {
  GraduationCap,
  Palette,
  Music,
  Landmark,
  Heart,
  Globe,
  Activity
}
import { useLanguage } from '@/context/LanguageContext'
import ScrollReveal from '@/components/shared/ScrollReveal'

type EventStatus = 'upcoming' | 'completed'

type LocalizedString = { tr: string; en: string }
type LocalizedBlock = { tr: any[]; en: any[] }

type EventItem = {
  _id: string
  title: LocalizedString
  description?: LocalizedBlock
  date: string
  time?: string
  location?: LocalizedString
  category?: string
  status?: EventStatus
}



function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat('tr-TR', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function getMonthGrid(currentDate: Date) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1
  const gridStart = new Date(year, month, 1 - startDay)

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    return date
  })
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getDayLabel(index: number) {
  const labels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
  return labels[index]
}

function formatCardDate(dateStr: string, lang: string = 'tr') {
  if (!dateStr) return { day: '--', month: '---', time: '--:--' }
  
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return { day: '--', month: '---', time: '--:--' }

  const day = `${date.getDate()}`.padStart(2, '0')
  const month = new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-US', { month: 'short' }).format(date)
  const time = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(date)

  return {
    day,
    month: month.replace('.', '').toUpperCase(),
    time
  }
}

function compareByDateAsc(a: EventItem, b: EventItem) {
  return new Date(a.date).getTime() - new Date(b.date).getTime()
}

function compareByDateDesc(a: EventItem, b: EventItem) {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

export default function ActivitiesPage() {
  const { language } = useLanguage()
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)
  const [events, setEvents] = useState<EventItem[]>([])
  const [archive, setArchive] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [memoryGalleries, setMemoryGalleries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Lightbox state
  const [lightbox, setLightbox] = useState<{ galleryIndex: number; imageIndex: number } | null>(null)

  const openLightbox = useCallback((galleryIndex: number, imageIndex: number) => {
    setLightbox({ galleryIndex, imageIndex })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ''
  }, [])

  const lightboxNext = useCallback(() => {
    if (!lightbox) return
    const gallery = memoryGalleries[lightbox.galleryIndex]
    setLightbox(prev => prev ? { ...prev, imageIndex: (prev.imageIndex + 1) % gallery.images.length } : null)
  }, [lightbox, memoryGalleries])

  const lightboxPrev = useCallback(() => {
    if (!lightbox) return
    const gallery = memoryGalleries[lightbox.galleryIndex]
    setLightbox(prev => prev ? { ...prev, imageIndex: (prev.imageIndex - 1 + gallery.images.length) % gallery.images.length } : null)
  }, [lightbox, memoryGalleries])

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') lightboxNext()
      if (e.key === 'ArrowLeft') lightboxPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, closeLightbox, lightboxNext, lightboxPrev])

  useEffect(() => {
    getActivitiesData()
      .then((data) => {
        setEvents(data.events)
        setArchive(data.archive)
        setCategories(data.categories)
        setMemoryGalleries(data.memoryGalleries || [])
      })
      .catch((error) => {
        console.error('Action fetch error:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => (event.status || 'upcoming') === 'upcoming')
        .sort(compareByDateAsc),
    [events]
  )

  const completedEvents = useMemo(
    () =>
      events
        .filter((event) => event.status === 'completed')
        .sort(compareByDateDesc),
    [events]
  )

  const calendarDays = useMemo(() => getMonthGrid(currentMonth), [currentMonth])

  const eventsByDate = useMemo(() => {
    const map: Record<string, EventItem[]> = {}
    for (const event of events) {
      if (!event.date) continue
      const dateKey = toDateKey(new Date(event.date))
      if (!map[dateKey]) map[dateKey] = []
      map[dateKey].push(event)
    }
    return map
  }, [events])

  const goPrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const goNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              <Activity className="w-4 h-4" />
              KEFDER FAALİYETLERİ
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Faaliyetlerimiz ve Etkinliklerimiz
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Toplumsal farkındalık yaratmak ve kültürel etkileşimi güçlendirmek için yürüttüğümüz çalışmaların tamamını burada bulabilirsiniz.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Sürdürdüğümüz Çalışmalar Section */}
      <section id="work" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex rounded-full bg-kefder-teal/10 px-4 py-1.5 text-sm font-semibold text-kefder-teal mb-4 uppercase tracking-widest">
                Çalışma Alanlarımız
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44] mb-6">Sürdürdüğümüz Çalışmalar</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Derneğimiz bünyesinde aktif olarak yürüttüğümüz ana faaliyet alanları ve çalışma grupları.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((activity, index) => {
              const IconComponent = iconMap[activity.icon] || Activity
              const title = activity.title?.[language] || activity.title?.tr || activity.title
              const desc = activity.description?.[language] || activity.description?.tr || activity.desc
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
                      <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 group-hover:text-kefder-teal transition-colors leading-tight">
                        {title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed line-clamp-4">
                        {desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section id="calendar" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
                Takvim
              </div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#1F2A44]">
                Etkinlik Takvimi
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-500">
                Yaklaşan ve geçmiş etkinliklerimizi görüntüleyin.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={() => setViewMode('list')}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    viewMode === 'list'
                      ? 'bg-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)]'
                      : 'bg-white text-[#1F2A44] ring-1 ring-black/10 hover:bg-orange-50'
                  }`}
                >
                  <List className="h-4 w-4" />
                  Liste Görünümü
                </button>

                <button
                  onClick={() => setViewMode('calendar')}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    viewMode === 'calendar'
                      ? 'bg-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)]'
                      : 'bg-white text-[#1F2A44] ring-1 ring-black/10 hover:bg-orange-50'
                  }`}
                >
                  <CalendarDays className="h-4 w-4" />
                  Takvim Görünümü
                </button>
              </div>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="rounded-3xl bg-white p-10 text-center text-lg text-gray-500 shadow-sm">
              Etkinlikler yükleniyor...
            </div>
          ) : viewMode === 'list' ? (
            <div className="grid gap-10 lg:grid-cols-2">
              <ScrollReveal direction="left" delay={0.1}>
                <div>
                  <SectionTitle title="Yaklaşan Etkinlikler" />
                  <div className="mt-6 space-y-6">
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map((event, index) => (
                        <ScrollReveal key={event._id} delay={index * 0.1} direction="up">
                          <EventCard event={event} showRegister />
                        </ScrollReveal>
                      ))
                    ) : (
                      <EmptyState text="Henüz yaklaşan etkinlik yok." />
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.3}>
                <div>
                  <SectionTitle title="Geçmiş Etkinlikler" />
                  <div className="mt-6 space-y-6">
                    {completedEvents.length > 0 ? (
                      completedEvents.map((event, index) => (
                        <ScrollReveal key={event._id} delay={index * 0.1} direction="up">
                          <EventCard event={event} />
                        </ScrollReveal>
                      ))
                    ) : (
                      <EmptyState text="Henüz geçmiş etkinlik yok." />
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ) : (
            <ScrollReveal direction="up" delay={0.2}>
              <div className="rounded-[28px] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-bold text-[#1F2A44] md:text-3xl">
                    {formatMonthYear(currentMonth)}
                  </h3>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={goPrevMonth}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition hover:bg-orange-100"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      onClick={goNextMonth}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition hover:bg-orange-100"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-3 md:gap-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-kefder-teal/5 py-3 text-center text-xs font-bold text-kefder-teal uppercase tracking-widest"
                    >
                      {getDayLabel(i)}
                    </div>
                  ))}

                  {calendarDays.map((date, index) => {
                    const dateKey = toDateKey(date)
                    const dayEvents = eventsByDate[dateKey] || []
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                    const isToday = toDateKey(date) === toDateKey(new Date())

                    return (
                      <div
                        key={`${dateKey}-${index}`}
                        onMouseEnter={() => setHoveredDate(dateKey)}
                        onMouseLeave={() => setHoveredDate(null)}
                        className={`relative min-h-[120px] rounded-2xl border p-4 transition-all duration-300 md:min-h-[140px] ${
                          isCurrentMonth
                            ? 'border-gray-100 bg-white hover:border-kefder-teal hover:shadow-xl'
                            : 'border-transparent bg-[#FAF7F3] text-gray-300'
                        } ${isToday ? 'ring-2 ring-kefder-teal shadow-lg shadow-kefder-teal/10' : ''}`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span
                            className={`text-lg font-black ${
                              isCurrentMonth ? 'text-kefder-gray-dark' : 'text-gray-300'
                            }`}
                          >
                            {date.getDate()}
                          </span>

                          {dayEvents.length > 0 && (
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isCurrentMonth ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {dayEvents.length}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event._id}
                              className={`truncate rounded-lg px-2 py-1 text-[11px] font-medium ${
                                (event.status || 'upcoming') === 'upcoming'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {event.title[language] || event.title['tr']}
                            </div>
                          ))}

                          {dayEvents.length > 2 && (
                            <div className="text-[11px] font-semibold text-orange-500">
                              +{dayEvents.length - 2} etkinlik daha
                            </div>
                          )}
                        </div>

                        {hoveredDate === dateKey && dayEvents.length > 0 && (
                          <div className="absolute left-1/2 top-full z-20 mt-2 w-[260px] -translate-x-1/2 rounded-2xl border border-orange-100 bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                            <div className="mb-2 text-sm font-bold text-[#1F2A44]">
                              {date.toLocaleDateString('tr-TR')}
                            </div>

                            <div className="space-y-3">
                              {dayEvents.map((event) => (
                                <div key={event._id} className="rounded-xl bg-[#FAF7F3] p-3">
                                  <div className="text-sm font-semibold text-[#1F2A44]">
                                    {event.title[language] || event.title['tr']}
                                  </div>
                                  <div className="mt-1 text-xs text-gray-500 line-clamp-2">
                                    {/* Portable Text Snippet */}
                                    {event.description?.[language]?.[0]?.children?.[0]?.text || '...'}
                                  </div>
                                  <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
                                    <span className="inline-flex items-center gap-1">
                                      <Clock3 className="h-3 w-3" />
                                      {event.time || '-'}
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {event.location?.[language] || event.location?.['tr'] || '-'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>

      {/* Anılarımız Bölümü */}
      <section id="memories" className="py-24 px-4 bg-[#FDF6F0]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600 mb-4 uppercase tracking-widest">
                Anı Defteri
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44] mb-6">Anılarımız</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Birlikte yaşadığımız güzel anlar, paylaştığımız değerli etkinlikler ve unutulmaz anılarımız.</p>
            </div>
          </ScrollReveal>

          {memoryGalleries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memoryGalleries.map((gallery, galleryIndex) => (
                <ScrollReveal key={gallery._id} delay={galleryIndex * 0.1}>
                  <button
                    onClick={() => openLightbox(galleryIndex, 0)}
                    className="group relative w-full text-left focus:outline-none"
                  >
                    {/* Album Cover Container */}
                    <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-white shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      <img
                        src={gallery.coverImage || gallery.images?.[0]?.url || "/images/placeholder.jpg"}
                        alt={gallery.title?.[language] || gallery.title?.tr || ''}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Photo Count Badge */}
                      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-2">
                        <Images className="w-3.5 h-3.5" />
                        {gallery.images?.length || 0} Fotoğraf
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-8">
                        {gallery.date && (
                          <div className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {new Date(gallery.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}
                          </div>
                        )}
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                          {gallery.title?.[language] || gallery.title?.tr || ''}
                        </h3>
                        {gallery.description && (
                          <p className="text-white/70 text-sm line-clamp-2 font-light">
                            {gallery.description?.[language] || gallery.description?.tr || ''}
                          </p>
                        )}
                      </div>

                      {/* Hover Action Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
                          <ZoomIn className="w-8 h-8" />
                        </div>
                      </div>
                    </div>

                    {/* Reflection/Decoration effect */}
                    <div className="absolute -bottom-4 inset-x-8 h-8 bg-black/5 blur-2xl rounded-full -z-10 group-hover:bg-orange-500/10 transition-colors duration-500" />
                  </button>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center mx-auto mb-6">
                <Images className="w-10 h-10 text-orange-200" />
              </div>
              <p className="text-gray-400 text-lg">Henüz anı fotoğrafı eklenmemiş.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && memoryGalleries[lightbox.galleryIndex]?.images?.[lightbox.imageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-1.5 rounded-full text-white text-sm font-semibold">
            {lightbox.imageIndex + 1} / {memoryGalleries[lightbox.galleryIndex].images.length}
          </div>

          {/* Gallery title */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {memoryGalleries[lightbox.galleryIndex].title?.[language] || memoryGalleries[lightbox.galleryIndex].title?.tr}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[80vh] mx-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={memoryGalleries[lightbox.galleryIndex].images[lightbox.imageIndex].url}
              alt={memoryGalleries[lightbox.galleryIndex].images[lightbox.imageIndex].caption || ''}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {memoryGalleries[lightbox.galleryIndex].images[lightbox.imageIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl">
                <p className="text-white text-sm text-center">
                  {memoryGalleries[lightbox.galleryIndex].images[lightbox.imageIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); lightboxNext() }}
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-1 px-4">
            {memoryGalleries[lightbox.galleryIndex].images.map((img: any, i: number) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, imageIndex: i } : null) }}
                className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  i === lightbox.imageIndex ? 'border-orange-400 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dosya Arşivi Bölümü */}
      <section id="archive" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex rounded-full bg-kefder-teal/10 px-4 py-1.5 text-sm font-semibold text-kefder-teal mb-4 uppercase tracking-widest">
                Dosya Arşivi
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44] mb-6">Kurumsal Dökümanlar ve Raporlar</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Derneğimizin faaliyet raporlarına, tüzüğüne ve diğer önemli belgelerine buradan ulaşabilirsiniz.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archive.length > 0 ? (
              archive.map((doc, index) => (
                <ScrollReveal key={doc._id} delay={index * 0.05} direction="up">
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 bg-[#FAF7F3] rounded-3xl border border-transparent hover:border-kefder-teal/20 hover:bg-white hover:shadow-xl transition-all group h-full"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xs uppercase shadow-sm ${
                        doc.fileType === 'pdf' ? 'bg-red-50 text-red-500' : 
                        doc.fileType === 'doc' ? 'bg-blue-50 text-blue-500' : 
                        doc.fileType === 'ppt' ? 'bg-orange-50 text-orange-600' :
                        'bg-white text-kefder-teal'
                      }`}>
                        {doc.fileType || 'File'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1F2A44] group-hover:text-kefder-teal transition-colors text-lg">
                          {doc.title?.[language] || doc.title?.tr}
                        </span>
                        <span className="text-xs text-gray-400 mt-1 uppercase font-medium tracking-wider">
                          Dökümanı Görüntüle
                        </span>
                      </div>
                    </div>
                    <Download className="w-6 h-6 text-gray-300 group-hover:text-kefder-teal transition-colors" />
                  </a>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <FileText className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400">Henüz arşivlenmiş dosya bulunmamaktadır.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="border-b border-orange-100 pb-4">
      <h3 className="text-2xl font-bold text-[#1F2A44] md:text-3xl">{title}</h3>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm">{text}</div>
}

function EventCard({
  event,
  showRegister = false,
}: {
  event: EventItem
  showRegister?: boolean
}) {
  const { language } = useLanguage()
  const { day, month, time } = formatCardDate(event.date, language)

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex h-[126px] w-[92px] shrink-0 flex-col items-center justify-center rounded-[20px] bg-[#FAF7F3] text-center">
          <div className="text-4xl font-bold leading-none text-orange-500">{day}</div>
          <div className="mt-2 text-xl font-bold uppercase text-gray-500">{month}</div>
        </div>

        <div className="flex-1">
          <h4 className="text-2xl font-bold text-[#1F2A44]">{event.title?.[language] || event.title?.['tr']}</h4>
          <p className="mt-2 text-base text-gray-500">
            {event.description?.[language]?.[0]?.children?.[0]?.text || '...'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-orange-500" />
              {event.time || time}
            </span>

            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              {event.location?.[language] || event.location?.['tr'] || (language === 'tr' ? 'Belirtilmedi' : 'Not specified')}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                (event.status || 'upcoming') === 'upcoming'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {(event.status || 'upcoming') === 'upcoming' 
                ? (language === 'tr' ? 'Yaklaşan' : 'Upcoming') 
                : (language === 'tr' ? 'Tamamlandı' : 'Completed')}
            </span>

            {showRegister && (
              <button className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)] transition hover:bg-orange-600">
                {language === 'tr' ? 'Kayıt Ol' : 'Register Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



