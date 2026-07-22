import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
    const footerLinks = [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Articles", href: "/articles" },
        { label: "Career", href: "/career" },
        { label: "About Us", href: "/about-us" },
        { label: "FAQs", href: "/faqs" },
    ]
    const servicesLinks = [
        { label: "Landing Page", href: "/services/landing-page" },
        { label: "E-Commerce", href: "/services/ecommerce" },
        { label: "Company Profile", href: "/services/company-profile" },
        { label: "UI/UX Design", href: "/services/uiux-design" },
    ]
    return (
        <footer className="dark bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-24 py-8">
                <div className="flex flex-col gap-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                        <div>
                            <div className="text-primary flex items-center gap-2">
                                <span className="text-2xl font-semibold">Captiveau</span>
                            </div>
                            <p className="text-muted-foreground/50 mt-6 max-w-md leading-relaxed">
                                Membangun pengalaman web yang indah dan fungsional dengan teknologi modern. Kami membantu startup dan bisnis menciptakan kehadiran digital mereka.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-10 lg:col-span-2">
                            <div>
                                <p className="text-lg font-medium text-foreground">Layanan Kami</p>
                                <ul className="mt-8 space-y-4">
                                    {servicesLinks.map((link) => (
                                        <li key={link.label}>
                                            <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-lg font-medium text-foreground">Tautan Berguna</p>
                                <ul className="mt-8 space-y-4">
                                    {footerLinks.map((link) => (
                                        <li key={link.label}>
                                            <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © 2025 Captiveau. Semua hak dilindungi.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Dibuat dengan ❤️ di Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
