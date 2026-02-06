import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BackgroundBeams } from "@/components/background-beams"

const _inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: 'BG AUTO - Авто под заказ | Япония, Корея, Китай',
  description: 'Автомобили под заказ с аукционов Японии, Кореи и Китая. Выгода от 300 000 рублей. Полное сопровождение сделки.',
  generator: 'v0.app',
  icons: {
    icon: '/bgauto/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <BackgroundBeams />
        {children}
      </body>
    </html>
  )
}
