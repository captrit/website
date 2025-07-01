'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="relative w-full py-16 sm:py-28 overflow-hidden bg-white">
      {/* Brand Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] border border-white/20">
          <div className="relative z-10 px-6 py-12 sm:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Secure Your Digital Future
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                Ready to fortify your <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">digital assets</span> with confidence?
              </h2>
              
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
                Join leading startups that trust us to secure their digital infrastructure. 
                Get started with a free security assessment today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                <motion.a
                  whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(5, 102, 141, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  href="/attack-surface-discovery"
                  className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl text-base font-semibold flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Get Free Security Assessment</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  href="/contact"
                  className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-text-primary rounded-xl text-base font-semibold flex items-center justify-center gap-3 transition-all duration-300 border border-gray-200 hover:border-brand-200"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-500" />
                    <span>Contact Us</span>
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-brand-500" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 