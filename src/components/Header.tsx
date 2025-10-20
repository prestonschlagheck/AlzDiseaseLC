'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
  const [isOverBlueSection, setIsOverBlueSection] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section (blue background)
      const heroSection = document.querySelector('section')
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect()
        const headerHeight = 80
        
        // Check if the blue hero section is overlapping with the header area
        // Hero section is considered overlapping if:
        // 1. Its top is above the header bottom (heroRect.top < headerHeight)
        // 2. Its bottom is below the header top (heroRect.bottom > 0)
        // 3. We're not at the very top of the page (to account for white header area)
        const scrollY = window.scrollY
        const isOverBlue = scrollY > 50 && heroRect.top < headerHeight && heroRect.bottom > 0
        
        setIsOverBlueSection(isOverBlue)
      } else {
        // Fallback to blue styling if hero section not found
        setIsOverBlueSection(false)
      }
    }

    // Initial check
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header height (h-20 = 80px)
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigationItems = [
    { id: 'comprehensive-hub', label: 'AD Learning Center' },
    { id: 'alzheimers-statistics', label: 'Key Statistics' },
    { id: 'activities', label: 'Activities' },
    { id: 'resource-center', label: 'Resources' },
    { id: 'faculty', label: 'Expert Faculty' }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-xl"
    >
      <div className="w-full px-4 lg:px-8">
        <div className="flex items-center h-20 relative">
          {/* Logo / Placeholder - Far Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="flex items-center absolute left-4"
          >
            <Image
              src="/glc.webp"
              alt="GLC Logo"
              width={120}
              height={36}
            className={`h-9 w-auto object-contain hover:opacity-100 transition-all duration-300 cursor-pointer opacity-90 ${
              isOverBlueSection 
                ? 'brightness-0 invert' 
                : ''
            }`}
              priority
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </motion.div>

          {/* Navigation Tabs - Right Aligned */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`hidden lg:flex items-center space-x-4 absolute right-4 transition-all duration-300 ${
              isOverBlueSection 
                ? 'text-white' 
                : 'bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent'
            }`}
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                onClick={() => scrollToSection(item.id)}
                className="px-2 py-2 text-sm font-semibold hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Mobile Menu Button - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="lg:hidden absolute right-4"
          >
            <button className={`p-2 transition-colors duration-300 ${
              isOverBlueSection 
                ? 'text-white hover:text-gray-200' 
                : 'text-slate-800 hover:text-slate-900'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Animated gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-0.5 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 origin-left"
      />
    </motion.header>
  )
} 