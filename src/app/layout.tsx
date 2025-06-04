import type { Metadata } from 'next';
import './globals.css';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import { ThemeProvider } from "next-themes";
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://e-astekpam.vercel.app'),
  title: 'E-ASTEKPAM | Aplikasi Laporan Harian Elektronik',
  description: 'Aplikasi Laporan Harian Elektronik untuk Administrasi, Sistem Teknologi, dan Keamanan Pengamanan (E-ASTEKPAM) Rumah Tahanan Negara Kelas IIB Wonosobo',
  openGraph: {
    title: 'E-ASTEKPAM | Aplikasi Laporan Harian Elektronik',
    description: 'Aplikasi Laporan Harian Elektronik untuk Administrasi, Sistem Teknologi, dan Keamanan Pengamanan (E-ASTEKPAM) Rumah Tahanan Negara Kelas IIB Wonosobo',
    url: 'https://e-astekpam.vercel.app',
    siteName: 'E-ASTEKPAM',
    images: [
      {
        url: '/e-astekpam.png',
        width: 1200,
        height: 630,
        alt: 'Logo E-ASTEKPAM dan deskripsi aplikasi',
        type: 'image/png',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@e_astekpam',
    creator: '@e_astekpam',
    title: 'E-ASTEKPAM | Aplikasi Laporan Harian Elektronik',
    description: 'Aplikasi Laporan Harian Elektronik untuk Administrasi, Sistem Teknologi, dan Keamanan Pengamanan (E-ASTEKPAM) Rumah Tahanan Negara Kelas IIB Wonosobo',
    images: ['/e-astekpam.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
            {children}
          </main>
          <Toaster />
          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}