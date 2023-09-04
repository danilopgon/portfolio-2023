import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from './context/providers'
import NavBar from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'danilopgon | Dani López González',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.className} scroll-smooth bg-default-50 `}>
      <body className="bg-default-50">
        <Providers>
          <NavBar shouldHideOnScroll={true} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
