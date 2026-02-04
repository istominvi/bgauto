import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Cases } from "@/components/cases"
import { Benefits } from "@/components/benefits"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Reviews } from "@/components/reviews"
import { SocialCta } from "@/components/social-cta"
import { Contacts } from "@/components/contacts"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Cases />
      <Benefits />
      <Services />
      <Process />
      <Reviews />
      <SocialCta />
      <Contacts />
      <Footer />
    </main>
  )
}
