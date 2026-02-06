import { Button } from "@/components/ui/button"
import { ArrowRight, Send } from "lucide-react"

const countries = [
  {
    flag: "🇯🇵",
    name: "Япония",
    description: "Надёжные японские автомобили с прозрачной историей. Toyota, Lexus, Honda, Nissan и другие.",
    features: ["Аукционные листы", "Подтверждённый пробег", "Качество JDM"],
  },
  {
    flag: "🇰🇷",
    name: "Корея",
    description: "Современные корейские авто с отличным соотношением цены и качества. Hyundai, Kia, Genesis.",
    features: ["Низкие цены", "Современные технологии", "Стильный дизайн"],
  },
  {
    flag: "🇨🇳",
    name: "Китай",
    description: "Новейшие китайские автомобили и электрокары. BYD, Geely, Li Auto, NIO и другие.",
    features: ["Электромобили", "Премиум комплектации", "Выгодные цены"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Услуги
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Авто с аукционов мира
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Выбирайте автомобили с лучших аукционов трёх стран – мы организуем всё от покупки до доставки
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {countries.map((country, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="text-5xl mb-4">{country.flag}</div>
              <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {country.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {country.description}
              </p>
              <ul className="space-y-2">
                {country.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 rounded-lg p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Хотите подобрать идеальный автомобиль?
              </h3>
              <p className="text-muted-foreground">
                Напишите нам марку, год, пробег, бюджет – и мы подберём лучшие варианты с разных рынков
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full md:w-auto bg-[#0088cc] hover:bg-[#0088cc]/90 text-white gap-2 px-8"
            >
              <a href="https://t.me/bg_auto_chita/3" target="_blank" rel="noopener noreferrer">
                <Send className="h-5 w-5" />
                Бесплатный расчёт
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
