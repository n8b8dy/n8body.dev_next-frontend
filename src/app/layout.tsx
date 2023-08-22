import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Providers } from '@/app/providers'
import { MainLayout } from '@/components/layout/MainLayout'

import './globals.css'
import { VarelaRoundFont } from '@/app/fonts'

export const metadata: Metadata = {
  title: 'n8body.dev',
  description: 'website of a developer',
  viewport: 'width=device-width,initial-scale=1',
  authors: {
    url: 'https://github.com/n8b8dy',
    name: 'n8body',
  },
  keywords: process.env.KEYWORDS?.split(',') || [],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
  icons: {
    icon: ['/favicon-16x16.png', '/favicon-32x32.png'],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  applicationName: 'n8body.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <head>
      <link rel="mask-icon" href="/public/safari-pinned-tab.svg" color="#121212"/>
      <meta name="apple-mobile-web-app-title" content="n8body.dev"/>
      <meta name="msapplication-TileColor" content="#603cba"/>
    </head>
    <body className={VarelaRoundFont.className}>
    <Providers>
      <MainLayout>
        {children}
      </MainLayout>
    </Providers>
    </body>
    </html>
  )
}
