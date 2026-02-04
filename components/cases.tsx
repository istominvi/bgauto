"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Gauge, CircleDot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const cases = [
  {
    id: 1,
    image: "/images/case-1.jpg",
    title: "Toyota Harrier",
    year: 2021,
    client: "клиентке из Улан-Удэ",
    engine: "2.5л",
    mileage: "33.000км",
    condition: "аукционная оценка 4,5 балла",
    price: "3.050.000",
    priceNote: "под ключ",
    country: "Япония",
    date: "Январь 2025",
  },
  {
    id: 2,
    image: "/images/case-2.jpg",
    title: "Toyota RAV4",
    year: 2020,
    client: "клиенту Алексею из Улан-Удэ",
    engine: "2л",
    mileage: "45.000км",
    condition: "авто в идеальном состоянии",
    price: "2.320.000",
    priceNote: "до г. Забайкальск",
    country: "Китай",
    date: "Декабрь 2024",
  },
  {
    id: 3,
    image: "/images/case-3.jpg",
    title: "Lexus RX 350",
    year: 2022,
    client: "клиенту из Читы",
    engine: "3.5л V6",
    mileage: "28.000км",
    condition: "аукционная оценка 4,5 балла",
    price: "4.850.000",
    priceNote: "под ключ",
    country: "Япония",
    date: "Декабрь 2024",
  },
  {
    id: 4,
    image: "/images/case-4.jpg",
    title: "Honda CR-V",
    year: 2021,
    client: "клиенту из Иркутска",
    engine: "1.5л турбо",
    mileage: "41.000км",
    condition: "авто в отличном состоянии",
    price: "2.780.000",
    priceNote: "под ключ",
    country: "Корея",
    date: "Ноябрь 2024",
  },
  {
    id: 5,
    image: "/images/case-5.jpg",
    title: "Mazda CX-5",
    year: 2022,
    client: "клиентке Анне из Читы",
    engine: "2.5л",
    mileage: "22.000км",
    condition: "аукционная оценка 5 баллов",
    price: "2.950.000",
    priceNote: "под ключ",
    country: "Япония",
    date: "Ноябрь 2024",
  },
  {
    id: 6,
    image: "/images/case-6.jpg",
    title: "Toyota Camry",
    year: 2021,
    client: "клиенту из Улан-Удэ",
    engine: "2.5л",
    mileage: "38.000км",
    condition: "авто в идеальном состоянии",
    price: "2.650.000",
    priceNote: "до г. Улан-Удэ",
    country: "Китай",
    date: "Октябрь 2024",
  },
]

export function Cases() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section id="cases" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Выполненные заказы
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Реальные примеры наших работ
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Автомобили, которые мы привезли нашим клиентам из Японии, Кореи и Китая
            </p>
          </div>
          
          {/* Navigation buttons - desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-10 w-10 rounded-full border-border bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Предыдущий</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-10 w-10 rounded-full border-border bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Следующий</span>
            </Button>
          </div>
        </div>

        {/* Cases carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cases.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
            >
              {/* Card with 9:16 aspect ratio image area */}
              <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-colors">
                {/* Image container - 9:16 ratio */}
                <div className="relative aspect-[9/16] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.title} ${item.year}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Country and date badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {item.country}
                    </div>
                    <div className="bg-black/60 text-white/90 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {item.date}
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}, {item.year}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">
                      Выдали {item.client}
                    </p>
                    
                    {/* Specs with icons */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <Gauge className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>двигатель {item.engine}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <CircleDot className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>пробег {item.mileage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item.condition}</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="pt-3 border-t border-white/20">
                      <div className="text-primary text-xl font-bold">
                        {item.price} &#8381;
                      </div>
                      <div className="text-white/60 text-xs">
                        {item.priceNote}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons - mobile */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-full border-border bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Предыдущий</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-full border-border bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Следующий</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
