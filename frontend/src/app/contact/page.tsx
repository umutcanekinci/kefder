"use client"
import { FaFacebook as Facebook, FaInstagram as Instagram, FaYoutube as Youtube, FaLinkedin as Linkedin } from 'react-icons/fa';
import { MapPin, Phone, Mail, Clock3, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* ÜST BAŞLIK ALANI */}
      <section className="bg-[#F4F1EC] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1F2A44]">
            {t('contact.pageTitle')}
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <span className="font-medium text-orange-500">{t('nav.home')}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{t('contact.pageTitle')}</span>
          </div>
        </div>
      </section>

      {/* ANA İÇERİK */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* ÜST ORTA BAŞLIK */}
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
              {t('contact.badge')}
            </div>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#1F2A44]">
              {t('contact.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-500">
              {t('contact.desc')}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* SOL TARAF */}
            <div>
              <h3 className="text-3xl font-bold text-[#1F2A44]">
                {t('contact.info.title')}
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-8 text-gray-500">
                {t('contact.info.desc')}
              </p>

              <div className="mt-8 space-y-5">
                <InfoCard
                  icon={<MapPin className="h-6 w-6" />}
                  title={t('contact.info.address')}
                  lines={[
                    'Cumhuriyet Bulvarı, No: 123',
                    'Konak, İzmir, Türkiye'
                  ]}
                />

                <InfoCard
                  icon={<Phone className="h-6 w-6" />}
                  title={t('contact.info.phone')}
                  lines={[
                    '+90 (232) 123 45 67',
                    '+90 (555) 987 65 43'
                  ]}
                />

                <InfoCard
                  icon={<Mail className="h-6 w-6" />}
                  title={t('contact.info.email')}
                  lines={[
                    'iletisim@kefder.org',
                    'info@kefder.org'
                  ]}
                />

                <InfoCard
                  icon={<Clock3 className="h-6 w-6" />}
                  title={t('contact.info.hours')}
                  lines={[
                    t('contact.info.hours.detail'),
                  ]}
                />
              </div>

              {/* SOSYAL MEDYA */}
              <div className="mt-12">
                <h4 className="text-xl font-bold text-[#1F2A44]">
                  {t('contact.social.title')}
                </h4>
                <p className="mt-2 text-sm text-gray-500">
                  {t('contact.social.desc')}
                </p>
                <div className="mt-4 flex gap-4">
                  <SocialButton icon={<Facebook className="w-5 h-5" />} href="#" />
                  <SocialButton icon={<Instagram className="w-5 h-5" />} href="#" />
                  <SocialButton icon={<Youtube className="w-5 h-5" />} href="#" />
                  <SocialButton icon={<Linkedin className="w-5 h-5" />} href="#" />
                </div>
              </div>
            </div>

            {/* SAĞ TARAF (FORM) */}
            <div className="rounded-[32px] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-10">
              <h3 className="text-2xl font-bold text-[#1F2A44]">
                {t('contact.form.title')}
              </h3>

              <form className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-gray-200 bg-[#FAF7F3] px-4 py-3.5 text-sm text-[#1F2A44] transition-colors focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-gray-200 bg-[#FAF7F3] px-4 py-3.5 text-sm text-[#1F2A44] transition-colors focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 bg-[#FAF7F3] px-4 py-3.5 text-sm text-[#1F2A44] transition-colors focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows={5}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAF7F3] px-4 py-3.5 text-sm text-[#1F2A44] transition-colors focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                    placeholder="Bize ne iletmek istersiniz?"
                  />
                </div>

                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)] transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_10px_25px_rgba(249,115,22,0.35)] focus:ring-4 focus:ring-orange-500/20 focus:outline-none"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  {t('contact.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* HARİTA ALANI */}
      <section className="h-[400px] w-full bg-gray-200">
        <iframe
          title="KEFDER Konum"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000.0000000000!2d27.0000000!3d38.4000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8!2s%C4%B0zmir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        ></iframe>
      </section>
    </div>
  )
}

function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode
  title: string
  lines: string[]
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-[#1F2A44]">{title}</h4>
        <div className="mt-1 flex flex-col gap-0.5 text-sm text-gray-600">
          {lines.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition-all hover:-translate-y-1 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md"
    >
      {icon}
    </a>
  )
}
