"use client"
import React from 'react'
import { Clock, MapPin, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'

export default function EventsCalendar() {
  // Static placeholder data for UI
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentMonth = "Nisan 2026"
  
  const calendarEvents = [
    { id: 1, title: 'Kültür Atölyesi', date: '01', month: 'NİS', time: '14:00', loc: 'İzmir' },
    { id: 2, title: 'Gençlik Buluşması', date: '12', month: 'NİS', time: '10:30', loc: 'Bornova' },
    { id: 3, title: 'Ekoloji Yürüyüşü', date: '18', month: 'NİS', time: '09:00', loc: 'Karşıyaka' },
  ]

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-kefder-orange/10 text-kefder-orange-dark rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              ETKİNLİK TAKVİMİ
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-kefder-gray-dark">Yaklaşan Etkinlikler</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            {/* Left: Modern Calendar UI */}
            <div className="bg-[#FAF7F3] rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold text-kefder-gray-dark">{currentMonth}</h3>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-kefder-gray/40 hover:text-kefder-orange hover:shadow-md transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-kefder-gray/40 hover:text-kefder-orange hover:shadow-md transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 md:gap-4">
                {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-kefder-gray-dark uppercase mb-4">{day}</div>
                ))}
                {days.map(day => {
                  const isSelected = day === 18
                  const hasEvent = [1, 12, 18, 25].includes(day)
                  return (
                    <div key={day} className="relative aspect-square flex flex-col items-center justify-center">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-kefder-orange text-white shadow-lg' 
                        : 'bg-white text-kefder-gray-dark hover:bg-kefder-orange/10 hover:text-kefder-orange'
                    }`}>
                        {day}
                      </div>
                      {hasEvent && !isSelected && (
                        <div className="absolute bottom-1 w-1 h-1 bg-kefder-orange/30 rounded-full"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Event List */}
            <div className="flex flex-col gap-6">
              {calendarEvents.map(event => (
                <div key={event.id} className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  {/* Date Box */}
                  <div className="w-20 h-20 shrink-0 bg-kefder-orange rounded-2xl flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-black leading-none">{event.date}</span>
                    <span className="text-xs font-bold opacity-80">{event.month}</span>
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col justify-center">
                    <h4 className="text-xl font-bold text-kefder-gray-dark group-hover:text-kefder-orange transition-colors mb-2">
                      {event.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-kefder-teal" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-kefder-teal" />
                        {event.loc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link 
                href="/activities" 
                className="mt-4 w-full bg-kefder-orange hover:bg-kefder-orange-dark text-white py-5 rounded-3xl font-bold text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm"
              >
                Tüm Etkinlikleri Gör
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
