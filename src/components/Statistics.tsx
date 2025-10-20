'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Users, TrendingUp, Heart, Database, Globe2 } from 'lucide-react'

interface StatisticCardProps {
  icon: React.ReactNode
  value: string
  description: string
  index: number
  color: string
  cite?: { label: string; href: string }
}

function StatisticCard({ icon, value, description, index, color, cite }: StatisticCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className={`relative ${color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group-hover:scale-105 h-full`}> 
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/60 rounded-xl">
            {icon}
          </div>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2"
            >
              {value}
            </motion.div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        {cite && (
          <div className="absolute bottom-3 right-4 text-[10px] text-slate-500">
            <a href={cite.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              {cite.label}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Statistics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const statistics = [
    {
      icon: <Globe2 size={28} className="text-blue-700" />,
      value: "[PLACEHOLDER]",
      description: "[PLACEHOLDER: Add Alzheimer's prevalence statistic - e.g., global prevalence, age-related statistics]",
      color: "bg-gradient-to-br from-blue-50 to-teal-50",
      cite: { label: "Alzheimer's Assoc.", href: "https://www.alz.org/alzheimers-dementia/what-is-alzheimers" }
    },
    {
      icon: <TrendingUp size={28} className="text-blue-700" />,
      value: "[PLACEHOLDER]",
      description: "[PLACEHOLDER: Add treatment gap or diagnosis statistic - e.g., percentage of undiagnosed cases]",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      cite: { label: "NIH - NIA", href: "https://www.nia.nih.gov/health/alzheimers-and-dementia/alzheimers-disease-fact-sheet" }
    },
    {
      icon: <Heart size={28} className="text-blue-700" />,
      value: "[PLACEHOLDER]",
      description: "[PLACEHOLDER: Add impact statistic - e.g., caregiver burden, healthcare costs, or projected growth]",
      color: "bg-gradient-to-br from-teal-50 to-teal-100",
      cite: { label: "CDC", href: "https://www.cdc.gov/alzheimers-dementia/about/alzheimers.html" }
    }
  ]

  return (
    <section ref={ref} id="alzheimers-statistics" className="py-16 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Alzheimer&apos;s Disease <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Key Statistics</span>
          </h2>
        <p className="text-base lg:text-lg text-slate-700 max-w-6xl mx-auto leading-relaxed text-center">
          Understanding the impact and prevalence of Alzheimer&apos;s Disease across populations.
        </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
          {statistics.map((stat, index) => (
            <StatisticCard key={index} icon={stat.icon} value={stat.value} description={stat.description} index={index} color={stat.color} cite={stat.cite} />
          ))}
        </div>
      </div>
    </section>
  )
}