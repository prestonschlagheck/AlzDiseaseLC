'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function Hero() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])
  
  const scrollToWithOffset = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerHeight = 88 // fixed header (~h-20 plus extra spacing)
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  return (
    <section className="relative min-h-[calc(100vh-4rem)] lg:h-[75vh] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
    >
      {/* Sophisticated Background Patterns */}
      <div className="absolute inset-0">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => {
            const randomX1 = Math.random() * dimensions.width
            const randomY1 = Math.random() * dimensions.height
            const randomX2 = Math.random() * dimensions.width
            const randomY2 = Math.random() * dimensions.height
            const randomX3 = Math.random() * dimensions.width
            const randomY3 = Math.random() * dimensions.height
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                initial={{
                  x: randomX1,
                  y: randomY1,
                }}
                animate={{
                  x: [randomX1, randomX2, randomX3],
                  y: [randomY1, randomY2, randomY3],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            )
          })}
        </div>

        {/* Medical Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="border-r border-blue-300/20 h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="border-b border-blue-300/20 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Dynamic Gradient Overlays */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(0, 102, 204, 0.3) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 20%, rgba(0, 166, 184, 0.3) 0%, transparent 60%)",
              "radial-gradient(circle at 40% 70%, rgba(0, 212, 229, 0.3) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 30%, rgba(0, 102, 204, 0.3) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        />
      </div>



      {/* Main Content */}
      <div className="relative z-10 flex items-center h-full px-6 lg:px-12 py-8 lg:py-0">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          
          {/* Logo - Centered Above Title */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="flex justify-center"
          >
            <motion.div 
              className="relative w-full max-w-[200px] h-[150px]"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/Untitled design.png"
                alt="Alzheimer's Disease Learning Center Logo"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="200px"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Main Title - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <h1 className="heading-font text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-shadow-md">
              Alzheimer&apos;s Disease Learning Center
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                Evidence-Based Knowledge for Real-World Impact Across the Journey
              </span>
            </h1>
          </motion.div>

          {/* Description - Full Width */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-8 text-center py-4"
          >
            <motion.p 
              className="text-xs sm:text-sm lg:text-base text-blue-100 leading-relaxed font-sans max-w-5xl mx-auto py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Your trusted hub for Alzheimer&apos;s education grounded in peer-reviewed science and designed for real-world impact. Through expert interviews, case discussions, multidisciplinary panels, and patient-caregiver perspectives, leading clinicians translate current evidence into actionable steps for screening, diagnosis, treatment, and longitudinal support.
            </motion.p>
            <motion.p 
              className="text-xs sm:text-sm lg:text-base text-blue-100 leading-relaxed font-sans max-w-5xl mx-auto py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Join a community of neurology, psychiatry, geriatrics, primary care, nursing, pharmacy, and neuropsychology professionals, engage with concise modules, current up-to-date guidelines, and practical tools you can use in the clinic today.
            </motion.p>
          </motion.div>

          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex justify-center items-center gap-4 pt-4"
          >
            <motion.button 
              onClick={() => scrollToWithOffset('activities')}
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold shadow-xl group"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Explore Activities</span>
            </motion.button>
            <motion.button 
              onClick={() => scrollToWithOffset('resource-center')}
              className="relative px-8 py-4 rounded-xl font-semibold border-2 border-white/60 text-white/90 backdrop-blur-sm overflow-hidden group"
              whileHover={{ 
                scale: 1.05, 
                borderColor: "rgba(255, 255, 255, 0.9)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Explore Resources</span>
            </motion.button>
          </motion.div>
        </div>
      </div>


    </section>
  )
} 