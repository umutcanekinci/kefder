"use client"
import { useLanguage } from '@/context/LanguageContext'

export default function MembershipPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-[#FDF6F0] min-h-screen">
      {/* ÜST BANNER */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">{t('volunteer.title')}</h1>
        <p className="text-sm opacity-90">{t('volunteer.breadcrumb')}</p>
      </div>

      {/* ANA İÇERİK */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-4">
        {/* SOL TARAF */}
        <div>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
            {t('volunteer.why.badge')}
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-4">
            {t('volunteer.why.title')}
          </h2>
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
        {/* SAĞ TARAF FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold mb-4">{t('volunteer.form.title')}</h3>
          <input
            type="text"
            placeholder={t('volunteer.form.name')}
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder={t('volunteer.form.email')}
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder={t('volunteer.form.phone')}
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <textarea
            placeholder={t('volunteer.form.message')}
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
            {t('volunteer.form.submit')}
          </button>
        </div>
      </div>
    </div>
  )
}
