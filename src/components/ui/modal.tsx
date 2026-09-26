"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export function Modal({ isOpen, onClose, children, className }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, className?: string }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className={cn("relative w-full max-w-lg rounded-xl bg-background border border-border p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200 text-foreground", className)}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}
