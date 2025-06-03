"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Placeholder untuk menghindari hydration mismatch.
    // Pastikan ukuran dan gaya placeholder sesuai dengan tombol.
    return (
      <div className="h-10 w-10 rounded-full border border-input bg-background animate-pulse" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          // Pastikan ikon memiliki kontras yang cukup di semua state.
          className="rounded-full transition-colors duration-200
                           text-foreground /* Default color with sufficient contrast */
                     hover:bg-accent hover:text-accent-foreground /* Ini menjamin kontras ikon saat hover */
                     focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {/* Ikon Sun dan Moon dengan transisi dan rotasi */}
          {/* Warna ikon secara default akan mewarisi warna teks dari tombol */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-[8rem]">
        {/* DropdownMenuItem juga memiliki gaya hover default yang menjamin kontras */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}