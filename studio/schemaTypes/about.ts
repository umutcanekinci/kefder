import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'

export const aboutType = defineType({
  name: 'about',
  title: 'Hakkımızda',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'description',
      title: 'Genel SEO Açıklaması',
      type: 'localeString',
    }),
    defineField({
      name: 'mission',
      title: 'Misyonumuz',
      type: 'localeString',
    }),
    defineField({
      name: 'vision',
      title: 'Vizyonumuz',
      type: 'localeString',
    }),
    defineField({
      name: 'quote',
      title: 'Motivasyon Sözü / Alıntı',
      type: 'localeString',
      description: 'Atatürk veya önemli şahsiyetlerin sözü için.',
    }),
    defineField({
      name: 'philosophyText',
      title: 'Felsefemiz / Hakkımızda Metni',
      type: 'localeBlock',
    }),
    defineField({
      name: 'philosophyImage',
      title: 'Felsefe Görseli',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'targetAudiences',
      title: 'Hedef Kitlemiz',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'activities',
      title: 'Faaliyet Alanlarımız',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'logoFeatures',
      title: 'Logo Anlamı ve Detayları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Özellik Başlığı', type: 'localeString'},
            {name: 'description', title: 'Özellik Açıklaması', type: 'localeString'},
          ],
          preview: {
            select: {
              titleEn: 'title.en',
              titleTr: 'title.tr',
              descEn: 'description.en',
              descTr: 'description.tr',
            },
            prepare({titleEn, titleTr, descEn, descTr}) {
              const title = titleTr || titleEn || 'Başlıksız'
              const subtitle = descTr || descEn || 'Açıklama yok'
              return {
                title: title,
                subtitle: subtitle.substring(0, 60) + (subtitle.length > 60 ? '...' : ''),
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'networks',
      title: 'Üyesi Olduğumuz Ağlar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}},
            {name: 'description', title: 'Ağ Adı / Tanımı (Görünen)', type: 'string'},
            {name: 'shortDescription', title: 'Kısa Açıklama (Hover/Hold Effect)', type: 'string'},
            {name: 'url', title: 'Web Sitesi URL', type: 'url'},
          ],
        },
      ],
    }),
    defineField({
      name: 'officialBylaws',
      title: 'Resmi Tüzük Dosyası',
      type: 'file',
      description: 'Derneğin resmi tüzük dökümanı (Örn: Kefder_Tüzük_2017)',
      options: {
        accept: '.pdf',
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hakkımızda Sayfası Ayarları',
        subtitle: 'SEO, Misyon ve Vizyon yönetimi',
      }
    },
  },
})
