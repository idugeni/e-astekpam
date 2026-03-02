
"use client";

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 text-foreground shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3">
        <Link href="/" className="flex items-center gap-2 text-base font-headline font-bold sm:text-xl">
          <ShieldCheck className="h-5 w-5 sm:h-7 sm:w-7" />
          <span className="truncate">E-ASTEKPAM</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
