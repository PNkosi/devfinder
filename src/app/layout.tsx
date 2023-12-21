import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import { GiTechnoHeart } from 'react-icons/gi'
import ThemeProvider from '@/providers/ThemeProvider'
import Navbar from './components/Navbar'
import Search from './components/Search'
import Link from 'next/link'
import { GithubSearchProvider } from '@/providers/GithubSearchProvider'

const robotoMono = Roboto_Mono({
  weight: ['400', '600', '700'],
  subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"]
})

export const metadata: Metadata = {
  title: 'devfinder',
  description: 'Search github users and tinker with their profiles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <GithubSearchProvider>
            <header>
              <Navbar />
              <Search />
            </header>
            <main>
              {children}
            </main>
          </GithubSearchProvider>
          <footer className='text-foreground dark:text-slate-500'>
            <small className='flex items-center justify-center gap-2'>Developed with a techy <GiTechnoHeart className="text-red-600 animate-pulse" /> by <Link className='text-primary' href="https://github.com/PNkosi">Perfect Nkosi</Link></small>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
