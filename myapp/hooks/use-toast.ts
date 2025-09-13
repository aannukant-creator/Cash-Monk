"use client"

import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  function addToast(toast: Omit<ToasterToast, "id">) {
    const id = genId()
    setToasts((currentToasts) => [...currentToasts, { ...toast, id }])
    return id
  }

  function dismissToast(id: string) {
    setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id))
  }

  return {
    toasts,
    addToast,
    dismissToast,
  }
}
