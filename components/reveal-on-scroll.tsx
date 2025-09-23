"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface RevealOnScrollProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}

export function RevealOnScroll({ children, direction = "up", delay = 0, className = "" }: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
