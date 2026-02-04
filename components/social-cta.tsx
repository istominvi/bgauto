"use client"

import { Gift, Star, MessageSquare, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const reasons = [
  {
    icon: TrendingUp,
    text: "Актуальные обзоры моделей и цен",
  },
  {
    icon: Gift,
    text: "Эксклюзивные предложения и скидки для подписчиков",
  },
  {
    icon: MessageSquare,
    text: "Реальные истории успеха и отзывы клиентов",
  },
  {
    icon: Star,
    text: "Возможность выиграть новый автомобиль (розыгрыши в закрепе)",
  },
]

export function SocialCta() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full translate-x-1/4 translate-y-1/4" />
            
            <div className="relative">
              {/* Header */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Gift className="h-4 w-4" />
                Розыгрыш автомобиля
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Подпишитесь на наши соцсети
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Будьте в курсе выгодных предложений и участвуйте в розыгрышах
              </p>

              {/* Reasons Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
                {reasons.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <reason.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{reason.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-[#0077FF] hover:bg-[#0077FF]/90 text-white gap-2 px-8"
                >
                  <a href="https://vk.com/bg_auto_chita" target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.572 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.847 2.49 2.271 4.675 2.856 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                    </svg>
                    VK
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-[#0088cc] hover:bg-[#0088cc]/90 text-white gap-2 px-8"
                >
                  <a href="https://t.me/bg_auto_chita" target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Telegram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
