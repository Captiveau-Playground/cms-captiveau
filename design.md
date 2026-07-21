# Captiveau Design System
Version: 1.0.0

Author: Captiveau
Status: Stable
Last Updated: July 2026

---

# Introduction

## Overview

Captiveau Design System adalah standar visual, UX, dan komponen UI yang digunakan untuk seluruh produk digital, website, dashboard, proposal, serta aset pemasaran yang dikembangkan oleh Captiveau.

Tujuan utama design system ini adalah memastikan seluruh pengalaman pengguna memiliki konsistensi, kualitas tinggi, serta mudah dikembangkan oleh designer maupun engineer.

---

## Design Philosophy

> We Build Digital Products People Love.

Kami percaya bahwa software yang baik bukan hanya bekerja dengan baik, tetapi juga memberikan pengalaman yang intuitif, elegan, dan menyenangkan.

Design System ini dibangun berdasarkan lima prinsip utama.

- Simplicity
- Consistency
- Accessibility
- Scalability
- Product-first

---

# Brand

## Brand Personality

Captiveau merupakan software house modern yang membantu bisnis membangun digital product end-to-end.

Brand Attributes

- Modern
- Reliable
- Human
- Creative
- Innovative
- Professional
- Premium

---

## Brand Voice

### Tone

Professional tetapi tetap ramah.

### Writing Style

✔ singkat

✔ jelas

✔ tidak bertele-tele

✔ fokus pada solusi

### Hindari

- buzzword berlebihan
- bahasa terlalu formal
- kalimat panjang

Contoh

❌ Execute Submission

✔ Create Project

---

# Color System

## Primary

Blue merupakan identitas utama Captiveau.

| Token | Hex |
|----------|------------|
| Blue-50 | #EEF5FF |
| Blue-100 | #D8E8FF |
| Blue-200 | #B6D4FE |
| Blue-300 | #7CB4FC |
| Blue-400 | #4A8EF5 |
| Blue-500 | #2563EB |
| Blue-600 | #1D4ED8 |
| Blue-700 | #1E40AF |
| Blue-800 | #1E3A8A |
| Blue-900 | #172554 |

Usage

Blue 500

Primary CTA

Blue 600

Hover

Blue 700

Active

---

## Secondary

Gold digunakan sebagai accent.

| Token | Hex |
|----------|------------|
| Gold-50 | #FFF8E7 |
| Gold-100 | #FDF0C2 |
| Gold-200 | #F8D77B |
| Gold-300 | #F6C453 |
| Gold-400 | #F4B53D |
| Gold-500 | #F59E0B |
| Gold-600 | #D97706 |

Gunakan maksimal 10% dari keseluruhan layout.

---

## Semantic Color

Success

#22C55E

Warning

#F59E0B

Danger

#EF4444

Info

#2563EB

---

## Neutral

| Token | Hex |
|----------|------------|
| Gray-50 | #F8FAFC |
| Gray-100 | #F1F5F9 |
| Gray-200 | #E2E8F0 |
| Gray-300 | #CBD5E1 |
| Gray-400 | #94A3B8 |
| Gray-500 | #64748B |
| Gray-600 | #475569 |
| Gray-700 | #334155 |
| Gray-800 | #1E293B |
| Gray-900 | #0F172A |

---

# Typography

## Font Family

Primary

Inter

Fallback

system-ui

---

## Font Weight

Light 300

Regular 400

Medium 500

Semibold 600

Bold 700

ExtraBold 800

---

## Heading

| Style | Size | Weight |
|---------|------|----------|
| H1 | 72 | Bold |
| H2 | 60 | Bold |
| H3 | 48 | Bold |
| H4 | 36 | Semibold |
| H5 | 30 | Semibold |
| H6 | 24 | Semibold |

Line Height

120%

Letter Spacing

-2%

---

## Body

| Style | Size |
|---------|------|
| Large | 20 |
| Default | 16 |
| Small | 14 |
| Caption | 12 |

Line Height

160%

---

# Spacing

Menggunakan sistem 8pt.

| Token | Value |
|---------|------|
| xs | 4 |
| sm | 8 |
| md | 16 |
| lg | 24 |
| xl | 32 |
| xxl | 48 |
| xxxl | 64 |

---

# Radius

| Token | Value |
|---------|------|
| xs | 8 |
| sm | 12 |
| md | 16 |
| lg | 24 |
| xl | 32 |

---

# Elevation

Small

0 2 8 rgba(15,23,42,.05)

Medium

0 8 24 rgba(15,23,42,.08)

