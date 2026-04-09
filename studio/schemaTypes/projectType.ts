import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "projects",
  title: "Projeler",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Proje Adi", type: "string", validation: (rule) => rule.required().min(3) }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "summary", title: "Kisa Aciklama", type: "text", rows: 3, validation: (rule) => rule.required().min(20) }),
    defineField({
      name: "coverImage",
      title: "Kapak Gorseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metin", type: "string", validation: (rule) => rule.required() })]
    }),
    defineField({ name: "gallery", title: "Galeri", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })] }),
    defineField({
      name: "status",
      title: "Durum",
      type: "string",
      options: { list: [{ title: "Planlaniyor", value: "planned" }, { title: "Aktif", value: "active" }, { title: "Tamamlandi", value: "completed" }] },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "startDate", title: "Baslangic Tarihi", type: "date", validation: (rule) => rule.required() }),
    defineField({
      name: "endDate",
      title: "Bitis Tarihi",
      type: "date",
      validation: (rule) =>
        rule.custom((endDate, ctx) => {
          const startDate = (ctx.document?.startDate as string | undefined) || "";
          if (!endDate || !startDate) return true;
          return endDate >= startDate ? true : "Bitis tarihi baslangic tarihinden once olamaz.";
        })
    }),
    defineField({
      name: "relatedLinks",
      title: "Ilgili Linkler",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Baslik", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "coverImage"
    }
  }
});
