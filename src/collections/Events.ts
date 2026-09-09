import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'
import { generatePreviewPath } from '../lib/generatePreviewPath'

/**
 * Events — koleksi acara (workshop, webinar, peluncuran, talk) yang dikelola
 * dari CMS. Halaman daftar `/events` dan detail `/events/[slug]` membaca dari
 * sini; pendaftaran bisa lewat Google Form yang embed-nya disimpan CMS.
 */
export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'startDate', 'mode', 'venue', 'status'],
    preview: (data) =>
      generatePreviewPath({ collection: 'events', slug: (data as { slug?: string })?.slug }),
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({ collection: 'events', slug: (data as { slug?: string })?.slug }),
    },
  },
  access: editorCreateAdminDelete,
  fields: [
    {
      name: 'title',
      label: 'Nama Acara',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      label: 'Deskripsi Singkat',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Ringkasan acara yang tampil di kartu daftar dan bagian atas halaman detail.',
      },
    },
    {
      name: 'image',
      label: 'Cover / Poster',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageAspect',
      label: 'Rasio Cover / Poster',
      type: 'select',
      options: [
        { label: 'Otomatis (ikuti asli gambar)', value: 'auto' },
        { label: 'Panorama 21:9', value: '21/9' },
        { label: 'Wide 16:9', value: '16/9' },
        { label: 'Poster 4:3', value: '4/3' },
        { label: 'Kotak 1:1', value: '1/1' },
      ],
      defaultValue: 'auto',
      admin: {
        position: 'sidebar',
        description:
          'Menentukan rasio tampilan gambar di kartu & halaman detail. Pilih "Otomatis" untuk menampilkan poster sesuai proporsi aslinya tanpa terpotong.',
      },
    },
    {
      name: 'startDate',
      label: 'Tanggal Mulai',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      label: 'Tanggal Selesai (opsional)',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'mode',
      label: 'Mode Acara',
      type: 'select',
      options: [
        { label: 'Offline', value: 'offline' },
        { label: 'Online', value: 'online' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
      defaultValue: 'offline',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'venue',
      label: 'Lokasi / Venue',
      type: 'text',
      admin: {
        description: 'Contoh: Zoom (online) atau Jl. Kuningan Barat No. 8 (offline).',
      },
    },
    {
      name: 'organizer',
      label: 'Penyelenggara',
      type: 'text',
    },
    {
      name: 'capacity',
      label: 'Kuota Peserta',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Jumlah peserta maksimal (opsional).',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Upcoming (akan datang)', value: 'upcoming' },
        { label: 'Ongoing (berlangsung)', value: 'ongoing' },
        { label: 'Past (selesai)', value: 'past' },
        { label: 'Archived (disimpan)', value: 'archived' },
      ],
      defaultValue: 'upcoming',
      admin: {
        position: 'sidebar',
        description: 'Acara ber-status archived tidak ditampilkan di halaman publik.',
      },
    },
    {
      name: 'googleFormEmbed',
      label: 'Google Form Embed (HTML)',
      type: 'textarea',
      admin: {
        description:
          'Tempel kode embed Google Form di sini (Google Form → Kirim → < > Sematkan). Contoh: <iframe src="https://docs.google.com/forms/d/e/.../viewform?embedded=true" ...></iframe>. Akan dirender di halaman detail sebagai formulir pendaftaran.',
      },
    },
    {
      name: 'registrationUrl',
      label: 'Link Pendaftaran (opsional)',
      type: 'text',
      admin: {
        description:
          'Link langsung formulir pendaftaran (dibuka di tab baru). Jika dikosongkan tapi Google Form Embed diisi, link otomatis diambil dari URL embed.',
      },
    },
    {
      name: 'sessions',
      label: 'Agenda (Sesi)',
      type: 'array',
      admin: {
        description:
          'Susunan acara per sesi — ditampilkan sebagai timeline rapi di halaman detail. Urutkan sesuai waktu.',
      },
      fields: [
        {
          name: 'time',
          label: 'Waktu',
          type: 'text',
          required: true,
          admin: { description: 'Contoh: 09.00 – 09.15' },
        },
        {
          name: 'title',
          label: 'Sesi',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Deskripsi (opsional)',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'materialOutline',
      label: 'Outline Materi',
      type: 'array',
      admin: {
        description: 'Pokok-pokok materi yang akan dibahas — tampil sebagai daftar bernomor.',
      },
      fields: [{ name: 'item', label: 'Materi', type: 'text', required: true }],
    },
    {
      name: 'speakers',
      label: 'Pembicara',
      type: 'array',
      admin: {
        description: 'Nama, posisi di acara, dan jabatan professional pembicara.',
      },
      fields: [
        { name: 'name', label: 'Nama', type: 'text', required: true },
        {
          name: 'position',
          label: 'Posisi di Acara',
          type: 'text',
          admin: { description: 'Contoh: Pembicara utama, Moderator, Panelis' },
        },
        {
          name: 'role',
          label: 'Jabatan',
          type: 'text',
          admin: { description: 'Contoh: Founder & CEO, Captiveau' },
        },
        {
          name: 'photo',
          label: 'Foto (opsional)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'recordingUrl',
      label: 'Link Rekaman (YouTube)',
      type: 'text',
      admin: {
        description:
          'Opsional — tautan YouTube rekaman acara. Jika diisi, tombol "Tonton Rekaman" tampil di halaman detail.',
      },
    },
  ],
}