Large

0 16 48 rgba(15,23,42,.12)

---

# Layout

Desktop

1440 px

12 Columns

80 px Margin

24 px Gutter

Tablet

8 Columns

Mobile

4 Columns

---

# Iconography

Library

Lucide

Stroke

2px

Style

Rounded

Outlined

---

# Motion

## Duration

Fast

150ms

Normal

250ms

Slow

350ms

---

## Easing

ease-out

---

## Hover

Scale

102%

Shadow

Small

---

# Accessibility

Minimum contrast

WCAG AA

Minimum text

14px

Minimum touch target

44px

Focus state wajib terlihat.

Jangan hanya mengandalkan warna sebagai indikator.

---

# Components

## Button

Variants

- Primary
- Secondary
- Outline
- Ghost
- Danger

Height

48

Radius

12

Padding

24

Primary

Background

Blue-500

Text

White

Hover

Blue-600

Disabled

Gray-200

---

## Input

Height

48

Radius

12

Border

Gray-300

Focus

Blue-500

Placeholder

Gray-400

---

## Textarea

Minimum Height

120

Radius

12

---

## Select

Height

48

Radius

12

---

## Checkbox

16px

Radius

4

---

## Radio

16px

---

## Switch

36 x 20

---

## Badge

Variants

Success

Warning

Danger

Info

Neutral

---

## Chip

Filled

Outlined

Soft

---

## Card

Radius

20

Padding

24

Border

Gray-100

Shadow

Medium

---

## Modal

Radius

24

Padding

32

Max Width

640

---

## Toast

Radius

16

Position

Top Right

Duration

4 seconds

---

## Avatar

Sizes

32

40

48

64

96

---

## Table

Header

Gray-100

Row Height

56

Hover

Gray-50

---

## Empty State

Illustration

Headline

Description

Primary CTA

---

## Loading

Gunakan Skeleton.

Hindari Spinner apabila loading lebih dari 1 detik.

---

# Charts

Gunakan

Blue

Gold

Green

Purple

Gray

Maksimal lima warna dalam satu chart.

---

# Forms

Gunakan validasi inline.

Error muncul di bawah field.

Label selalu berada di atas input.

---

# Navigation

Navbar Height

72

Sidebar Width

280

Breadcrumb maksimal 3 level.

---

# Product UI

Karakter dashboard:

- banyak white space
- card based
- minim border
- icon sederhana
- visual hierarchy kuat
- CTA jelas

---

# Illustration

Gunakan

- Dashboard mockup
- Device mockup
- Workflow
- Gradient mesh
- Abstract geometric

Hindari

- cartoon
- clipart
- emoji

---

# Photography

Style

Startup

Natural

Real people

Bright

Workspace

Laptop

Meeting

---

# Marketing

Hero Section selalu memiliki:

Headline

Subheadline

CTA

Product Screenshot

Gradient Background

Floating Cards

Social Proof

---

# Logo

Minimum Size

24px

Safe Area

Tinggi huruf C

Dilarang

- stretch
- rotate
- gradient
- shadow
- outline

---

# Copywriting

Gunakan kata

Create

Launch

Deploy

Analyze

Monitor

Build

Explore

Hindari

Execute

Submit

Process

---

# Naming Convention

Component

ButtonPrimary

ButtonSecondary

CardDashboard

InputText

InputPassword

BadgeSuccess

BadgeWarning

---

# Design Token Naming

color.primary.500

color.gray.300

spacing.md

radius.lg

font.heading.h1

shadow.medium

motion.fast

---

# Figma Structure

📁 Foundations

- Colors
- Typography
- Grid
- Icons
- Shadows
- Radius
- Motion

📁 Components

- Buttons
- Inputs
- Tables
- Cards
- Navigation
- Modal
- Toast

📁 Patterns

- Authentication
- Dashboard
- CRUD
- Analytics
- AI Chat
- Empty State

📁 Marketing

- Landing Page
- Pricing
- About
- Contact
- Proposal Assets

---

# Engineering

Gunakan Design Token.

Semua komponen dibuat reusable.

Tidak diperbolehkan menggunakan hardcoded color.

Seluruh spacing mengikuti 8pt Grid System.

Semua komponen harus responsive.

---

# Future Roadmap

Version 1.1

- Dark Mode
- Motion Library
- Charts Library

Version 1.2

- AI Chat Components
- Data Visualization
- Maps

Version 2.0

- Native Mobile Components
- React Component Library
- Design Token Automation
- Multi Brand Theme
