import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "posts",
  title: "Yazilar",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Baslik", type: "string", validation: (rule) => rule.required().min(5) }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "excerpt", title: "Ozet", type: "text", rows: 3, validation: (rule) => rule.required().min(20) }),
    defineField({
      name: "coverImage",
      title: "Kapak Gorseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metin", type: "string", validation: (rule) => rule.required() })]
    }),
    defineField({ name: "body", title: "Icerik", type: "array", of: [{ type: "block" }], validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Kategori", type: "string", options: { list: ["Duyuru", "Haber", "Blog"] } }),
    defineField({ name: "publishedAt", title: "Yayin Tarihi", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "isFeatured", title: "One Cikarilsin mi?", type: "boolean", initialValue: false })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage"
    }
  }
});
