import "./globals.css";
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: 'Alzheimer\'s Disease Learning Center | Evidence-Based Knowledge for Real-World Impact',
  description: 'Your trusted hub for Alzheimer\'s education grounded in peer-reviewed science and designed for real-world impact. Through expert interviews, case discussions, multidisciplinary panels, and patient-caregiver perspectives, leading clinicians translate current evidence into actionable steps for screening, diagnosis, treatment, and longitudinal support.',
  keywords: 'Alzheimer\'s disease, dementia, ADRD, neurology, geriatrics, psychiatry, cognitive neurology, biomarkers, clinical trials, memory care, dementia care, neuropsychology, CME',
  authors: [{ name: 'Preston Schlagheck' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Alzheimer\'s Disease Learning Center | Evidence-Based Knowledge for Real-World Impact',
    description: 'Your trusted hub for Alzheimer\'s education grounded in peer-reviewed science and designed for real-world impact across the disease journey.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/alzlogo.png',
        width: 1200,
        height: 630,
        alt: 'Alzheimer\'s Disease Learning Center'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alzheimer\'s Disease Learning Center | Evidence-Based Knowledge for Real-World Impact',
    description: 'Your trusted hub for Alzheimer\'s education grounded in peer-reviewed science and designed for real-world impact.',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
