import {
  Wallet,
  Car,
  FileCheck,
  HeadphonesIcon,
  ShieldCheck,
  UserCheck,
  Truck,
  Settings,
  CheckCircle,
} from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Экономия средств",
    description: "Выгода от 300 000 рублей и более по сравнению с местным рынком",
  },
  {
    icon: Car,
    title: "Широкий выбор",
    description: "Доступ к сотням тысяч автомобилей, включая редкие модели",
  },
  {
    icon: FileCheck,
    title: "Прозрачная история",
    description: "Аукционные листы с оценками, подтвержденный пробег, без скрытых дефектов",
  },
  {
    icon: HeadphonesIcon,
    title: "Полное сопровождение",
    description: "От участия в торгах до доставки и растаможки – всё включено",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия качества",
    description: "Проверяем каждый автомобиль перед отправкой, страхуем риски",
  },
  {
    icon: UserCheck,
    title: "Персональный менеджер",
    description: "На связи 24/7, подберёт авто под ваш бюджет и пожелания",
  },
]

const advantages = [
  "Работаем по договору",
  "Фиксированная комиссия",
  "Отправка в любые города РФ",
  "Собственные автовозы",
  "Шоурум в Маньчжурии",
  "Консультация бесплатно",
]

export function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Преимущества
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Почему выбирают нас?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Покупка автомобиля под заказ с аукционов – это выгодная и удобная альтернатива традиционным методам приобретения авто
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Advantages List */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="md:flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Авто под ключ: доставка, растаможка, оформление – всё за вас!
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {advantage}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Own Logistics - Unique Feature */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-card border border-primary/30 rounded-lg p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="md:flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Уникальная фишка
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                Собственная логистика
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                У нас появились два собственных автовоза. Это позволяет нам самостоятельно перевозить автомобили из Китая, исключая посредников и лишние хлопоты. Мы гарантируем максимальную безопасность, бережную погрузку и контроль на каждом этапе пути.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
