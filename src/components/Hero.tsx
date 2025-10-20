'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  const scrollToWithOffset = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerHeight = 88 // fixed header (~h-20 plus extra spacing)
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  return (
    <section className="relative min-h-[calc(100vh-4rem)] lg:h-[75vh] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Sophisticated Background Patterns */}
      <div className="absolute inset-0">
        {/* Medical Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-blue-300/20 h-full" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-b border-blue-300/20 w-full" />
            ))}
          </div>
        </div>


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
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Logo - Centered Above Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[200px] h-[150px]">
              <Image
                src="/Untitled design.png"
                alt="Alzheimer's Disease Learning Center Logo"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="200px"
                priority
              />
            </div>
          </motion.div>

          {/* Main Title - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-6 text-center"
          >
            <p className="text-sm sm:text-base lg:text-lg text-blue-100 leading-relaxed font-sans max-w-5xl mx-auto">
              Your trusted hub for Alzheimer&apos;s education grounded in peer-reviewed science and designed for real-world impact. Through expert interviews, case discussions, multidisciplinary panels, and patient-caregiver perspectives, leading clinicians translate current evidence into actionable steps for screening, diagnosis, treatment, and longitudinal support.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-blue-100 leading-relaxed font-sans max-w-5xl mx-auto">
              Join a community of neurology, psychiatry, geriatrics, primary care, nursing, pharmacy, and neuropsychology professionals, engage with concise modules, current up-to-date guidelines, and practical tools you can use in the clinic today.
            </p>
          </motion.div>

          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex justify-center items-center gap-4 pt-4"
          >
            <button 
              onClick={() => scrollToWithOffset('activities')}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Explore Activities
            </button>
            <button 
              onClick={() => scrollToWithOffset('resource-center')}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/60 text-white/90 hover:bg-white/10 hover:shadow-xl"
            >
              Explore Resources
            </button>
          </motion.div>
        </div>
      </div>


    </section>
  )
} 