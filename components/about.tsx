import Image from "next/image"
import { Shield, Users, Clock, Award } from "lucide-react"

const stats = [
  { icon: Clock, value: "5+", label: "Лет опыта" },
  { icon: Users, value: "500+", label: "Довольных клиентов" },
  { icon: Award, value: "300K+", label: "Экономия в рублях" },
  { icon: Shield, value: "100%", label: "Гарантия качества" },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Text Content */}
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              О компании
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Кто мы и почему нам можно доверять?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы – команда экспертов с <span className="text-foreground font-medium">5-летним опытом</span> в сфере покупки и доставки автомобилей под заказ с аукционов Японии, Кореи и Китая.
              </p>
              <p>
                За эти годы мы помогли сотням клиентов найти и приобрести автомобили своей мечты по выгодным ценам и с гарантированным качеством. Мы знаем все тонкости аукционной системы, особенности растаможки и транспортировки.
              </p>
              <p>
                Наша главная цель – сделать процесс покупки автомобиля с аукциона <span className="text-foreground font-medium">простым, безопасным и выгодным</span> для каждого клиента.
              </p>
            </div>
          </div>

          {/* Team Photo */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/team.png"
                alt="Команда BG AUTO"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-foreground font-semibold text-lg">Наша команда</div>
                <div className="text-muted-foreground text-sm">Профессионалы с многолетним опытом</div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-lg -z-10" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group p-6 md:p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
              <stat.icon className="h-8 w-8 text-primary mb-4" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
