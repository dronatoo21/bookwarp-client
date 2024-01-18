import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import Navbar from './Navbar/Navbar'
import Footer from './footer/Footer'
import './globals.css'
import { ToastContainer } from 'react-toastify'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head>
        <link rel="icon" type="image/svg+xml" href="https://i.ibb.co/zZ66BxY/In-Shot-20240118-165615156.png" />
          <title>BookWarp</title>
        </head>
        <body className="container mx-auto">
          <Navbar/>
          <main>
            {children}
          </main>
          <Footer/>
          <ToastContainer/>
        </body>
    </html>
  )
}
