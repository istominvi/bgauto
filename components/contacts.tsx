import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Send, Gift, Star, MessageSquare, TrendingUp } from "lucide-react"

const offices = [
  {
    city: "Чита",
    address: "мкр. Геофизический, ТЦ \"Автосити\", 20, бутик 18, 1 этаж",
    hours: "Пн-Сб: 9:00-19:00, Вс: выходной",
    phones: ["+7 (3022) 21-78-87", "+7 (914) 140-68-86"],
  },
  {
    city: "Чита",
    address: "ул. Амурская, 107, помещение 20, 1 этаж",
    hours: "Вт-Сб: 10:00-19:00, Пн, Вс: выходной",
    phones: ["+7 (3022) 21-78-87", "+7 (914) 140-68-86"],
  },
  {
    city: "Иркутск",
    address: "ул. Советская, 25, офис 21, 2 этаж",
    hours: "Пн-Сб: 10:00-19:00, Вс: выходной",
    phones: ["+7 (924) 991-33-33", "+7 (999) 640-91-81", "+7 (924) 777-22-88"],
  },
  {
    city: "Иркутск",
    address: "ул. Горная, 4, офис 203",
    hours: "Пн-Сб: 10:00-19:00, Вс: выходной",
    phones: ["+7 (924) 991-33-33"],
  },
  {
    city: "Улан-Удэ",
    address: "ул. Балтахинова, 36, офис 104, 1 этаж",
    hours: "Ежедневно: 10:00-19:00",
    phones: ["+7 (924) 777-22-88"],
  },
  {
    city: "Гусиноозёрск",
    address: "2-й микрорайон, 2в/1, павильон 12",
    hours: "Ежедневно: 10:00-19:00",
    phones: ["+7 (924) 777-22-88"],
  },
]

const phones = [
  "+7 (914) 519-28-62",
  "+7 (914) 140-68-86",
  "21-78-87",
  "21-00-04",
]

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

export function Contacts() {
  return (
    <section id="contacts" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Контакты
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Свяжитесь с нами
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Консультация и расчёт вашего запроса — бесплатно. Мы всегда на связи!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Contact */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-8 h-full">
              <h3 className="text-xl font-semibold text-foreground mb-6">Быстрая связь</h3>
              
              <div className="space-y-6">
                {/* Reasons to follow */}
                <div className="space-y-3">
                  {reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <reason.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{reason.text}</span>
                    </div>
                  ))}
                </div>

                {/* Messengers */}
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-[#0077FF] hover:bg-[#0077FF]/90 text-white gap-2"
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
                    className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90 text-white gap-2"
                  >
                    <a href="https://t.me/bg_auto_zakaz_chita" target="_blank" rel="noopener noreferrer">
                      <Send className="h-5 w-5" />
                      Telegram
                    </a>
                  </Button>
                </div>

                {/* Phones */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Телефоны</h4>
                  <div className="space-y-2">
                    {phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4 text-primary" />
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Режим работы</div>
                    <div className="text-sm text-muted-foreground">c 09:00 до 19:00, воскресенье - выходной</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offices */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-8 h-full">
              <h3 className="text-xl font-semibold text-foreground mb-6">Наши офисы</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground mb-1">г. {office.city}</div>
                        <div className="text-sm text-muted-foreground mb-2">{office.address}</div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          {office.hours}
                        </div>
                        <div className="space-y-1">
                          {office.phones.map((phone, phoneIdx) => (
                            <a
                              key={phoneIdx}
                              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                              className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Manchuria Note */}
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🇨🇳</div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Шоурум в Маньчжурии</div>
                    <p className="text-sm text-muted-foreground">
                      Широкий выбор китайских автомобилей. Профессиональные консультанты, говорящие на русском языке.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
