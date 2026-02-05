import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const _inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: 'BG AUTO - Авто под заказ | Япония, Корея, Китай',
  description: 'Автомобили под заказ с аукционов Японии, Кореи и Китая. Выгода от 300 000 рублей. Полное сопровождение сделки.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/bgauto/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/bgauto/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/bgauto/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/bgauto/apple-icon.png',
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
        {children}
      </body>
    </html>
  )
}
