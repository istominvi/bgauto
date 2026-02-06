"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { reviews } from "@/data/reviews"

export function Reviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      )
    }
  }

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 400
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const getCountryColor = (country: string) => {
    switch (country) {
      case "Япония":
        return "bg-red-500/20 text-red-400"
      case "Корея":
        return "bg-blue-500/20 text-blue-400"
      case "Китай":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-primary/20 text-primary"
    }
  }

  return (
    <section id="reviews" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Отзывы
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Что говорят наши клиенты
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Реальные отзывы от людей, которые уже получили свои автомобили
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-12 w-12 rounded-full border-border bg-transparent hover:bg-secondary disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-12 w-12 rounded-full border-border bg-transparent hover:bg-secondary disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[340px] md:w-[400px] snap-start"
            >
              <div className="h-full bg-card border border-border rounded-lg p-6 flex flex-col">
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed flex-1 mb-4">
                  {review.text}
                </p>

                {/* Footer */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar Placeholder */}
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {review.name ? review.name[0] : "K"}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {review.name || "Клиент BG AUTO"}
                        </div>
                        {review.car && (
                          <div className="text-xs text-muted-foreground">{review.car}</div>
                        )}
                      </div>
                    </div>
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", getCountryColor(review.country))}>
                      {review.country}
                    </span>
                  </div>
                  {review.savings && (
                    <div className="mt-3 p-2 bg-primary/10 rounded text-center">
                      <span className="text-primary font-semibold text-sm">
                        Экономия: {review.savings} руб.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>500+</div>
            <div className="text-sm text-muted-foreground">Довольных клиентов</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>5.0</div>
            <div className="text-sm text-muted-foreground">Средняя оценка</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>98%</div>
            <div className="text-sm text-muted-foreground">Рекомендуют нас</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>5 лет</div>
            <div className="text-sm text-muted-foreground">На рынке</div>
          </div>
        </div>
      </div>
    </section>
  )
}
