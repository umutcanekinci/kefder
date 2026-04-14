import type { Project } from "@/lib/sanity/types";
import { ProjectCard } from "./ProjectCard";

type ProjectsGridProps = {
  readonly projects: ReadonlyArray<Project>;
};

export function ProjectsGrid({ projects }: Readonly<ProjectsGridProps>) {
  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-slate-600">Henuz proje icerigi eklenmedi. Sanity Studio uzerinden ilk projeyi girin.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
