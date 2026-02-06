import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Cases } from "@/components/cases"
import { Benefits } from "@/components/benefits"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Reviews } from "@/components/reviews"
import { Contacts } from "@/components/contacts"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <About />
      <Cases />
      <Benefits />
      <Services />
      <Process />
      <Reviews />
      <Contacts />
    </main>
  )
}
