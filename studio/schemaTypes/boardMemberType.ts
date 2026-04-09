import { defineArrayMember, defineField, defineType } from "sanity";

export const boardMemberType = defineType({
  name: "board_members",
  title: "Yonetim Kurulu",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ad Soyad", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Gorev", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "photo",
      title: "Fotograf",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metin", type: "string", validation: (rule) => rule.required() })]
    }),
    defineField({ name: "bio", title: "Kisa Biyografi", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Liste Sirasi", type: "number", validation: (rule) => rule.required().integer().positive() }),
    defineField({
      name: "socialLinks",
      title: "Sosyal Linkler",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() })
          ]
        })
      ]
    })
  ],
  orderings: [
    {
      title: "Siralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo"
    }
  }
});
