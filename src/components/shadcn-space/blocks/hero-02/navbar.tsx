"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion, useInView } from "motion/react";

type NavData = {
  name: string;
  href: string;
};

type NavbarProps = {
  navData: NavData[]
  phone?: string
  email?: string
}

export type NavLinkItem = {
  name: string
  href: string
  isActive?: boolean
}

export interface NavLinkProps {
  item: NavLinkItem
}

const NavLink: React.FC<NavLinkProps> = ({ item }) => {
  return (
    <li className="flex items-center group w-fit cursor-pointer">
      <div className={`h-0.5 bg-primary transition-all duration-300 ${item.isActive ? 'w-6 mr-4' : 'w-0 group-hover:w-6 group-hover:mr-4'}`} />
      <a
        href={item.href}
        className={`text-2xl font-medium rounded-full transition-colors ${item.isActive ? 'text-primary' : "text-muted-foreground group-hover:text-primary"}`}
      >
        {item.name}
      </a>
    </li>
  )
}

const Navbar: React.FC<NavbarProps> = ({ navData, phone, email }) => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.1 });

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -32 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={cn("z-50 w-full bg-transparent h-20 fixed top-0 flex items-center")}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`flex items-center justify-between duration-300 transition-all ${sticky ? 'shadow-lg bg-background rounded-full p-3' : 'px-0'}`}>
          <div className="flex justify-between items-center gap-2 w-full">
            <div>
              <a href="/" className="flex items-center gap-2">
                <DotLottieReact
                  src="https://lottie.host/54139a36-99f2-4b42-a31a-4397d774b987/N62xm4fvPi.lottie"
                  loop
                  autoplay
                  className="w-10 h-10"
                />
                {sticky ? (
                  <span className="text-2xl font-bold text-foreground">Captiveau</span>
                ) : (
                  <span className="text-2xl font-bold text-white">Captiveau</span>
                )}
              </a>
            </div>
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="/services"
                  className={`text-sm font-medium transition-colors ${sticky ? 'text-foreground hover:text-primary' : 'text-white/80 hover:text-white'}`}
                >
                  Services
                </a>
                <a
                  href="/portfolio"
                  className={`text-sm font-medium transition-colors ${sticky ? 'text-foreground hover:text-primary' : 'text-white/80 hover:text-white'}`}
                >
                  Portfolio
                </a>
                <a
                  href="/blog"
                  className={`text-sm font-medium transition-colors ${sticky ? 'text-foreground hover:text-primary' : 'text-white/80 hover:text-white'}`}
                >
                  Blog
                </a>
              </div>
              <a
                href="/contact"
                className={`hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium h-auto transition-all ${sticky
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                Request for Demo
              </a>
              <div>
                <Button
                  size={"lg"}
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  className={`flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer border text-sm font-medium h-auto ${sticky
                    ? 'text-foreground bg-background hover:bg-muted border-foreground/20'
                    : 'text-black bg-white hover:bg-transparent hover:text-white border-white'
                  }`}
                  aria-label="Toggle mobile menu"
                >
                  <Menu size={16} />
                  Menu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Sheet open={navbarOpen} onOpenChange={setNavbarOpen}>
        <SheetContent
          side="right"
          className="bg-background p-6 overflow-auto no-scrollbar border-none flex flex-col gap-12"
        >
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetClose className="absolute top-4 right-4 rounded-full bg-black text-white p-2 cursor-pointer">
              <X size={24} />
            </SheetClose>
          </SheetHeader>

          <nav>
            <ul className="flex flex-col gap-4">
              {navData?.map((item, index) => (
                <SheetClose key={index} className="w-fit">
                  <NavLink item={item} />
                </SheetClose>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-12 text-foreground">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-normal text-muted-foreground">Contact</p>
              <a href={email ? `mailto:${email}` : '#'} className="text-base font-medium hover:text-primary">
                {email || 'hello@captiveau.id'}
              </a>
              <a href={phone ? `tel:${phone}` : '#'} className="text-base font-medium hover:text-primary">
                {phone || '+62-851-5626-5910'}
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-normal text-muted-foreground">Socials</p>
              <a href="https://linkedin.com/company/captiveau" target="_blank" rel="noopener noreferrer" className="text-base font-medium hover:text-primary">LinkedIn</a>
              <a href="https://instagram.com/captiv.eau" target="_blank" rel="noopener noreferrer" className="text-base font-medium hover:text-primary">Instagram</a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
};

export default Navbar
