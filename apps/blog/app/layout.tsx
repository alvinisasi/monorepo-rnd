import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import { Providers } from '@/utils/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { HeaderProps } from '@/utils/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Simple blog built with Next JS',
}

const menus: HeaderProps[] = [
  { url: '/', label: 'Home' },
	{ url: '/posts', label: 'Posts' },
	{ url: '/about', label: 'About' }
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers options={{ key: 'mui-theme' }}>
          <Header menus={menus}/>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
