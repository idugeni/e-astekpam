
"use client";

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-headline font-bold">
          <ShieldCheck className="h-7 w-7" />
          E-ASTEKPAM
        </Link>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          {/* Navigation items can be added here if needed in the future */}
        </nav>
      </div>
    </header>
  );
}
