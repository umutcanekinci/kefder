import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-white md:px-12 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="mb-4 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold tracking-wide">
          Modern STK Web Prototipi
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">
          KefDer ile toplumsal etkiyi daha gorunur hale getiriyoruz.
        </h1>
        <p className="mt-5 text-base text-slate-200 md:text-lg">
          Bu prototip, yonetilebilir icerik yapisi ve modern arayuzle dernegin projelerini, duyurularini ve etkinliklerini
          hizli sekilde yayinlamasini saglar.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#gonullu-ol"
            className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            Gonullu Ol
          </Link>
          <Link
            href="#projeler"
            className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            Duyurulari Gor
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-xs text-slate-200">
          <span className="rounded-full bg-white/10 px-3 py-1">Toplumsal Etki</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Seffaflik</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Gonulluluk</span>
        </div>
      </div>
    </section>
  );
}
