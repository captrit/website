'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle, Zap, Users, Shield } from 'lucide-react';

const FAQItem = ({ question, answer, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative">
        <motion.button
          onClick={onToggle}
          className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-500 ${
            isOpen 
              ? 'border-brand-300 bg-gradient-to-br from-brand-50/90 to-cyan-50/80 shadow-xl' 
              : 'border-slate-200 bg-gradient-to-br from-white/90 to-white/70 hover:border-brand-200 hover:shadow-lg'
          } backdrop-blur-md`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className={`relative p-3 rounded-xl ${
                isOpen 
                  ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-md'
              } group-hover:scale-110 transition-transform duration-300`}>
                <HelpCircle className="w-5 h-5" />
                <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  isOpen ? 'bg-brand-300' : 'bg-slate-300'
                } animate-pulse`} />
              </div>
              <h3 className={`text-lg font-bold ${
                isOpen ? 'text-brand-900' : 'text-slate-900'
              } group-hover:text-brand-700 transition-colors duration-300`}>
                {question}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`p-2 rounded-lg ${
                isOpen 
                  ? 'bg-brand-100 text-brand-600' 
                  : 'bg-slate-100 text-slate-500'
              } group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors duration-300`}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-slate-700 text-base leading-relaxed font-medium">
                    {answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      q: 'How do you assign engineers?',
      a: 'We allocate multiple engineers (AppSec, CloudSec, DevSecOps) as needed — not just one person. You get parallel execution and the right specialist for each task.'
    },
    {
      q: 'Why is this better than hiring full-time?',
      a: 'You get a full security team for half the cost of one engineer, with no hiring delays, no HR overhead, and no wasted hours.'
    },
    {
      q: 'Can I add hours anytime?',
      a: 'Yes! You can buy more engineer hours at your plan rate, or purchase 4-hour blocks for urgent needs.'
    },
    {
      q: 'Can you help with SOC2 or secure CI/CD?',
      a: "Absolutely. We handle compliance, DevSecOps, secure SDLC, and more — just set your priorities and we'll execute."
    }
  ];

  return (
    <section className="py-24 bg-white relative min-h-screen">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-md border border-gray-200/80 cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
              </span>
              <span className="text-sm font-semibold text-brand-800 tracking-wide">FAQ</span>
            </motion.span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6">
            Frequently Asked <span className="text-brand-600">Questions</span>
          </h2>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Everything you need to know about our security team model and how it works.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              index={index}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 