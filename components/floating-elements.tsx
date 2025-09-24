"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Initialize window size
    updateWindowSize()

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("resize", updateWindowSize)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("resize", updateWindowSize)
    }
  }, [])

  const floatingShapes =
    windowSize.width > 0
      ? Array.from({ length: 6 }, (_, i) => ({
          id: i,
          size: Math.random() * 100 + 50,
          initialX: Math.random() * windowSize.width,
          initialY: Math.random() * windowSize.height,
          color: ["bg-blue-500/10", "bg-purple-500/10", "bg-pink-500/10", "bg-cyan-500/10"][i % 4],
        }))
      : []

  // Don't render until we have window size
  if (windowSize.width === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full blur-xl ${shape.color}`}
          style={{
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [shape.initialX, shape.initialX + 100, shape.initialX - 100, shape.initialX],
            y: [shape.initialY, shape.initialY - 100, shape.initialY + 100, shape.initialY],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + shape.id * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse follower */}
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />
    </div>
  )
}
