"use client"
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'

const activities = [
  {
    id: 1,
    title: 'Kültürel Etkileşim',
    desc: 'Farklı kültürlerin bir araya gelerek ortak değerler ürettiği atölye ve projeler.',
    category: 'Etkileşim',
    image: '/images/asset_1.jpg'
  },
  {
    id: 2,
    title: 'Sivil Toplum Eğitimi',
    desc: 'Gençlerin ve gönüllülerin sivil toplum alanında kapasitelerini artıracak eğitimler.',
    category: 'Eğitim',
    image: '/images/hero_img.jpg'
  },
  {
    id: 3,
    title: 'Çevre ve Doğa',
    desc: 'Sürdürülebilir bir gelecek için ekoloji ve doğa bilinci odaklı faaliyetler.',
    category: 'Ekoloji',
    image: '/images/asset_1.jpg'
  }
]

export default function HomeActivities() {
  return (
    <section className="py-24 px-4 bg-[#FDF6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-kefder-orange/10 text-kefder-orange-dark rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              FAALİYETLERİMİZ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-kefder-gray-dark mb-4">Neler Yapıyoruz?</h2>
            <p className="text-kefder-gray text-lg">Toplumsal fayda odaklı ana faaliyet alanlarımız ve yürüttüğümüz çalışmalar.</p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {activities.map((activity, index) => (
            <ScrollReveal key={activity.id} delay={index * 0.1}>
              <div className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-gray-100 h-full">
                {/* Image Section */}
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-kefder-orange shadow-sm uppercase tracking-wider">
                    {activity.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-kefder-gray-dark mb-4 group-hover:text-kefder-orange transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-kefder-gray mb-8 leading-relaxed">
                    {activity.desc}
                  </p>
                  <Link 
                    href="/activities" 
                    className="inline-flex items-center gap-2 text-kefder-orange font-bold group/link"
                  >
                    Detayları Gör
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
