import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getProjects } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-14 px-4 py-8 md:px-8">
      <HeroSection />

      <section id="projeler" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Projeler</h2>
          <p className="text-sm text-slate-600 md:text-base">
            Sanity yonetim panelinden eklenen projeler burada otomatik olarak listelenir.
          </p>
        </div>
        <ProjectsGrid projects={projects} />
      </section>

      <section id="gonullu-ol" className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-bold text-slate-900">Katilim Cagrisi</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Gonullulerimizle birlikte daha fazla projeye ulasmak istiyoruz. Sanity panelinden bu alani duyurular ve CTA
          metinleri ile dinamik hale getirebilirsiniz.
        </p>
      </section>
    </main>
  );
}
