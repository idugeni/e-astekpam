
"use client";

import React from 'react';

export default function AppFooter() {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-muted/50 dark:bg-muted/20 text-muted-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm">
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
