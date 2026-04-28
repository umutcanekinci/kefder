"use client"
import { useLanguage } from '@/context/LanguageContext'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { Users } from 'lucide-react'

export default function MembershipPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-[#FDF6F0]">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full text-white text-base font-bold uppercase tracking-widest mb-8 border border-white/20">
              <Users className="w-5 h-5" />
              {t('volunteer.breadcrumb')}
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {t('volunteer.subtitle')}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ANA İÇERİK */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 pt-16 pb-24 px-4">
        {/* SOL TARAF */}
        <ScrollReveal direction="left">
          <div>
            <span className="bg-orange-100 text-orange-600 px-5 py-2.5 rounded-full text-base font-bold uppercase tracking-widest">
              {t('volunteer.why.badge')}
            </span>
            <p className="text-gray-600 mb-6">
              {t('volunteer.why.desc')}
            </p>
            <ul className="space-y-4 text-gray-700">
              <li>✔ {t('volunteer.why.list1')}</li>
              <li>✔ {t('volunteer.why.list2')}</li>
              <li>✔ {t('volunteer.why.list3')}</li>
              <li>✔ {t('volunteer.why.list4')}</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* SAĞ TARAF FORM */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-orange-100">
            <h3 className="text-xl font-bold mb-4">{t('volunteer.form.title')}</h3>
            <input
              type="text"
              placeholder={t('volunteer.form.name')}
              className="w-full mb-3 p-3 border border-gray-100 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
            />
            <input
              type="email"
              placeholder={t('volunteer.form.email')}
              className="w-full mb-3 p-3 border border-gray-100 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
            />
            <input
              type="text"
              placeholder={t('volunteer.form.phone')}
              className="w-full mb-3 p-3 border border-gray-100 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
            />
            <textarea
              placeholder={t('volunteer.form.message')}
              className="w-full mb-4 p-3 border border-gray-100 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
              rows={4}
            />
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition shadow-lg shadow-orange-500/20">
              {t('volunteer.form.submit')}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
