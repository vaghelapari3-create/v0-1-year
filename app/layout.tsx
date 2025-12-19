import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Dancing_Script, Parisienne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
})

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-brush",
})

export const metadata: Metadata = {
  title: "For My Beloved",
  description: "A special message for someone special",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dancingScript.variable} ${parisienne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
