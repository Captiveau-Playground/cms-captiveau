import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { FeaturesBlock } from '../blocks/FeaturesBlock'
import { ServicesPreviewBlock } from '../blocks/ServicesPreviewBlock'
import { ArticlesPreviewBlock } from '../blocks/ArticlesPreviewBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { CTABlock } from '../blocks/CTABlock'
import { FAQBlock } from '../blocks/FAQBlock'
import { ContactBlock } from '../blocks/ContactBlock'
import { RichContentBlock } from '../blocks/RichContentBlock'
import { TeamBlock } from '../blocks/TeamBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Use "/" for homepage. e.g., "about-us", "services"',
      },
    },
    {
      name: 'description',
      label: 'Meta Description',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      label: 'OG Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        FeaturesBlock,
        ServicesPreviewBlock,
        ArticlesPreviewBlock,
        TestimonialsBlock,
        CTABlock,
        FAQBlock,
        ContactBlock,
        RichContentBlock,
        TeamBlock,
      ],
    },
  ],
}
