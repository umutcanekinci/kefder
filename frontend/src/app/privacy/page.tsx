"use client"
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { ShieldCheck } from 'lucide-react'

export default function PrivacyPage() {
  const { t, language } = useLanguage()

  return (
    <div className="bg-[#FDF6F0] min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              <ShieldCheck className="w-4 h-4" />
              {t('footer.privacy')}
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              {t('footer.privacy')}
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
                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">1. Veri Sorumlusu</h2>
                  <p className="mb-8">
                    Kültürel Etkileşim ve Farkındalık Derneği (KEFDER) olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, dernek ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu’na (“KVKK”) uygun olarak işlenerek, muhafaza edilmesine büyük önem vermekteyiz.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">2. Kişisel Verilerin Toplanması ve İşlenmesi</h2>
                  <p className="mb-4">
                    Kişisel verileriniz, KEFDER tarafından verilen hizmet, eğitim veya derneğin amaçları doğrultusunda; otomatik ya da otomatik olmayan yöntemlerle, ofisler, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilecektir.
                  </p>
                  <p className="mb-8">
                    Toplanan kişisel verileriniz, derneğimizin tüzüğünde belirtilen amaçlar doğrultusunda faaliyetlerimizi yürütmek, üyelerimize daha iyi hizmet sunmak ve yasal yükümlülüklerimizi yerine getirmek amacıyla işlenmektedir.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">3. İşlenen Kişisel Verilerin Aktarılması</h2>
                  <p className="mb-8">
                    Toplanan kişisel verileriniz; KEFDER’in faaliyetlerini yürütmek amacıyla iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumları ve özel kişilere, KVKK’nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">4. Kişisel Veri Sahibinin Hakları</h2>
                  <p className="mb-4">
                    KVKK’nın 11. maddesi uyarınca veri sahipleri;
                  </p>
                  <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                    <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                    <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                    <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                    <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarına sahiptir.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">5. İletişim</h2>
                  <p>
                    Gizlilik politikamızla ilgili her türlü soru ve görüşünüz için bizimle <strong>info@kefder.org</strong> adresi üzerinden iletişime geçebilirsiniz.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">1. Data Controller</h2>
                  <p className="mb-8">
                    As the Association for Cultural Interaction and Awareness (KEFDER), we show maximum sensitivity to the security of your personal data. With this awareness, we attach great importance to the processing and preservation of all kinds of personal data belonging to all persons associated with the association in accordance with the Law on Protection of Personal Data No. 6698 ("KVKK").
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">2. Collection and Processing of Personal Data</h2>
                  <p className="mb-4">
                    Your personal data will be collected verbally, in writing or electronically through offices, website, social media channels, mobile applications and similar means, automatically or non-automatically, in line with the services, training or purposes of the association provided by KEFDER.
                  </p>
                  <p className="mb-8">
                    Your collected personal data is processed in order to carry out our activities in line with the purposes specified in the charter of our association, to provide better service to our members and to fulfill our legal obligations.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">3. Transfer of Processed Personal Data</h2>
                  <p className="mb-8">
                    Your collected personal data may be transferred to our business partners, suppliers, legally authorized public institutions and private persons within the framework of the personal data processing conditions and purposes specified in Articles 8 and 9 of the KVKK in order to carry out the activities of KEFDER.
                  </p>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">4. Rights of the Personal Data Owner</h2>
                  <p className="mb-4">
                    In accordance with Article 11 of the KVKK, data owners have the right to;
                  </p>
                  <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>Learn whether personal data is processed,</li>
                    <li>Request information if personal data has been processed,</li>
                    <li>Learn the purpose of processing personal data and whether they are used in accordance with their purpose,</li>
                    <li>Know the third parties to whom personal data is transferred at home or abroad,</li>
                    <li>Request correction of personal data if they are processed incompletely or incorrectly.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">5. Contact</h2>
                  <p>
                    For any questions or comments regarding our privacy policy, you can contact us at <strong>info@kefder.org</strong>.
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
