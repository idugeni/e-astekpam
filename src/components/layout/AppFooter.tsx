
"use client";

import React from 'react';

export default function AppFooter() {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto bg-muted/50 py-5 text-muted-foreground dark:bg-muted/20 sm:py-6">
      <div className="container mx-auto px-3 text-center text-xs sm:px-4 sm:text-sm">
        {currentYear !== null ? (
          <p>&copy; {currentYear} E-ASTEKPAM. All rights reserved.</p>
        ) : (
          <p>&copy; E-ASTEKPAM. All rights reserved.</p>
        )}
        <p className="mt-1">
          Powered by Next.js & ShadCN UI
        </p>
      </div>
    </footer>
  );
}
