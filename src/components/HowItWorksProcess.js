'use client';

import { motion } from 'framer-motion';
import { Shield, Code, Server, Users, FileText, RotateCcw, Zap, ArrowRight } from 'lucide-react';

export default function HowItWorksProcess() {
  const steps = [
    {
      id: 1,
      icon: Shield,
      title: "Kickoff",
      description: "Map your app, assets & risks. Set up access (code, cloud, CI/CD).",
      category: "Discovery",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      iconBg: "bg-blue-500",
      position: { desktop: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", mobile: "mb-8" }
    },
    {
      id: 2,
      icon: Code,
      title: "Continuous Security",
      description: "Security testing alongside development. Daily reviews, automated checks.",
      category: "Integration",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-100/50",
      iconBg: "bg-indigo-500",
      position: { desktop: "top-1/4 right-0 translate-x-1/2 -translate-y-1/2", mobile: "mb-8" }
    },
    {
      id: 3,
      icon: Server,
      title: "Harden Pipelines",
      description: "Secure CI/CD, automate secrets checks, and harden deployments.",
      category: "DevOps",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-100/50",
      iconBg: "bg-purple-500",
      position: { desktop: "bottom-1/4 right-0 translate-x-1/2 translate-y-1/2", mobile: "mb-8" }
    },
    {
      id: 4,
      icon: Users,
      title: "Developer Support",
      description: "Slack guidance, ticket management, and real-time Q&A support.",
      category: "Support",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-100/50",
      iconBg: "bg-cyan-500",
      position: { desktop: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", mobile: "mb-8" }
    },
    {
      id: 5,
      icon: FileText,
      title: "Reporting",
      description: "Investor-grade PDF, maturity roadmap, and comprehensive planning.",
      category: "Documentation",
      color: "from-teal-500 to-green-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-green-100/50",
      iconBg: "bg-teal-500",
      position: { desktop: "bottom-1/4 left-0 -translate-x-1/2 translate-y-1/2", mobile: "mb-8" }
    },
    {
      id: 6,
      icon: RotateCcw,
      title: "Retest Loop",
      description: "Close the loop: retest, improve, and maintain security continuously.",
      category: "Continuous",
      color: "from-emerald-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-blue-100/50",
      iconBg: "bg-emerald-500",
      position: { desktop: "top-1/4 left-0 -translate-x-1/2 -translate-y-1/2", mobile: "mb-0" }
    }
  ];

  return (
    <section className="py-20 bg-white relative min-h-screen overflow-hidden">
      {/* Brand Gradient Orbs and Particles (EXACT MATCH) */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-100/20 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const left = (i * 7.3 + 5) % 100; // Deterministic left position
          const top = (i * 11.7 + 3) % 100; // Deterministic top position
          const xOffset = (i * 13) % 100 - 50; // Deterministic x animation
          const yOffset = (i * 17) % 100 - 50; // Deterministic y animation
          const duration = 6 + (i % 3) * 2; // Deterministic duration
          const delay = (i % 4) * 0.5; // Deterministic delay
          
          return (
            <motion.div
              key={i}
              animate={{
                x: [0, xOffset],
                y: [0, yOffset],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
              className="absolute w-2 h-2 bg-slate-300/40 rounded-full opacity-20"
              style={{
                left: `${left}%`,
                top: `${top}%`
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Security Roadmap</span>
            </motion.span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            Experience security as a <span className="text-brand-600">journey</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Our circular security process ensures continuous protection and improvement
          </p>
        </motion.div>

        {/* Desktop Circular Layout */}
        <div className="hidden lg:block">
          <div className="relative w-full max-w-[120rem] mx-auto">
            {/* Central Oval */}
            <div className="relative w-[1200px] h-[700px] mx-auto">
              {/* Outer Oval (SVG) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="25%" stopColor="#6366f1" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <ellipse
                  cx="600"
                  cy="350"
                  rx="540"
                  ry="260"
                  fill="none"
                  stroke="url(#connectionGradient)"
                  strokeWidth="3"
                  strokeDasharray="10 5"
                />
              </svg>

              {/* Step Cards in Oval Layout */}
              {steps.map((step, index) => {
                const angle = (index * 60) * (Math.PI / 180); // 60 degrees apart
                const rx = 540; // x-radius
                const ry = 260; // y-radius
                const cx = 600;
                const cy = 350;
                const x = Math.cos(angle - Math.PI / 2) * rx + cx;
                const y = Math.sin(angle - Math.PI / 2) * ry + cy;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="absolute w-72 h-56"
                    style={{
                      left: `${x - 144}px`,
                      top: `${y - 96}px`,
                    }}
                  >
                    <div className={`relative w-full h-full ${step.bgColor} backdrop-blur-sm border border-white/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] transition-all duration-500 group cursor-pointer`}>
                      {/* Step Number */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/50 backdrop-blur-xs rounded-full shadow-lg flex items-center justify-center border border-slate-200/50">
                        <span className="text-sm font-bold text-slate-600">{step.id}</span>
                      </div>

                      {/* Icon */}
                      <div className={`w-12 h-12 ${step.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>

                      {/* Content */}
                      <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed line-clamp-3">
                        {step.description}
                      </p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold shadow-md`}>
                        {step.category}
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Spiral Layout */}
        <div className="lg:hidden">
          <div className="relative max-w-md mx-auto">
            {/* Mobile Connection Path */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 300 800">
              <defs>
                <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="20%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="80%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <motion.path
                d="M150 50 Q50 150 150 250 Q250 350 150 450 Q50 550 150 650 Q250 750 150 800"
                fill="none"
                stroke="url(#mobileGradient)"
                strokeWidth="4"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Mobile Steps */}
            <div className="relative z-10 space-y-12 pt-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotate: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}
                >
                  {/* Step Container */}
                  <div className={`${step.bgColor} backdrop-blur-sm border border-white/40 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500 group`}>
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/50 backdrop-blur-xs rounded-full shadow-lg flex items-center justify-center border border-slate-200/50">
                      <span className="text-sm font-bold text-slate-600">{step.id}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 ${step.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-bold shadow-md`}>
                      {step.category}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  </div>

                  {/* Connection Dot */}
                  <div className={`absolute top-1/2 ${index % 2 === 0 ? '-right-2' : '-left-2'} w-4 h-4 ${step.iconBg} rounded-full shadow-lg transform -translate-y-1/2 z-20`} />
                </motion.div>
              ))}
            </div>

            {/* Loop Connection */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex justify-center mt-12"
            >
              <div className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-full shadow-lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                <span className="font-bold">Continuous Loop</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}