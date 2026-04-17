import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Send,
} from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* ÜST BAŞLIK ALANI */}
      <section className="bg-[#F4F1EC] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1F2A44]">
            İletişim
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <span className="font-medium text-orange-500">Ana Sayfa</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">İletişim</span>
          </div>
        </div>
      </section>

      {/* ANA İÇERİK */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* ÜST ORTA BAŞLIK */}
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
              Bize Ulaşın
            </div>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#1F2A44]">
              İletişime Geçin
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-500">
              Sorularınız, önerileriniz veya işbirliği talepleriniz için bize
              ulaşabilirsiniz.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* SOL TARAF */}
            <div>
              <h3 className="text-3xl font-bold text-[#1F2A44]">
                İletişim Bilgileri
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-8 text-gray-500">
                Size daha iyi hizmet verebilmek için aşağıdaki kanallardan bize
                ulaşabilirsiniz.
              </p>

              <div className="mt-8 space-y-5">
                <InfoCard
                  icon={<MapPin className="h-6 w-6" />}
                  title="Adres"
                  lines={[
                    'Altındağ Atatürk Kültür Merkezi',
                    'STK Yerleşkesi, Koşukavak',
                    '4169/2 sk. No:5',
                    '35080 Bornova/İzmir',
                  ]}
                />

                <InfoCard
                  icon={<Phone className="h-6 w-6" />}
                  title="Telefon"
                  lines={['0232 999 29 29', 'Dahili: 2302 / 2303']}
                />

                <InfoCard
                  icon={<Mail className="h-6 w-6" />}
                  title="E-posta"
                  lines={['info@kefder.org', 'iletisim@kefder.org']}
                />

                <InfoCard
                  icon={<Clock3 className="h-6 w-6" />}
                  title="Çalışma Saatleri"
                  lines={[
                    'Pazartesi - Cuma: 09:00 - 18:00',
                    'Cumartesi: 10:00 - 14:00',
                  ]}
                />
              </div>

              <div className="mt-8">
                <h4 className="text-2xl font-bold text-[#1F2A44]">
                  Sosyal Medya
                </h4>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <SocialIcon icon={<Facebook className="h-5 w-5" />} />
                  <SocialIcon icon={<Instagram className="h-5 w-5" />} />
                  <SocialIcon icon={<Twitter className="h-5 w-5" />} />
                  <SocialIcon icon={<Youtube className="h-5 w-5" />} />
                  <SocialIcon icon={<Linkedin className="h-5 w-5" />} />
                </div>
              </div>
            </div>

            {/* SAĞ TARAF FORM */}
            <div className="rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:p-8">
              <h3 className="text-3xl font-bold text-[#1F2A44]">
                Mesaj Gönderin
              </h3>
              <p className="mt-2 text-lg text-gray-500">
                Formu doldurun, en kısa sürede size dönüş yapalım.
              </p>

              <form className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#1F2A44]">
                      Ad *
                    </label>
                    <input
                      type="text"
                      placeholder="Adınız"
                      className="h-14 w-full rounded-xl border border-gray-200 px-4 text-gray-700 outline-none transition focus:border-orange-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#1F2A44]">
                      Soyad *
                    </label>
                    <input
                      type="text"
                      placeholder="Soyadınız"
                      className="h-14 w-full rounded-xl border border-gray-200 px-4 text-gray-700 outline-none transition focus:border-orange-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#1F2A44]">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    placeholder="ornek@email.com"
                    className="h-14 w-full rounded-xl border border-gray-200 px-4 text-gray-700 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#1F2A44]">
                    Telefon
                  </label>
                  <input
                    type="text"
                    placeholder="05XX XXX XX XX"
                    className="h-14 w-full rounded-xl border border-gray-200 px-4 text-gray-700 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#1F2A44]">
                    Konu *
                  </label>
                  <select className="h-14 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none transition focus:border-orange-400">
                    <option>Seçiniz</option>
                    <option>Genel Bilgi</option>
                    <option>Üyelik</option>
                    <option>Etkinlikler</option>
                    <option>İşbirliği</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#1F2A44]">
                    Mesajınız *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Mesajınızı yazın..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-gray-700 outline-none transition focus:border-orange-400"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-base font-semibold text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)] transition hover:bg-orange-600"
                >
                  <Send className="h-4 w-4" />
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* HARİTA */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden rounded-[28px] bg-[#F4F1EC] shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col items-center justify-center gap-3 border-b border-black/5 px-6 py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-[#1F2A44]">
                Harita Görünümü
              </h3>
              <p className="text-base text-gray-500">
                Altındağ Atatürk Kültür Merkezi, Bornova/İzmir
              </p>
            </div>

            <div className="h-[420px] w-full">
              <iframe
                title="KEFDER Harita"
                src="https://www.google.com/maps?q=Bornova,İzmir&z=14&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>
        </div>
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
    <div className="rounded-[22px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
          {icon}
        </div>

        <div>
          <h4 className="text-2xl font-bold text-[#1F2A44]">{title}</h4>
          <div className="mt-2 space-y-1 text-base leading-7 text-gray-500">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm transition hover:bg-orange-500 hover:text-white"
    >
      {icon}
    </a>
  )
}
