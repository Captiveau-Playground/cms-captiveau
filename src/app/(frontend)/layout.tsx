import './globals.css'
import type { Metadata } from 'next'
import { getSiteSettings, getMainMenu } from '@/lib/cms'
import Navbar from '@/components/shadcn-space/blocks/hero-02/navbar'
import Footer from '@/components/shadcn-space/blocks/footer-02/footer'
import type { NavLinkItem } from '@/components/shadcn-space/blocks/hero-02/navbar'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: `${settings?.companyName || 'Captiveau'} — Creative Tech Studio`,
      template: `%s | ${settings?.companyName || 'Captiveau'}`,
    },
    description: settings?.description || undefined,
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [settings, menu] = await Promise.all([
    getSiteSettings(),
    getMainMenu(),
  ])

  // Map CMS menu items to NavLinkItem format
  const navData: NavLinkItem[] = (menu?.items || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item) => ({
      name: item.label || '',
      href: item.href || '/',
      isActive: false,
    }))

  // Get contact info from settings
  const email = settings?.contacts?.find((c) => c.type === 'email')?.value
  const phone = settings?.contacts?.find((c) => c.type === 'whatsapp' || c.type === 'phone')?.value

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navData={navData} phone={phone} email={email} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
