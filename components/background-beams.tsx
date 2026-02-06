"use client"

import React, { useEffect, useState } from "react"

interface Beam {
  id: number
  left: string
  top: string
  rotate: string
  duration: string
  delay: string
}

export function BackgroundBeams() {
  const [beams, setBeams] = useState<Beam[]>([])

  useEffect(() => {
    const beamCount = 6 // Was 4, +50% = 6
    const newBeams = Array.from({ length: beamCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotate: `${Math.random() * 360}deg`,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${-Math.random() * 20}s`,
    }))
    setBeams(newBeams)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      <div className="absolute inset-0 opacity-40">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className="absolute w-[1.5px] h-[150%] bg-gradient-to-b from-transparent via-primary to-transparent animate-bg-beam-float shadow-[0_0_20px_rgba(234,40,40,0.8)]"
            style={
              {
                left: beam.left,
                top: "-25%",
                transform: `rotate(${beam.rotate})`,
                animationDuration: beam.duration,
                animationDelay: beam.delay,
                "--beam-rotate": beam.rotate,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      <style jsx global>{`
        @keyframes bg-beam-float {
          0% {
            transform: rotate(var(--beam-rotate, 0deg)) translateY(-10%) translateX(-10%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--beam-rotate, 0deg) + 20deg)) translateY(10%) translateX(10%);
            opacity: 0;
          }
        }
        .animate-bg-beam-float {
          animation: bg-beam-float linear infinite;
        }
      `}</style>
    </div>
  )
}
