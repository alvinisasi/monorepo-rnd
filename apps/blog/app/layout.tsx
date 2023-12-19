import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import { Providers } from '@/utils/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Simple blog built with Next JS',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers options={{ key: 'mui-theme' }}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
