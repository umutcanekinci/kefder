import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/sanity/types";

function statusText(status: Project["status"]) {
  if (status === "active") return "Aktif";
  if (status === "completed") return "Tamamlandi";
  return "Planlaniyor";
}

export function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const imageUrl = project.coverImage?.asset ? urlFor(project.coverImage)?.width(800).height(500).url() : null;
  const href = project.relatedLinks?.[0]?.url || "#";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.coverImage?.alt || project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Gorsel eklenecek</div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {statusText(project.status)}
        </span>
        <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
        <p className="line-clamp-3 text-sm text-slate-600">{project.summary}</p>
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : "_self"}
          className="inline-flex text-sm font-semibold text-sky-700 underline-offset-4 hover:underline"
        >
          Projeyi incele
        </Link>
      </div>
    </article>
  );
}
