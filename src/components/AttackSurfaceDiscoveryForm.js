'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import { 
  Shield, 
  Search, 
  Globe, 
  Building, 
  Mail, 
  Phone, 
  User, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Target,
  Eye,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const InputField = ({ icon: Icon, name, placeholder, type = 'text', required = false, options = null, value, onChange }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="w-4 h-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
    </div>
    {options ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md appearance-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md"
      />
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/20"
  >
    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
  </motion.div>
);

export default function AttackSurfaceDiscoveryForm() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const gridRef = useRef({});
  const [isMobile, setIsMobile] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    organizationName: '',
    domain: '',
    businessEmail: '',
    contactName: '',
    phone: '',
    companySize: '',
    industry: '',
    currentSecurityMeasures: '',
    primaryConcerns: '',
    timeline: ''
  });

  const fullConfig = resolveConfig(tailwindConfig);
  const colors = fullConfig.theme.colors;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsLoaded(true);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const GRID_SIZE = isMobile ? 30 : 40;
    const FADE_SPEED = 0.015;
    const MAX_OPACITY = 0.7;
    const BRAND_COLOR = colors.brand[600];

    const hexToRgba = (hex, alpha = 1) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleInteraction = (e) => {
      if (e.type === 'mousemove' && !isMouseDown) return;
      
      const rect = canvas.getBoundingClientRect();
      let interactionX, interactionY;
      
      if (e.type === 'touchmove') {
        if (!isLongPressing) return;
        if (e.cancelable) e.preventDefault();
        interactionX = e.touches[0].clientX - rect.left;
        interactionY = e.touches[0].clientY - rect.top;
      } else if (e.type === 'touchstart') {
        longPressTimer.current = setTimeout(() => {
          setIsLongPressing(true);
          if (e.cancelable) e.preventDefault();
        }, 300);
        return;
      } else if (e.buttons === 1 || e.type === 'mousedown') {
        interactionX = e.clientX - rect.left;
        interactionY = e.clientY - rect.top;
      } else {
        return;
      }

      const gridX = Math.floor(interactionX / GRID_SIZE);
      const gridY = Math.floor(interactionY / GRID_SIZE);
      const key = `${gridX}-${gridY}`;

      if (gridX * GRID_SIZE < canvas.width && gridY * GRID_SIZE < canvas.height && gridX >= 0 && gridY >= 0) {
        gridRef.current[key] = {
          opacity: MAX_OPACITY,
          x: gridX * GRID_SIZE,
          y: gridY * GRID_SIZE
        };
      }
    };

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        setIsMouseDown(true);
        handleInteraction(e);
      }
    };

    const handleTouchEnd = () => {
      setIsMouseDown(false);
      setIsLongPressing(false);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };

    const handleTouchCancel = () => {
      setIsMouseDown(false);
      setIsLongPressing(false);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('mouseup', () => {
      setIsMouseDown(false);
      setIsLongPressing(false);
    });
    
    canvas.addEventListener('touchstart', handleInteraction, { passive: false });
    canvas.addEventListener('touchmove', handleInteraction, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    canvas.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = hexToRgba(BRAND_COLOR, 0.12);
      ctx.lineWidth = 1;

      for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      Object.keys(gridRef.current).forEach(key => {
        const tile = gridRef.current[key];
        if (tile.opacity > 0) {
          ctx.fillStyle = hexToRgba(BRAND_COLOR, tile.opacity);
          ctx.fillRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          ctx.shadowColor = hexToRgba(BRAND_COLOR, 0.3);
          ctx.shadowBlur = 5;
          ctx.fillRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          ctx.shadowBlur = 0;
          ctx.strokeStyle = hexToRgba(BRAND_COLOR, tile.opacity * 1.5);
          ctx.lineWidth = 1;
          ctx.strokeRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          tile.opacity -= FADE_SPEED;
        } else {
          delete gridRef.current[key];
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('mouseup', () => {
        setIsMouseDown(false);
        setIsLongPressing(false);
      });
      
      canvas.removeEventListener('touchstart', handleInteraction);
      canvas.removeEventListener('touchmove', handleInteraction);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchCancel);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [colors, isMobile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/attack-surface-discovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after success
        setTimeout(() => {
          setFormData({
            organizationName: '',
            domain: '',
            businessEmail: '',
            contactName: '',
            phone: '',
            companySize: '',
            industry: '',
            currentSecurityMeasures: '',
            primaryConcerns: '',
            timeline: ''
          });
          setSubmitStatus(null);
        }, 3000);
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        console.error('Form submission error:', errorData);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-primary pt-32 scrollbar-hide">
      {/* Canvas for grid effect */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />

      {/* Brand Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute -left-20 top-40 w-60 h-60 bg-white/10 rounded-full blur-2xl opacity-60 animate-float pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              {/* Hero Info */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/40 border border-brand-200 mb-4"
                >
                  <div className="w-2 h-2 bg-brand-600 rounded-full animate-pulse"></div>
                  <span className="text-brand-600 text-sm font-medium">Limited Time Free</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight"
                >
                  Discover Your
                  <span className="block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                    Attack Surface
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 mb-6 leading-relaxed"
                >
                  Our expert security team will analyze your external infrastructure to identify vulnerabilities, exposed services, and potential attack vectors.
                </motion.p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FeatureCard
                  icon={Eye}
                  title="External Reconnaissance"
                  description="Comprehensive scanning of your public-facing assets and infrastructure"
                  gradient="from-blue-500 to-blue-600"
                />
                <FeatureCard
                  icon={Shield}
                  title="Vulnerability Assessment"
                  description="Identify security gaps and potential attack vectors"
                  gradient="from-emerald-500 to-emerald-600"
                />
                <FeatureCard
                  icon={Target}
                  title="Attack Vector Analysis"
                  description="Map potential attack paths and entry points"
                  gradient="from-purple-500 to-purple-600"
                />
                <FeatureCard
                  icon={Lock}
                  title="Security Recommendations"
                  description="Actionable insights to strengthen your security posture"
                  gradient="from-orange-500 to-orange-600"
                />
              </div>

              {/* What's Included */}
              <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-4 text-white">
                <h3 className="text-lg font-bold mb-3">What's Included</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <span className="text-xs">Detailed attack surface report</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <span className="text-xs">Vulnerability prioritization</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <span className="text-xs">Remediation roadmap</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <span className="text-xs">30-minute consultation call</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/20">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100/40 border border-brand-200 mb-4">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span className="text-brand-600 text-sm font-medium">Limited Time Free</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Attack Surface Discovery</h2>
                <p className="text-gray-600 text-sm mb-3">Get a comprehensive analysis of your external attack surface. Identify vulnerabilities before attackers do.</p>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-lg text-green-600">FREE</span>
                  <span className="text-sm text-gray-500 line-through">• Normally $1,000 USD</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField icon={Building} name="organizationName" placeholder="Organization name" required value={formData.organizationName} onChange={handleInputChange} />
                  <InputField icon={Globe} name="domain" placeholder="Primary domain" required value={formData.domain} onChange={handleInputChange} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField icon={Mail} name="businessEmail" placeholder="Business email" type="email" required value={formData.businessEmail} onChange={handleInputChange} />
                  <InputField icon={User} name="contactName" placeholder="Contact name" required value={formData.contactName} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField icon={Phone} name="phone" placeholder="Phone number" type="tel" value={formData.phone} onChange={handleInputChange} />
                  <InputField 
                    icon={Building} 
                    name="companySize" 
                    placeholder="Company size" 
                    options={[
                      { value: '1-10', label: '1-10 employees' },
                      { value: '11-50', label: '11-50 employees' },
                      { value: '51-200', label: '51-200 employees' },
                      { value: '201-1000', label: '201-1000 employees' },
                      { value: '1000+', label: '1000+ employees' }
                    ]}
                    value={formData.companySize}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    icon={Target} 
                    name="industry" 
                    placeholder="Industry" 
                    options={[
                      { value: 'technology', label: 'Technology' },
                      { value: 'finance', label: 'Finance' },
                      { value: 'healthcare', label: 'Healthcare' },
                      { value: 'ecommerce', label: 'E-commerce' },
                      { value: 'education', label: 'Education' },
                      { value: 'other', label: 'Other' }
                    ]}
                    value={formData.industry}
                    onChange={handleInputChange}
                  />
                  <InputField 
                    icon={Zap} 
                    name="timeline" 
                    placeholder="Timeline" 
                    options={[
                      { value: 'immediate', label: 'Immediate' },
                      { value: '1-2-weeks', label: '1-2 weeks' },
                      { value: '1-month', label: '1 month' },
                      { value: 'flexible', label: 'Flexible' }
                    ]}
                    value={formData.timeline}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Security Measures</label>
                  <textarea
                    name="currentSecurityMeasures"
                    value={formData.currentSecurityMeasures}
                    onChange={handleInputChange}
                    placeholder="Describe your current security setup..."
                    rows={2}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Security Concerns</label>
                  <textarea
                    name="primaryConcerns"
                    value={formData.primaryConcerns}
                    onChange={handleInputChange}
                    placeholder="What are your main security concerns?"
                    rows={2}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : submitStatus === 'success' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Free Analysis Requested!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span>Get Free Analysis</span>
                    </div>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Thank you! We'll contact you within 2 hours to schedule your free attack surface analysis.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Sorry, there was an error sending your request. Please try again or contact us directly.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 