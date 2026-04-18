"use client"
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getAboutData } from './actions'
import { PortableText } from '@portabletext/react'
import { 
  Users, 
  FileText, 
  Download,
  ShieldCheck,
  CheckCircle2,
  Target,
  Quote
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
  const about = data?.about || {}

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
            {about?.description?.[language] || about?.description?.tr || t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Motivasyon Sözü Section */}
      {about?.quote?.[language] && (
        <section className="py-16 px-4 bg-gray-50/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Quote className="w-12 h-12 text-orange-200" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-600 leading-relaxed mb-6">
              "{about.quote[language]}"
            </blockquote>
            <cite className="text-lg font-bold text-[#1F2A44] not-italic">— Mustafa Kemal Atatürk</cite>
          </div>
        </section>
      )}

      {/* Felsefemiz Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                Felsefemiz
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44]">Derneğimizin Kuruluş Temelleri</h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                {about?.philosophyText?.[language] ? (
                  <PortableText value={about.philosophyText[language]} />
                ) : (
                  <p>Kültürel etkileşim ve farkındalığı artırmak, toplumsal dayanışmayı güçlendirmek amacıyla yola çıktık.</p>
                )}
              </div>
            </div>
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
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon Section */}
      <section id="mission" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">{t('about.mission.label')}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {about?.mission?.[language] || about?.mission?.tr}
              </p>
            </div>
            <div className="bg-[#1F2A44] p-10 rounded-[40px] shadow-sm text-white hover:shadow-xl transition-all duration-500 transform md:translate-y-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-orange-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">{t('about.vision.label')}</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {about?.vision?.[language] || about?.vision?.tr}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hedef Kitle Section */}
      {about?.targetAudiences?.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A44] mb-4">Hedef Kitlemiz</h2>
              <p className="text-gray-500">Projelerimizle ulaştığımız ve birlikte büyüdüğümüz topluluklar.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {about.targetAudiences.map((item: any, idx: number) => (
                <div key={idx} className="bg-[#FDF6F0] p-8 rounded-3xl border border-orange-100 group hover:bg-orange-500 transition-all duration-500">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-orange-500 group-hover:text-orange-500 transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <p className="text-xl font-bold text-[#1F2A44] group-hover:text-white transition-colors">
                    {item[language] || item.tr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Faaliyet Alanlarımız Section */}
      {about?.activities?.length > 0 && (
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A44] mb-6">Neler Yapıyoruz?</h2>
                <p className="text-gray-600 mb-10 text-lg">KEFDER olarak geniş bir yelpazede toplumsal fayda odaklı çalışmalar yürütüyoruz.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {about.activities.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="font-semibold text-[#1F2A44]">{item[language] || item.tr}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="h-64 bg-orange-200 rounded-3xl overflow-hidden mt-8">
                    <img src="/images/asset_1.jpg" className="w-full h-full object-cover" alt="Faaliyet 1" />
                 </div>
                 <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden">
                    <img src="/images/hero_img.jpg" className="w-full h-full object-cover" alt="Faaliyet 2" />
                 </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
          <div className="flex flex-wrap justify-center gap-12 items-center transition-all duration-700">
             {about?.networks?.length > 0 ? (
               about.networks.map((network: any, index: number) => {
                 const content = (
                   <div className="flex flex-col items-center gap-4 group cursor-pointer">
                     <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 group-hover:border-orange-200 transition-all shadow-sm group-hover:shadow-lg overflow-hidden">
                       {network.logoUrl ? (
                         <img src={network.logoUrl} alt={network.description} className="w-full h-full object-contain p-4 transition-all duration-500" />
                       ) : (
                         <span className="font-black text-2xl text-gray-400 group-hover:text-orange-500 uppercase">Logo</span>
                       )}
                     </div>
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
