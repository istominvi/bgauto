"use client"

import dynamic from "next/dynamic"

const BackgroundBeams = dynamic(
  () => import("./background-beams").then((mod) => mod.BackgroundBeams),
  { ssr: false }
)

export function GlobalBackground() {
  return <BackgroundBeams />
}
