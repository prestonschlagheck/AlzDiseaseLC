'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FileText, ExternalLink, Award, Beaker, Database, Download, ChevronDown, ChevronUp } from 'lucide-react'

interface ResourceLink { 
  title: string; 
  href: string; 
  category: string;
  author?: string;
  date?: string;
  organization?: string;
}

interface ResourceGroup { 
  title: string; 
  icon: React.ReactNode; 
  items: ResourceLink[] 
}

export function ResourceCenter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [showResources, setShowResources] = useState(false)

  const resources: ResourceLink[] = [
    {
      title: '[PLACEHOLDER: Congress/Conference Calendar]',
      href: '#',
      category: 'Conference Calendar',
      author: '[Note: John McGuire\'s Team can help]',
      date: 'Ongoing'
    },
    {
      title: 'Revised criteria for diagnosis and staging of Alzheimer\'s disease: Alzheimer\'s Association Workgroup',
      href: 'https://pubmed.ncbi.nlm.nih.gov/38934362/',
      category: 'Therapeutic Guidelines',
      author: 'Alzheimer\'s Association Workgroup',
      date: '2024'
    },
    {
      title: '[PLACEHOLDER: Current CME Activities - Programmatic efforts (Eisai, BMS, Anavex, Otsuka, etc)]',
      href: '#',
      category: 'CME Activities',
      author: '[Note: Find all programmatic efforts]',
      date: 'Various'
    },
    {
      title: 'The Alzheimer\'s Association clinical practice guideline for the Diagnostic Evaluation, Testing, Counseling, and Disclosure of Suspected Alzheimer\'s Disease and Related Disorders (DETeCD-ADRD): Executive summary of recommendations for specialty care',
      href: 'https://pubmed.ncbi.nlm.nih.gov/39713957/',
      category: 'Therapeutic Guidelines',
      author: 'Alzheimer\'s Association',
      date: '2024'
    },
    {
      title: 'Alzheimer\'s Association Clinical Practice Guideline on the use of blood-based biomarkers in the diagnostic workup of suspected Alzheimer\'s disease within specialized care settings',
      href: 'https://pubmed.ncbi.nlm.nih.gov/40729527/',
      category: 'Diagnostic Resources',
      author: 'Alzheimer\'s Association',
      date: '2025'
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Conference Calendar':
        return <Database size={18} className="text-purple-600" />
      case 'Therapeutic Guidelines':
        return <Award size={18} className="text-blue-600" />
      case 'Diagnostic Resources':
        return <Beaker size={18} className="text-teal-600" />
      case 'CME Activities':
        return <FileText size={18} className="text-slate-600" />
      default:
        return <FileText size={18} className="text-slate-600" />
    }
  }

  return (
    <section ref={ref} id="resource-center" className="pt-16 pb-16 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4s"></div>
        
        {/* Scientific Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #0066CC 2px, transparent 2px), radial-gradient(circle at 75% 75%, #00A6B8 2px, transparent 2px)`,
            backgroundSize: '50px 50px, 80px 80px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Resource <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Center</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-700 max-w-6xl mx-auto leading-relaxed text-center">
            Conference calendars, therapeutic guidelines, diagnostic resources, and CME activities for Alzheimer&apos;s Disease.
          </p>
        </motion.div>

        {/* Toggle Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => setShowResources(!showResources)}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {showResources ? 'Hide Resources' : 'View Resources'}
            {showResources ? (
              <ChevronUp size={20} className="ml-2" />
            ) : (
              <ChevronDown size={20} className="ml-2" />
            )}
          </button>
        </motion.div>

        {/* Resources Grid */}
        {showResources && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* First Row - 3 shorter items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.slice(0, 3).map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col min-h-[280px]"
              >
                {/* Icon and Title */}
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(resource.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1 mt-1">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-2">
                      {resource.category}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-1 mb-4 flex-grow">
                  <p className="text-xs text-slate-500">{resource.author}</p>
                  <p className="text-xs text-slate-500">{resource.date}</p>
                </div>

                {/* Bottom Section - Fixed position */}
                <div className="mt-auto pt-4">
                  {/* Divider Line */}
                  <div className="border-t border-gray-200 mb-4"></div>
                  
                  {/* Read More Link - Centered */}
                  <div className="text-center">
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                      Read more
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
            
            {/* Second Row - 2 longer items, centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {resources.slice(3, 5).map((resource, index) => (
                  <motion.div
                    key={index + 3}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (index + 3) * 0.05 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col min-h-[280px]"
                  >
                    {/* Icon and Title */}
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getCategoryIcon(resource.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1 mt-1">
                          {resource.title}
                        </h3>
                        <p className="text-xs text-slate-600 mb-2">
                          {resource.category}
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1 mb-4 flex-grow">
                      <p className="text-xs text-slate-500">{resource.author}</p>
                      <p className="text-xs text-slate-500">{resource.date}</p>
                    </div>

                    {/* Bottom Section - Fixed position */}
                    <div className="mt-auto pt-4">
                      {/* Divider Line */}
                      <div className="border-t border-gray-200 mb-4"></div>
                      
                      {/* Read More Link - Centered */}
                      <div className="text-center">
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-xs font-medium"
                        >
                          Read more
                          <ExternalLink size={12} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}