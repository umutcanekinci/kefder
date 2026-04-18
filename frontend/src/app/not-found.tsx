import Link from 'next/link'
import { MapPinOff, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF6F0] p-4 py-16">
      <div className="bg-white max-w-2xl w-full rounded-3xl p-10 md:p-14 text-center shadow-lg border border-orange-100">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20"></div>
          <MapPinOff className="w-12 h-12 text-orange-500 relative z-10" />
        </div>
        
        <h1 className="text-8xl font-extrabold text-[#1F2A44] mb-4 opacity-5 select-none">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2A44] mb-4 -mt-20 relative z-10">
          Hay aksi! Aradığınız sayfa bulunamadı.
        </h2>
        
        <p className="text-gray-500 mb-10 leading-relaxed text-sm md:text-base max-w-lg mx-auto">
          Bağlantı kopmuş, sayfa taşınmış veya hiç var olmamış olabilir. Ama merak etmeyin, derneğimizde keşfedilecek daha pek çok güzellik var.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
          <Link 
            href="/contact"
            className="flex items-center gap-2 bg-white text-[#1F2A44] border-2 border-gray-100 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-200 transition-all w-full sm:w-auto justify-center"
          >
            Bizimle İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  )
}
