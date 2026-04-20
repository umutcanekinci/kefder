"use client"
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  const { t, language } = useLanguage()

  return (
    <div className="bg-[#FDF6F0] min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              <FileText className="w-4 h-4" />
              {t('footer.terms')}
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              {t('footer.terms')}
            </h1>
          </div>
        </ScrollReveal>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-gray-100">
          <ScrollReveal>
            <div className="prose prose-lg prose-orange max-w-none text-gray-600 leading-relaxed">
              {language === 'tr' ? (
                <>
                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">1. Şartların Kabulü</h2>
                  <p className="mb-8">
                    Bu internet sitesini (kefder.org) kullanarak, bu kullanım koşullarını, ilgili tüm yasaları ve düzenlemeleri kabul etmiş sayılırsınız. Bu şartlardan herhangi birini kabul etmiyorsanız, bu siteyi kullanmanız yasaktır.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">2. Kullanım Lisansı</h2>
                  <p className="mb-4">
                    KEFDER internet sitesindeki materyallerin (bilgi veya yazılım) kişisel, ticari olmayan geçici görüntüleme için bir kopyasının geçici olarak indirilmesine izin verilir. Bu bir mülkiyet devri değil, bir lisans verilmesidir ve bu lisans kapsamında şunları yapamazsınız:
                  </p>
                  <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>Materyalleri değiştirmek veya kopyalamak;</li>
                    <li>Materyalleri herhangi bir ticari amaçla veya herhangi bir kamuya açık sergileme (ticari veya ticari olmayan) için kullanmak;</li>
                    <li>KEFDER internet sitesinde bulunan herhangi bir yazılımı kaynak koda dönüştürmeye veya tersine mühendislik yapmaya çalışmak;</li>
                    <li>Materyalleri başka bir kişiye transfer etmek veya materyalleri herhangi bir başka sunucuda "aynalamak".</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">3. Sorumluluk Reddi</h2>
                  <p className="mb-8">
                    KEFDER internet sitesindeki materyaller "olduğu gibi" sunulmaktadır. KEFDER, açık veya zımni hiçbir garanti vermez ve işbu belgeyle, zımni garantiler veya ticari elverişlilik koşulları, belirli bir amaca uygunluk veya fikri mülkiyetin ihlal edilmemesi veya diğer hakların ihlali dahil ancak bunlarla sınırlı olmamak üzere diğer tüm garantileri reddeder ve ihmal eder.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">4. Sınırlamalar</h2>
                  <p className="mb-8">
                    KEFDER veya tedarikçileri, KEFDER internet sitesindeki materyallerin kullanılmasından veya kullanılamamasından kaynaklanan hiçbir zarardan (sınırlama olmaksızın veri veya kar kaybı veya iş kesintisi nedeniyle oluşan zararlar dahil) sorumlu tutulamaz.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">5. Materyallerdeki Hatalar</h2>
                  <p className="mb-8">
                    KEFDER internet sitesinde görünen materyaller teknik, tipografik veya fotoğrafik hatalar içerebilir. KEFDER, web sitesindeki materyallerin hiçbirinin doğru, eksiksiz veya güncel olduğunu garanti etmez. KEFDER, web sitesinde bulunan materyallerde herhangi bir zamanda bildirimde bulunmaksızın değişiklik yapabilir.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">6. Bağlantılar</h2>
                  <p className="mb-8">
                    KEFDER, internet sitesine bağlı sitelerin tümünü incelememiştir ve bu tür bağlı sitelerin içeriğinden sorumlu değildir. Herhangi bir bağlantının dahil edilmesi, sitenin KEFDER tarafından onaylandığı anlamına gelmez. Bu tür bağlantılı web sitelerinin kullanımı kullanıcının kendi sorumluluğundadır.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">1. Acceptance of Terms</h2>
                  <p className="mb-8">
                    By using this website (kefder.org), you agree to be bound by these terms of use, all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">2. Use License</h2>
                  <p className="mb-4">
                    Permission is granted to temporarily download one copy of the materials (information or software) on KEFDER's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>Modify or copy the materials;</li>
                    <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>Attempt to decompile or reverse engineer any software contained on KEFDER's website;</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">3. Disclaimer</h2>
                  <p className="mb-8">
                    The materials on KEFDER's website are provided on an 'as is' basis. KEFDER makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">4. Limitations</h2>
                  <p className="mb-8">
                    In no event shall KEFDER or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on KEFDER's website.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">5. Accuracy of Materials</h2>
                  <p className="mb-8">
                    The materials appearing on KEFDER's website could include technical, typographical, or photographic errors. KEFDER does not warrant that any of the materials on its website are accurate, complete or current. KEFDER may make changes to the materials contained on its website at any time without notice.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">6. Links</h2>
                  <p className="mb-8">
                    KEFDER has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by KEFDER of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
