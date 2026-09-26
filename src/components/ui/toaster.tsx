"use client"

import { useToastStore } from "@/lib/toast-store"
import { CheckCircle2, Info, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToastStore()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-2 rounded-lg bg-card text-card-foreground p-4 shadow-lg border border-border animate-in slide-in-from-bottom-5"
        >
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-success" />}
          {toast.type === 'error' && <XCircle className="h-5 w-5 text-error" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-info" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
