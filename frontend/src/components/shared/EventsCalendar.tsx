"use client"
import React, { useState, useEffect } from 'react'
import { Clock, MapPin, CalendarDays, ChevronLeft, ChevronRight, X, Download } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { getEvents } from '@/app/homeActions'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { PortableText } from '@portabletext/react'

export default function EventsCalendar() {
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const { language, t } = useLanguage()
  
  useEffect(() => {
    getEvents().then(setEvents)
  }, [])

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentMonth = language === 'tr' ? "Nisan 2026" : "April 2026"

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', { month: 'short' }).toUpperCase(),
      time: date.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2.5 bg-kefder-teal/10 text-kefder-teal rounded-full text-base font-bold uppercase tracking-widest mb-4">
              {t('activities.calendar.title')}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            {/* Left: Modern Calendar UI */}
            <div className="bg-kefder-gray-light/30 rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold text-kefder-gray-dark">{currentMonth}</h3>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-kefder-gray/40 hover:text-kefder-teal hover:shadow-md transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-kefder-gray/40 hover:text-kefder-teal hover:shadow-md transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-3 md:gap-5">
                {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-kefder-teal/50 uppercase mb-2 tracking-wider">{day}</div>
                ))}
                {days.map(day => {
                  const isSelected = day === 18
                  const hasEvent = events.some(e => new Date(e.eventDate).getDate() === day)
                  return (
                    <div key={day} className="relative flex flex-col items-center justify-center">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[20px] flex items-center justify-center text-base md:text-xl font-black transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'bg-kefder-teal text-white shadow-[0_10px_25px_rgba(0,128,128,0.3)] scale-110 z-10' 
                        : 'bg-white text-kefder-gray-dark hover:bg-kefder-teal/10 hover:text-kefder-teal hover:shadow-lg'
                    }`}>
                        {day}
                      </div>
                      {hasEvent && !isSelected && (
                        <div className="absolute -bottom-1 w-1.5 h-1.5 bg-kefder-teal rounded-full"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Event List */}
            <div className="flex flex-col gap-6">
              {events.length > 0 ? events.slice(0, 3).map(event => {
                const { day, month, time } = formatDate(event.eventDate)
                return (
                  <div 
                    key={event._id} 
                    onClick={() => setSelectedEvent(event)}
                    className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                  >
                    {/* Date Box */}
                    <div className="w-20 h-20 shrink-0 bg-kefder-teal rounded-2xl flex flex-col items-center justify-center text-white">
                      <span className="text-2xl font-black leading-none">{day}</span>
                      <span className="text-xs font-bold opacity-80">{month}</span>
                    </div>
                    
                    {/* Info */}
                    <div className="flex flex-col justify-center">
                      <h4 className="text-xl font-bold text-kefder-gray-dark group-hover:text-kefder-teal transition-colors mb-2">
                        {event.title?.[language] || event.title?.tr}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-4 h-4 text-kefder-teal" />
                          {time}
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-4 h-4 text-kefder-teal" />
                          {event.location?.[language] || event.location?.tr}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) : (
                <div className="p-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400 italic">Henüz etkinlik eklenmemiş.</p>
                </div>
              )}

              <Link 
                href="/activities" 
                className="mt-4 w-full bg-kefder-teal hover:bg-kefder-teal-dark text-white py-5 rounded-3xl font-bold text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm"
              >
                {language === 'tr' ? 'Tüm Etkinlikleri Gör' : 'See All Events'}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-kefder-gray-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Poster Section */}
              <div className="md:w-1/2 relative bg-kefder-gray-dark min-h-[300px] md:min-h-full">
                {selectedEvent.posterUrl ? (
                  <img 
                    src={selectedEvent.posterUrl} 
                    alt="Event Poster" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-4">
                    <CalendarDays className="w-20 h-20" />
                    <span className="font-bold">Afiş Yüklenmemiş</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-kefder-gray-dark/80 via-transparent to-transparent md:hidden" />
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <div className="inline-block px-4 py-1.5 bg-kefder-teal/10 text-kefder-teal rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    {formatDate(selectedEvent.eventDate).month} {formatDate(selectedEvent.eventDate).day}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-kefder-gray-dark mb-4">
                    {selectedEvent.title?.[language] || selectedEvent.title?.tr}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-sm text-kefder-gray font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-kefder-teal" />
                      {formatDate(selectedEvent.eventDate).time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-kefder-teal" />
                      {selectedEvent.location?.[language] || selectedEvent.location?.tr}
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-kefder-gray">
                  {selectedEvent.content?.[language] ? (
                    <PortableText value={selectedEvent.content[language]} />
                  ) : selectedEvent.content?.tr ? (
                    <PortableText value={selectedEvent.content.tr} />
                  ) : (
                    <p>Etkinlik detayları yakında paylaşılacaktır.</p>
                  )}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
                  <button className="flex-1 bg-kefder-teal text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-kefder-teal-dark transition-all shadow-lg hover:shadow-kefder-teal/20">
                    <CalendarDays className="w-5 h-5" />
                    Takvime Ekle
                  </button>
                  {selectedEvent.posterUrl && (
                    <a 
                      href={selectedEvent.posterUrl} 
                      download 
                      className="w-16 h-16 bg-kefder-gray-light flex items-center justify-center rounded-2xl text-kefder-gray-dark hover:bg-gray-200 transition-all"
                    >
                      <Download className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
