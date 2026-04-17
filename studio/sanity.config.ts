import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "KefDer CMS",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
