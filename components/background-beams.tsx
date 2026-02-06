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
    const beamCount = 6
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
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="absolute w-[1.5px] h-[150%] bg-gradient-to-b from-transparent via-primary to-transparent animate-beam-float shadow-[0_0_20px_rgba(234,40,40,0.8)]"
          style={
            {
              left: beam.left,
              top: "-25%",
              "--beam-rotate": beam.rotate,
              animationDuration: beam.duration,
              animationDelay: beam.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
