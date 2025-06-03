
import type { Metadata } from 'next';
import './globals.css';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import { ThemeProvider } from "next-themes";
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'E-ASTEKPAM | Aplikasi Laporan Harian Elektronik',
  description: 'Aplikasi Laporan Harian Elektronik untuk Administrasi, Sistem Teknologi, dan Keamanan Pengamanan (E-ASTEKPAM) Rumah Tahanan Negara Kelas IIB Wonosobo',
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
