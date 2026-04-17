import { createClient } from "@sanity/client";
import type { QueryParams } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_API_VERSION || "2026-04-09";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true
    })
  : null;

export async function fetchSanity<T>(query: string, params?: QueryParams): Promise<T> {
  if (!sanityClient) {
    throw new Error(
      "Sanity is not configured. Define NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID) and dataset variables."
    );
  }
  return params ? sanityClient.fetch<T>(query, params) : sanityClient.fetch<T>(query);
}
