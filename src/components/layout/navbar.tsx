"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PackageSearch, Menu, X, PlayCircle, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { useToastStore } from "@/lib/toast-store"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { isDemoMode, setDemoMode, resetDemo } = useAppStore()
  const { addToast } = useToastStore()

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Discover", href: "/discover" },
    { name: "Group Buys", href: "/group-buys" },
    { name: "Suppliers", href: "/suppliers" },
    { name: "Calculator", href: "/calculator" },
    { name: "PackAdvisor", href: "/packadvisor" },
    { name: "About", href: "/about" },
  ]

  const handleDemoMode = () => {
    setDemoMode(true)
    addToast("Demo Mode Activated: Demo scenario loaded.", "success")
  }

  const handleResetDemo = () => {
    resetDemo()
    addToast("Demo reset successfully.", "info")
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 rounded-full glass border-border/40 shadow-lg">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-primary font-black text-2xl tracking-tighter hover:scale-105 transition-transform">
            <PackageSearch className="h-7 w-7" />
            <span>PackLoop</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-all hover:text-primary hover:-translate-y-0.5",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isDemoMode ? (
            <button 
              onClick={handleResetDemo}
              className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Demo
            </button>
          ) : (
            <button 
              onClick={handleDemoMode}
              className="flex items-center gap-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <PlayCircle className="h-4 w-4" />
              Demo Mode
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-4 bg-background">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              {isDemoMode ? (
                <button 
                  onClick={() => { handleResetDemo(); setIsOpen(false); }}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Demo
                </button>
              ) : (
                <button 
                  onClick={() => { handleDemoMode(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 py-2 rounded-md w-full transition-colors"
                >
                  <PlayCircle className="h-4 w-4" />
                  Demo Mode
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
