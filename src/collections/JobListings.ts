import type { CollectionConfig } from 'payload'

export const JobListings: CollectionConfig = {
  slug: 'job-listings',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'department', 'location', 'isActive', 'postedDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Job Title',
      type: 'text',
      required: true,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'text',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      defaultValue: 'Jakarta Selatan (Hybrid)',
    },
    {
      name: 'type',
      label: 'Employment Type',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
        { label: 'Freelance', value: 'freelance' },
      ],
      defaultValue: 'full-time',
    },
    {
      name: 'salary',
      label: 'Salary Range',
      type: 'text',
      admin: {
        description: 'e.g., Rp 5,000,000 – Rp 8,000,000',
      },
    },
    {
      name: 'description',
      label: 'Job Description',
      type: 'richText',
    },
    {
      name: 'responsibilities',
      label: 'Responsibilities',
      type: 'richText',
    },
    {
      name: 'requirements',
      label: 'Requirements',
      type: 'array',
      fields: [
        { name: 'requirement', type: 'text' },
      ],
    },
    {
      name: 'benefits',
      label: 'Benefits',
      type: 'array',
      fields: [
        { name: 'benefit', type: 'text' },
      ],
    },
    {
      name: 'postedDate',
      label: 'Posted Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'deadline',
      label: 'Application Deadline',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'isActive',
      label: 'Active Listing',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isUrgent',
      label: 'Urgent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
