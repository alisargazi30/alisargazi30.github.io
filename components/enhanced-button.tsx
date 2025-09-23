"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function EnhancedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
}: EnhancedButtonProps) {
  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-lg"

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
      />
      <span className="relative z-10">{children}</span>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white rounded-lg opacity-0"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
