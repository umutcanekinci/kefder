import { fetchSanity } from "./client";
import type { Project } from "./types";

export const projectsQuery = `*[_type == "projects"] | order(startDate desc) {
  _id,
  title,
  slug,
  summary,
  status,
  startDate,
  endDate,
  coverImage{
    asset,
    alt
  },
  relatedLinks
}`;

export async function getProjects(): Promise<Project[]> {
  try {
    return await fetchSanity<Project[]>(projectsQuery);
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error);
    return [];
  }
}
