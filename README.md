# KefDer Proto

Bu workspace iki uygulamadan olusur:

- `frontend`: Next.js + Tailwind on yuz
- `studio`: Sanity Studio (CMS paneli)

## 1) Gereksinimler

- Node.js 20+
- npm 10+
- Sanity hesabi

## 2) Ortam degiskenleri

`frontend/.env.local` dosyasi olusturun:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-09
```

`studio/.env` dosyasi olusturun (`studio/.env.example` dosyasini kopyalayip doldurun):

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## 3) Frontend calistirma

```bash
cd frontend
npm install
npm run dev
```

Frontend varsayilan olarak `http://localhost:3000` adresinde acilir.

## 4) Sanity Studio calistirma

```bash
cd studio
npm install
npm run dev
```

Studio varsayilan olarak `http://localhost:3333` adresinde acilir.

### Studio’yu internete almak (`sanity deploy`)

Bu adim **sizin hesabinizla tarayicida oturum** gerektirir; baska bir makineden otomatik yapilamaz.

```bash
cd studio
npm install
npx sanity login
npm run deploy
```

- Ilk seferde bir **alt alan adi** secmeniz istenebilir (or. `kefder` → `https://kefder.sanity.studio`).
- CI veya otomasyon icin: [sanity.io/manage](https://www.sanity.io/manage) → **Account** → **API** → token olusturup `SANITY_AUTH_TOKEN` olarak kullanabilirsiniz; sonra yine `npm run deploy`.

### Ornek icerik (istege bagli, token ile)

Arayuzu doldurmak icin `studio/scripts/seed-content.mjs` kullanilir.

1. [sanity.io/manage](https://www.sanity.io/manage) → projeniz → **API** → **Tokens** → **Editor** yetkili token olusturun.
2. `studio/.env` icine ekleyin: `SANITY_API_WRITE_TOKEN=...` (bu dosyayi repoya eklemeyin).
3. Calistirin:

```bash
cd studio
npm run seed
```

Ayni `_id` ile tekrar calistirirsaniz kayitlar uzerine yazilir.

## 5) Vercel (Next.js — `frontend` root)

Proje ayarlari:

- **Root Directory:** `frontend`
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (varsayilan)
- **Output Directory:** **bos birakin** — Next.js ciktisi `.next` altinda; `public` yazmayin.

Dashboard’da **Output Directory = `public`** ise build su hatayi verir: *No Output Directory named "public" found*. Bunu silip tekrar deploy edin.

Ortam degiskenleri: `NEXT_PUBLIC_SANITY_*` (bkz. `frontend/.env.example`).

## 6) Kritik demo adimlari

1. Studio'da `projects` tipinde 2-3 kayit olusturun.
2. Kayitlara `title`, `summary`, `status`, `coverImage` ve en az bir `relatedLinks` girin.
3. Frontend sayfasini yenileyin; projeler kartlar halinde listelenecektir.
4. Hero bolumundeki CTA butonlari ile mock akis gosterin.

## Not

Bu ortamda Node/NPM kurulu olmadigi icin komutlari calistirip build alinamadi. Dosya yapisi ve kodlar kurulumdan sonra dogrudan calisacak sekilde hazirlandi.
