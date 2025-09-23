"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              className="w-32 h-32 mx-auto mb-8 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-500 border-l-cyan-500"></div>
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              علیرضا سرگزی
            </motion.h2>

            <motion.div
              className="w-64 h-2 bg-slate-700 rounded-full mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            <motion.p
              className="text-slate-300 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.round(progress)}% بارگذاری شده
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
