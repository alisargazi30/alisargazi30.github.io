"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = target.closest('button, a, input, textarea, [role="button"]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
    >
      <div className="w-8 h-8 bg-white rounded-full opacity-75" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
