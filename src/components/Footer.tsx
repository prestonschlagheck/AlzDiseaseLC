'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Redirect to admin dashboard
      router.push('/admin')
    } catch (error: any) {
      setLoginError(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <footer ref={ref} className="bg-gray-200 text-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center py-6">
            <Image src="/glc.webp" alt="GLC Logo" width={160} height={48} className="h-12 w-auto object-contain" />
          </div>
          <div className="text-center text-gray-500 text-sm flex items-center justify-center gap-3">
            <span>© 2025 Lipid 360°. All rights reserved.</span>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Login as Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold text-[#1a365d] mb-6 text-center">
                Admin Login
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1a365d] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1a365d] focus:outline-none transition-colors"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-red-600 text-sm">{loginError}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a365d] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a7c] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}