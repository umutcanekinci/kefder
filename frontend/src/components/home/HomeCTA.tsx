"use client"
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'

export default function HomeCTA() {
  return (
    <section className="py-24 px-6 bg-kefder-gray-dark relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-kefder-teal/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-kefder-orange/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Gönüllü Ailemize Katılın
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              Birlikte daha güçlüyüz. Kültürel farkındalık için bir adım atın ve topluluğumuza katkıda bulunun.
            </p>

            <Link 
              href="/volunteer" 
              className="group flex items-center gap-3 bg-kefder-orange hover:bg-kefder-orange-dark text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-[0_10px_25px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-1"
            >
              Hemen Gönüllü Ol
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
