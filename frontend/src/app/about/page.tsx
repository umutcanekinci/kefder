"use client"
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getAboutData } from './actions'
import { PortableText } from '@portabletext/react'
import LogoMeaning from '@/components/LogoMeaning'
import {
  Users,
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Target,
  Quote,
} from 'lucide-react'
// import SidebarLinks removed as per user request
import ScrollReveal from '@/components/shared/ScrollReveal'

export default function AboutPage() {
  const { t, language } = useLanguage()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAboutData().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF6F0]">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-medium">{language === 'tr' ? 'İçerikler yükleniyor...' : 'Loading content...'}</p>
    </div>
  )

  const team = data?.team || []
  const about = data?.about || {}
  const officialBylawsUrl = about?.officialBylawsUrl
  const activityReportUrl = about?.activityReportUrl

  return (
    <div className="bg-[#FDF6F0] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full text-white text-base font-bold uppercase tracking-widest mb-8 border border-white/20">
              <Target className="w-5 h-5" />
              {t('nav.about')}
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              {about?.description?.[language] || about?.description?.tr || t('about.hero.subtitle')}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Motivasyon Sözü Section */}
      {about?.quote?.[language] && (
        <section className="py-8 px-4 bg-gray-50/50">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-3">
                <Quote className="w-7 h-7 text-orange-200" />
              </div>
              <blockquote className="text-base md:text-lg font-serif italic text-gray-500 leading-relaxed mb-3">
                "{about.quote[language]}"
              </blockquote>
              <cite className="text-sm font-bold text-[#1F2A44] not-italic">— Mustafa Kemal Atatürk</cite>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Felsefemiz Section */}
      <section id="philosophy" className="scroll-mt-24 py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <div className="inline-block px-5 py-2.5 bg-orange-50 text-orange-600 rounded-full text-base font-bold uppercase tracking-widest mb-2">
                  {t('about.philosophy.badge')}
                </div>
<div className="prose prose-lg text-gray-600 max-w-none">
                  {about?.philosophyText?.[language] ? (
                    <PortableText value={about.philosophyText[language]} />
                  ) : (
                    <p>{t('about.philosophy.default')}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                  <img
                    src={about?.philosophyImageUrl || "/images/asset_1.jpg"}
                    alt="Felsefemiz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500 rounded-full -z-10"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Logo Anlamı Section */}
      {about?.logoFeatures?.length > 0 && (
        <LogoMeaning features={about.logoFeatures} language={language} />
      )}

      {/* Misyon & Vizyon Section */}
      <section id="mission" className="scroll-mt-24 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 h-full">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">{t('about.mission.label')}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {about?.mission?.[language] || about?.mission?.tr}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 h-full">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">{t('about.vision.label')}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {about?.vision?.[language] || about?.vision?.tr}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* Neler Yapıyoruz */}
      {about?.activities?.length > 0 && (
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A44] mb-6">{t('about.doing.title')}</h2>
              <p className="text-gray-600 mb-10 text-lg">{t('about.doing.desc')}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {about.activities.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-4 min-h-[72px] bg-white rounded-2xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="font-semibold text-[#1F2A44]">{item[language] || item.tr}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Ekip */}
      <section id="team" className="scroll-mt-24 py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="inline-block px-5 py-2.5 bg-orange-50 text-orange-600 rounded-full text-base font-bold uppercase tracking-widest mb-6">{t('nav.about.team')}</div>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">{t('about.team.subtitle2')}</p>
            </div>
          </ScrollReveal>

          {team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {team.map((member: any, index: number) => (
                <ScrollReveal key={member._id} delay={index * 0.1}>
                  <div className="group">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3">
                      <img
                        src={member.imageUrl || "/images/placeholder-user.png"}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-kefder-teal/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white font-bold text-lg">{member.name}</p>
                          <p className="text-orange-400 text-sm font-medium">{member.role?.[language] || member.role?.tr}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-[#1F2A44] group-hover:text-orange-500 transition-colors">{member.name}</h3>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mt-1">{member.role?.[language] || member.role?.tr}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="text-center p-12 bg-[#FDF6F0] rounded-3xl border border-dashed border-gray-300">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">{t('about.team.empty')}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Kurumsal Belgeler */}
      <section id="documents" className="scroll-mt-24 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-kefder-teal/10 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck className="w-8 h-8 text-kefder-teal" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-kefder-gray-dark mb-4">{t('about.documents.title')}</h3>
              <p className="text-kefder-gray mb-10 leading-relaxed text-lg">
                {t('about.bylaws.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {activityReportUrl && (
                  <a
                    href={activityReportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 bg-orange-500 text-white rounded-3xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 group flex-1"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{t('about.activityReport.title')}</span>
                        <span className="text-xs text-white/70 uppercase font-medium">{t('about.activityReport.button')}</span>
                      </div>
                    </div>
                    <Download className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                )}
                {officialBylawsUrl && (
                  <a
                    href={officialBylawsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 bg-kefder-teal text-white rounded-3xl hover:bg-kefder-teal-dark transition-all shadow-lg hover:shadow-kefder-teal/20 group flex-1"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{t('about.bylaws.title')}</span>
                        <span className="text-xs text-white/70 uppercase font-medium">{t('about.bylaws.officialPdf')}</span>
                      </div>
                    </div>
                    <Download className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                )}
                {!activityReportUrl && !officialBylawsUrl && (
                  <div className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-3xl text-center w-full">
                    <p className="text-gray-400 italic">{t('about.documents.empty')}</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Üyesi Olduğumuz Ağlar */}
      <section id="networks" className="scroll-mt-24 py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-5 py-2.5 bg-orange-50 text-orange-600 rounded-full text-base font-bold uppercase tracking-widest mb-16">{t('about.networks.badge')}</div>
          <div className="flex flex-wrap justify-center gap-12 items-center transition-all duration-700">
            {about?.networks?.length > 0 ? (
              about.networks.map((network: any, index: number) => {
                const content = (
                  <div className="flex flex-col items-center gap-4 group cursor-pointer relative">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 group-hover:border-orange-200 transition-all shadow-sm group-hover:shadow-lg overflow-hidden relative">
                      {network.logoUrl ? (
                        <img src={network.logoUrl} alt={network.description} className="w-full h-full object-contain p-4 transition-all duration-500" />
                      ) : (
                        <span className="font-black text-2xl text-gray-400 group-hover:text-orange-500 uppercase">Logo</span>
                      )}
                    </div>

                    {/* Tooltip Bubble */}
                    {network.shortDescription && (
                      <div className="absolute bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2 w-72 md:w-80 p-5 bg-white shadow-2xl rounded-3xl text-kefder-gray-dark text-xs leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 border border-gray-100 translate-y-2 group-hover:translate-y-0 text-left">
                        <div className="mb-2 font-bold text-orange-500 border-b border-orange-100 pb-1">{network.description}</div>
                        {network.shortDescription}
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                      </div>
                    )}
                    <span className="text-sm font-bold text-gray-600 group-hover:text-[#1F2A44] transition-colors text-center max-w-[150px] leading-tight">
                      {network.description}
                    </span>
                  </div>
                );

                return network.url ? (
                  <a key={index} href={network.url} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
                    {content}
                  </a>
                ) : (
                  <div key={index} className="opacity-80 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
                    {content}
                  </div>
                );
              })
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-80 grayscale">
                <div className="flex flex-col items-center gap-4 group cursor-default">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 transition-all shadow-sm overflow-hidden">
                    <span className="font-black text-2xl text-gray-300">STGM</span>
                  </div>
                  <span className="text-sm font-bold text-gray-500 text-center max-w-[150px]">Sivil Toplum Geliştirme Merkezi</span>
                </div>
                <div className="flex flex-col items-center gap-4 group cursor-default">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 transition-all shadow-sm overflow-hidden">
                    <span className="font-black text-2xl text-gray-300">İKK</span>
                  </div>
                  <span className="text-sm font-bold text-gray-500 text-center max-w-[150px]">İzmir Kent Konseyi</span>
                </div>
                <div className="flex flex-col items-center gap-4 group cursor-default">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 transition-all shadow-sm overflow-hidden">
                    <span className="font-black text-2xl text-gray-300">UGK</span>
                  </div>
                  <span className="text-sm font-bold text-gray-500 text-center max-w-[150px]">Ulusal Gençlik Konseyi</span>
                </div>
                <div className="flex flex-col items-center gap-4 group cursor-default">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 transition-all shadow-sm overflow-hidden">
                    <span className="font-black text-2xl text-gray-300">ALF</span>
                  </div>
                  <span className="text-sm font-bold text-gray-500 text-center max-w-[150px]">Anna Lindh Vakfı</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
