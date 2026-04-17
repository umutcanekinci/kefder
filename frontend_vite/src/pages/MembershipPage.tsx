export default function MembershipPage() {
  return (
    <div className="bg-[#FDF6F0] min-h-screen">
      {/* ÜST BANNER */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Üye Ol</h1>
        <p className="text-sm opacity-90">Ana Sayfa / Üyelik</p>
      </div>
      {/* İSTATİSTİK */}
      <div className="bg-white py-10 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-orange-500">500+</h2>
            <p className="text-gray-500 text-sm">Aktif Üye</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-orange-500">50+</h2>
            <p className="text-gray-500 text-sm">Yıllık Proje</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-orange-500">1000+</h2>
            <p className="text-gray-500 text-sm">Katılımcı</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-orange-500">12</h2>
            <p className="text-gray-500 text-sm">Yıllık Deneyim</p>
          </div>
        </div>
      </div>
      {/* ANA İÇERİK */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-4">
        {/* SOL TARAF */}
        <div>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
            Neden Üyelik?
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-4">
            KEFDER Ailesine Katılın
          </h2>
          <p className="text-gray-600 mb-6">
            KEFDER olarak üyelerimize sosyal, kültürel ve kişisel gelişim alanlarında
            katkı sağlıyoruz. Siz de bu topluluğun bir parçası olun.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li>✔ Toplumsal katkı sağlayın</li>
            <li>✔ Yeni insanlarla tanışın</li>
            <li>✔ Etkinliklere katılın</li>
            <li>✔ Kendinizi geliştirin</li>
          </ul>
        </div>
        {/* SAĞ TARAF FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Üyelik Başvuru Formu</h3>
          <input
            type="text"
            placeholder="Ad Soyad"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="E-posta"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Telefon"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <textarea
            placeholder="Kendinizden kısaca bahsedin..."
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
            Başvuruyu Gönder
          </button>
        </div>
      </div>
    </div>
  )
}
