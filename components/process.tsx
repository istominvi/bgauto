"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  FileText, 
  Search, 
  Gavel, 
  CreditCard, 
  Truck, 
  FileCheck, 
  Shield, 
  MapPin 
} from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Консультация и договор",
    description: "Оставляете заявку, менеджер подбирает варианты. При согласии заключается договор и вносится комиссия 30 000 руб.",
    icon: FileText,
  },
  {
    number: 2,
    title: "Поиск авто",
    description: "Менеджер присылает лоты с переводом аукционного листа и подробными пояснениями.",
    icon: Search,
  },
  {
    number: 3,
    title: "Участие в аукционе",
    description: "Ставим ставку исходя из средней стоимости. Аукционы идут с понедельника по субботу.",
    icon: Gavel,
  },
  {
    number: 4,
    title: "Оплата",
    description: "Вы оплачиваете инвойс (цена авто + расходы по стране отправителя + фрахт до Владивостока).",
    icon: CreditCard,
  },
  {
    number: 5,
    title: "Транспортировка до порта",
    description: "Логистическая компания забирает авто с площадки и везёт в порт отправки.",
    icon: Truck,
  },
  {
    number: 6,
    title: "Подготовка к экспорту",
    description: "Оформление документов и бронирование места на судне. Клиент получает подробный фотоотчёт перед погрузкой.",
    icon: FileCheck,
  },
  {
    number: 7,
    title: "Таможня во Владивостоке",
    description: "Прохождение таможенной очистки, лаборатории и получение СБКТС и ЭПТС.",
    icon: Shield,
  },
  {
    number: 8,
    title: "Доставка клиенту",
    description: "Самовывоз из офиса или отправка автовозом (в любой город РФ) / ж/д контейнером (до Москвы).",
    icon: MapPin,
  },
]

export function Process() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="stages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Этапы
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Как мы работаем
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            8 простых этапов от заявки до получения автомобиля
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-border" />
          <div 
            className="absolute top-12 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="grid grid-cols-8 gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative cursor-pointer group"
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step Circle */}
                <div className="flex justify-center mb-6">
                  <div
                    className={cn(
                      "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      index <= activeStep
                        ? "bg-primary border-primary text-primary-foreground scale-110"
                        : "bg-secondary border-border text-muted-foreground group-hover:border-primary/50"
                    )}
                  >
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>

                {/* Step Number */}
                <div
                  className={cn(
                    "text-center text-sm font-bold mb-2 transition-colors",
                    index <= activeStep ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  Этап {step.number}
                </div>

                {/* Step Title */}
                <div
                  className={cn(
                    "text-center text-xs font-medium transition-colors leading-tight",
                    index <= activeStep ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </div>
              </div>
            ))}
          </div>

          {/* Active Step Description */}
          <div className="mt-12 bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                {(() => {
                  const Icon = steps[activeStep].icon
                  return <Icon className="w-6 h-6 text-primary-foreground" />
                })()}
              </div>
              <div>
                <div className="text-primary font-semibold mb-1">
                  Этап {steps[activeStep].number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-muted-foreground">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={cn(
                    "relative pl-16 cursor-pointer transition-all duration-300",
                    activeStep === index ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      index <= activeStep
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-secondary border-border text-muted-foreground"
                    )}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "bg-card border rounded-lg p-4 transition-all duration-300",
                      activeStep === index
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded",
                          index <= activeStep
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        Этап {step.number}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "font-bold mb-1 transition-colors",
                        index <= activeStep ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </h3>
                    {activeStep === index && (
                      <p className="text-sm text-muted-foreground animate-in fade-in duration-300">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
