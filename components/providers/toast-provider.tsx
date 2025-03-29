"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid #333",
        },
        success: {
          style: {
            background: "#2dd4bf",
            color: "#000",
          },
        },
        error: {
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        },
      }}
    />
  )
} 