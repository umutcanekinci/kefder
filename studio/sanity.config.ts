import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { assist } from "@sanity/assist";
import { schemaTypes } from "./schemaTypes";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

// Define the singleton document types
const singletonTypes = new Set(["siteSettings"]);

export default defineConfig({
  name: "default",
  title: "KefDer CMS",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production",
  plugins: [
    assist(),
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik Yönetimi")
          .items([
            // Our singleton type has a list item with a custom child
            S.listItem()
              .title("Genel Ayarlar")
              .id("siteSettings")
              .icon(schemaTypes.find(t => t.name === 'siteSettings')?.icon)
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() as string)
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the singletonActions list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
