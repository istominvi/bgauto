"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#cases", label: "Заказы" },
  { href: "#benefits", label: "Преимущества" },
  { href: "#services", label: "Услуги" },
  { href: "#stages", label: "Этапы" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 xl:h-20">
          {/* Logo - fixed size, no shrinking */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/bgauto/images/1-2.png"
              alt="BG AUTO"
              width={140}
              height={50}
              className="h-10 xl:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation - visible only on xl+ */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - visible only on xl+ */}
          <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
            <a href="tel:+79145192862" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              <Phone className="h-4 w-4" />
              +7 (914) 519-28-62
            </a>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
              <a href="https://t.me/bg_auto_zakaz_chita" target="_blank" rel="noopener noreferrer">
                Написать в Telegram
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button - visible below xl */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-foreground flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - visible below xl */}
      {isOpen && (
        <div className="xl:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+79145192862" className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors py-2">
              <Phone className="h-5 w-5" />
              +7 (914) 519-28-62
            </a>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
              <a href="https://t.me/bg_auto_zakaz_chita" target="_blank" rel="noopener noreferrer">
                Написать в Telegram
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
