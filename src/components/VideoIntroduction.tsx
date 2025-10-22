'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Users, MapPin } from 'lucide-react'
import { AnimatedCounter } from './AnimatedCounter'

export function VideoIntroduction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const impactStats = [
    {
      icon: <Users size={32} className="text-blue-600" />,
      value: 101.2,
      suffix: 'M',
      label: 'Projected Adults 65+ with AD by 2050',
      description: 'It is estimated that by 2050, 101.2 million adults aged 65+ will have Alzheimer\'s Disease (AD).',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <TrendingUp size={32} className="text-teal-600" />,
      value: 23.2,
      suffix: 'M',
      label: 'Projected US MASD Cases by 2050',
      description: 'It is estimated that in 2020, 18.8 million adults in the US had MASD, which is expected to increase to 23.2 million by 2050.',
      gradient: 'from-teal-500 to-teal-600'
    }
  ]

  return (
    <section ref={ref} id="comprehensive-hub" className="py-12 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-40 right-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div 
          className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 500,
            }}
            animate={{
              y: [Math.random() * 500, Math.random() * 500, Math.random() * 500],
              x: [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Your Clinician-Focused Hub for Outcomes-Driven{' '}
            <br className="hidden sm:block" />
            Excellence in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Alzheimer&apos;s Disease Education
            </span>
          </h2>
          <p className="text-base lg:text-lg text-slate-700 max-w-6xl mx-auto leading-relaxed text-center">
            Join our community of neurology, psychiatry, geriatrics, primary care, nursing, pharmacy, and neuropsychology professionals by exploring curated educational resources grounded in peer-reviewed science. Bring this knowledge back to your teams to advance patient care and improve outcomes across the Alzheimer&apos;s Disease journey.
          </p>
        </motion.div>

        {/* Impact Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              }}
              className="relative bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden group cursor-default"
            >
              {/* Gradient Top Border */}
              <div className={`h-2 bg-gradient-to-r ${stat.gradient}`}></div>
              
              <div className="p-8">
                {/* Icon */}
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                  {stat.icon}
                </div>

                {/* Large Number - Animated Counter */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3, type: "spring" }}
                  className="mb-3"
                >
                  <div className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      duration={2.5}
                      decimals={1}
                    />
                  </div>
                </motion.div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Resource Card - Styled like statistics cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            y: -8,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          }}
          className="relative bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden group cursor-default"
        >
          {/* Gradient Top Border */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
          
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="mb-4 inline-block p-3 bg-purple-50 rounded-xl">
              <MapPin size={32} className="text-indigo-600" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Explore Regional Prevalence Data
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Multiple Alzheimer&apos;s prevalence maps are available for the United States, including the interactive Dementia DataHub provided by NORC at the University of Chicago, which offers county-level data on diagnosed Alzheimer&apos;s Disease and Related Dementias (ADRD) prevalence.
            </p>

            {/* Centered Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.dementiadatahub.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                NORC Dementia DataHub
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://www.axios.com/2025/05/06/alzheimers-report-americans-dementia-symptoms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Alzheimer&apos;s Prevalence Map (Axios)
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://www.alz.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Alzheimer&apos;s Association (ALZ.org)
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 