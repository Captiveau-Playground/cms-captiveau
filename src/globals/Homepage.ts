import type { GlobalConfig } from 'payload'
import { publicRead, adminOnly } from '../access'

/**
 * Homepage landing content — editable copy for every marketing section.
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Settings',
  },
  access: {
    read: publicRead,
    update: adminOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroBadge',
              label: 'Badge Text',
              type: 'text',
              defaultValue: 'Now accepting new projects',
            },
            {
              name: 'heroTitlePrefix',
              label: 'Title Prefix',
              type: 'text',
              defaultValue: 'We build',
            },
            {
              name: 'heroSpecialties',
              label: 'Rotating Specialties',
              type: 'array',
              fields: [{ name: 'text', type: 'text' }],
            },
            {
              name: 'heroTitleSuffix',
              label: 'Title Suffix',
              type: 'text',
              defaultValue: 'that convert.',
            },
            {
              name: 'heroSubtitle',
              label: 'Subtitle',
              type: 'textarea',
            },
            {
              name: 'heroImages',
              label: 'Hero Image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Stats & Tech',
          fields: [
            {
              name: 'stats',
              label: 'Stats',
              type: 'array',
              fields: [
                { name: 'value', type: 'number', required: true },
                { name: 'suffix', type: 'text' },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'techStack',
              label: 'Tech Stack',
              type: 'array',
              fields: [{ name: 'name', type: 'text' }],
            },
          ],
        },
        {
          label: 'Trust & Advantages',
          fields: [
            {
              name: 'trustPoints',
              label: 'Trust Points',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'advantages',
              label: 'Advantages (Why Us)',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'process',
              label: 'How We Work',
              type: 'array',
              fields: [
                { name: 'step', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'icon', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Social Proof',
          fields: [
            {
              name: 'socialProofLabel',
              label: 'Label',
              type: 'text',
              defaultValue: 'Dipercaya klien di berbagai industri',
            },
            {
              name: 'socialProofDescription',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'socialProofLogos',
              label: 'Logos',
              type: 'array',
              fields: [{ name: 'logo', type: 'upload', relationTo: 'media' }],
            },
          ],
        },
        {
          label: 'Values & Career',
          fields: [
            {
              name: 'values',
              label: 'C.L.E.A.R Values',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'careerBenefits',
              label: 'Career Benefits',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'ctaTitle',
              label: 'Title',
              type: 'text',
              defaultValue: "Let's Start Collaborating.",
            },
            {
              name: 'ctaSubtitle',
              label: 'Subtitle',
              type: 'textarea',
            },
            {
              name: 'ctaButtonText',
              label: 'Button Text',
              type: 'text',
              defaultValue: 'Free Consultation',
            },
          ],
        },
      ],
    },
  ],
}
