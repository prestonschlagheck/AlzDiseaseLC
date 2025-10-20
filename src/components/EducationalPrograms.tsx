'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, ExternalLink, Heart, Beaker } from 'lucide-react'
import Image from 'next/image'

interface Activity { 
  title: string; 
  icon: React.ReactNode; 
  href: string;
  category: string;
  imageUrl?: string;
}

function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <a 
        href={activity.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 bg-white h-full overflow-hidden group-hover:scale-105"
      >
        {/* Image Section */}
        <div className="relative h-44 overflow-hidden rounded-t-3xl bg-gray-100 flex items-center justify-center">
          {activity.imageUrl ? (
            <Image
              src={activity.imageUrl}
              alt={activity.title}
              fill
              className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                // Special positioning for FCS image to focus on bottom right person
                activity.title === 'FCS & SHTG: Are we meeting the need?'
                  ? 'object-bottom object-right'
                  // Special positioning for CETP activity to shift image up by 30%
                  : activity.title === 'CETP inhibition & obicetrapib: A new era in lipid management'
                  ? 'object-top'
                  // Move all other images except the last two up in positioning
                  : activity.title !== 'Exploring CETP as a therapeutic target' && 
                    activity.title !== 'LOVE STORY: Lipid Education for Women\'s Heart Health'
                    ? 'object-top' 
                    : 'object-center'
              } ${
                // Brighten images to match others - different levels for different images
                activity.title === 'Clinical choices in managing LDL-C: Where do novel therapies fit in?'
                  ? 'brightness-150' 
                  : activity.title === 'Exploring CETP as a therapeutic target'
                  ? 'brightness-125'
                  : ''
              } ${
                // Custom positioning for CETP activity
                activity.title === 'CETP inhibition & obicetrapib: A new era in lipid management'
                  ? 'object-[center_35%]'
                  : ''
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <span className="text-gray-500 text-sm font-medium">Image Needed</span>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-5">
          {/* Category */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              {activity.icon}
            </div>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
              {activity.category}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
            {activity.title}
          </h3>
          
        </div>
      </a>
    </motion.div>
  )
}

export function EducationalPrograms() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const activities: Activity[] = [
    {
      title: '[PLACEHOLDER: Educational Activity 1]',
      icon: <BookOpen size={16} className="text-blue-700" />,
      href: '#',
      category: 'Screening & Diagnosis',
      imageUrl: ''
    },
    {
      title: '[PLACEHOLDER: Educational Activity 2]',
      icon: <Beaker size={16} className="text-blue-700" />,
      href: '#',
      category: 'Biomarkers & Testing',
      imageUrl: ''
    },
    {
      title: '[PLACEHOLDER: Educational Activity 3]',
      icon: <Heart size={16} className="text-blue-700" />,
      href: '#',
      category: 'Treatment Options',
      imageUrl: ''
    },
    {
      title: '[PLACEHOLDER: Educational Activity 4]',
      icon: <BookOpen size={16} className="text-blue-700" />,
      href: '#',
      category: 'Patient Care & Management',
      imageUrl: ''
    }
  ]

  return (
    <section ref={ref} id="activities" className="py-16 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-3s"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-6s"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Educational{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Activities</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-700 max-w-6xl mx-auto leading-relaxed text-center">
            CME and clinical practice programs covering screening, diagnosis, biomarkers, treatment, and patient care in Alzheimer&apos;s Disease.
          </p>
        </motion.div>

        {/* Activities Grid - 2 columns, wider boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}