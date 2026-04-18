"use client"
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getAboutData } from './actions'
import { 
  Target, 
  Users, 
  FileText, 
  Globe, 
  ChevronRight, 
  Download,
  ShieldCheck,
  Heart
} from 'lucide-react'

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
  const reports = data?.documents?.filter((d: any) => d.category === 'faaliyetRaporu') || []
  const statutes = data?.documents?.filter((d: any) => d.category === 'tuzuk') || []

  return (
    <div className="bg-[#FDF6F0] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1F2A44] text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">{t('nav.about')}</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {data?.settings?.description?.[language] || data?.settings?.description?.tr || t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Amaç ve Değerler */}
      <section id="mission" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 text-orange-500 font-bold mb-6">
                <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
                <span className="uppercase tracking-widest text-sm">{t('about.mission.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A44] mb-8 leading-tight">{t('about.mission.title')}</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-3 uppercase tracking-wider">{t('about.mission.label')}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {data?.settings?.mission?.[language] || data?.settings?.mission?.tr || "KefDer olarak amacımız; bireylerin kültürel etkileşim kapasitelerini artırmak, toplumsal farkındalık düzeyini yükseltmek ve sürdürülebilir bir dayanışma ağı oluşturmaktır."}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-3 uppercase tracking-wider">{t('about.vision.label')}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {data?.settings?.vision?.[language] || data?.settings?.vision?.tr || "Kültürel farklılıkların zenginlik kabul edildiği, toplumsal barış ve farkındalığın en üst düzeyde olduğu bir gelecek hayal ediyoruz."}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img src="/images/asset_1.jpg" alt="Kefder Çalışma" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-orange-500 text-white p-10 rounded-3xl shadow-2xl hidden md:block z-20">
                <div className="text-5xl font-black mb-1">12+</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-90">{t('about.experience.label')}</div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ekip */}
      <section id="team" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44] mb-6">Yönetim Kurulumuz ve Ekibimiz</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">Değişim için emek veren, profesyonel ve gönüllü kadromuz ile toplumsal fayda üretiyoruz.</p>
          </div>
          
          {team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {team.map((member: any) => (
                <div key={member._id} className="group">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3">
                    <img 
                      src={member.imageUrl || "/images/placeholder-user.png"} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
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
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-[#FDF6F0] rounded-3xl border border-dashed border-gray-300">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">{t('about.team.empty')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Raporlar ve Tüzük */}
      <section id="reports" className="py-24 px-4 bg-[#FDF6F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Faaliyet Raporları */}
            <div className="bg-white/50 p-8 rounded-3xl border border-white">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8">
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1F2A44] mb-8">{t('about.reports.title')}</h3>
              <div className="space-y-4">
                {reports.length > 0 ? reports.map((doc: any) => (
                  <a 
                    key={doc._id} 
                    href={doc.fileUrl} 
                    target="_blank" 
                    className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:-translate-x-1 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xs uppercase">PDF</div>
                      <span className="font-bold text-gray-700">{doc.title?.[language] || doc.title?.tr}</span>
                    </div>
                    <Download className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                  </a>
                )) : (
                  <p className="text-gray-400 text-sm italic">{t('about.reports.empty')}</p>
                )}
              </div>
            </div>

            {/* Tüzük */}
            <div className="bg-white/50 p-8 rounded-3xl border border-white">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1F2A44] mb-8">{t('about.documents.title')}</h3>
              <div className="space-y-4">
                {statutes.length > 0 ? statutes.map((doc: any) => (
                  <a 
                    key={doc._id} 
                    href={doc.fileUrl} 
                    target="_blank" 
                    className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:-translate-x-1 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xs uppercase">PDF</div>
                      <span className="font-bold text-gray-700">{doc.title?.[language] || doc.title?.tr}</span>
                    </div>
                    <Download className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                  </a>
                )) : (
                   <p className="text-gray-400 text-sm italic">{t('about.documents.empty')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Üyesi Olduğumuz Ağlar */}
      <section id="networks" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">{t('about.networks.badge')}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A44] mb-16">{t('about.networks.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-orange-100 group-hover:bg-white transition-all shadow-none group-hover:shadow-lg">
                  <span className="font-black text-2xl text-gray-300 group-hover:text-orange-500">STGM</span>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-[#1F2A44]">Sivil Toplum Geliştirme Merkezi</span>
             </div>
             <div className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-orange-100 group-hover:bg-white transition-all shadow-none group-hover:shadow-lg">
                  <span className="font-black text-2xl text-gray-300 group-hover:text-orange-500">İKK</span>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-[#1F2A44]">İzmir Kent Konseyi</span>
             </div>
             <div className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-orange-100 group-hover:bg-white transition-all shadow-none group-hover:shadow-lg">
                  <span className="font-black text-2xl text-gray-300 group-hover:text-orange-500">UGK</span>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-[#1F2A44]">Ulusal Gençlik Konseyi</span>
             </div>
             <div className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-orange-100 group-hover:bg-white transition-all shadow-none group-hover:shadow-lg">
                  <span className="font-black text-2xl text-gray-300 group-hover:text-orange-500">ALF</span>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-[#1F2A44]">Anna Lindh Vakfı</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
