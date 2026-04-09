import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "events",
  title: "Etkinlikler",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Etkinlik Basligi", type: "string", validation: (rule) => rule.required().min(5) }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "description", title: "Aciklama", type: "text", rows: 4, validation: (rule) => rule.required().min(20) }),
    defineField({ name: "location", title: "Konum", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "startDateTime", title: "Baslangic", type: "datetime", validation: (rule) => rule.required() }),
    defineField({
      name: "endDateTime",
      title: "Bitis",
      type: "datetime",
      validation: (rule) =>
        rule.custom((endDateTime, ctx) => {
          const startDateTime = (ctx.document?.startDateTime as string | undefined) || "";
          if (!endDateTime || !startDateTime) return true;
          return endDateTime >= startDateTime ? true : "Bitis zamani baslangic zamanindan once olamaz.";
        })
    }),
    defineField({
      name: "coverImage",
      title: "Kapak Gorseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metin", type: "string" })]
    }),
    defineField({ name: "registrationUrl", title: "Kayit Linki", type: "url" }),
    defineField({ name: "isHighlighted", title: "One Ciksin mi?", type: "boolean", initialValue: false })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "coverImage"
    }
  }
});
