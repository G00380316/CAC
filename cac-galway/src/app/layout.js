import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Cac Galway',
    description: 'Cac Galway where the happiest people worship',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <meta name="google-site-verification" content="my7UK0FAQRjPV1v8QnMxdgr8OSCnO5hjqFyce-hNSig" />
            <body className={inter.className}>{children}</body>
            <Analytics />
        </html>
    )
}
