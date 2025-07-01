'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Building, MessageSquare, Shield, Zap, Users, MapPin } from 'lucide-react';

const InputField = ({ icon: Icon, name, placeholder, type = 'text', required = false, value, onChange }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="w-5 h-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md"
    />
  </div>
);

const ServiceCard = ({ service, isSelected, onClick }) => {
  const Icon = service.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(service.value)}
      className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
        isSelected 
          ? 'border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/20' 
          : 'border-gray-200 bg-white/90 hover:border-brand-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          isSelected ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{service.label}</h4>
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copied, setCopied] = useState({ phone: false, email: false });

  const services = [
    { value: 'vapt', label: 'Vulnerability Assessment & Penetration Testing', icon: Shield },
    { value: 'network-security', label: 'Network Security', icon: Zap },
    { value: 'devsecops', label: 'DevSecOps Integration', icon: Users },
    { value: 'compliance', label: 'Compliance & Audit', icon: CheckCircle },
    { value: 'consultation', label: 'Security Consultation', icon: MessageSquare },
    { value: 'other', label: 'Other Services', icon: Building }
  ];

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'contact',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: ''
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

  const handleCopy = (type, value) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(prev => ({ ...prev, [type]: true }));
        setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 1500);
      });
    } else {
      // Fallback for older browsers or environments
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(prev => ({ ...prev, [type]: true }));
        setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 1500);
      } catch (err) {}
      document.body.removeChild(textarea);
    }
  };

  return (
    <section id="contact-form-section" className="relative py-20 bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex flex-col h-full"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/20 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a message</h2>
                <p className="text-gray-600">Tell us about your security needs and we'll get back to you ASAP.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField icon={User} name="name" placeholder="Your name" required value={formData.name} onChange={handleInputChange} />
                  <InputField icon={Mail} name="email" placeholder="Email address" type="email" required value={formData.email} onChange={handleInputChange} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField icon={Phone} name="phone" placeholder="Phone number" type="tel" value={formData.phone} onChange={handleInputChange} />
                  <InputField icon={Building} name="company" placeholder="Company name" value={formData.company} onChange={handleInputChange} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Interest</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <ServiceCard
                        key={service.value}
                        service={service}
                        isSelected={formData.service === service.value}
                        onClick={(value) => setFormData(prev => ({ ...prev, service: value }))}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your security requirements..."
                      rows={3}
                      className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md resize-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : submitStatus === 'success' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                    </div>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! We'll get back to you within 15 minutes.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Sorry, there was an error sending your message. Please try again or contact us directly.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Column - Info & Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex flex-col h-full"
          >
            <div className="space-y-8 h-full flex flex-col">
              {/* Contact Info */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
                <div className="space-y-8">
                  {/* Ajman, UAE Office */}
                  <div className="border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center">
                        <Building className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Ajman, UAE Office</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">UAE</span>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-gray-500">GMT+4</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-green-700">Head Office</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 ml-13">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Office C1‑1F‑SF10950, C1 Building, Ajman Free Zone, Ajman, UAE, 932</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-black select-all">+971 50 509 1807</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('phone', '+971 50 509 1807')}
                          className="ml-2 px-2 py-1 rounded bg-brand-100 text-brand-700 hover:bg-brand-200 transition-colors text-xs font-semibold flex items-center gap-1"
                        >
                          {copied.phone ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-black select-all">contact@captrit.ae</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('email', 'contact@captrit.ae')}
                          className="ml-2 px-2 py-1 rounded bg-brand-100 text-brand-700 hover:bg-brand-200 transition-colors text-xs font-semibold flex items-center gap-1"
                        >
                          {copied.email ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-9 text-white flex flex-col flex-1 justify-between">
                <h3 className="text-2xl font-bold mb-7">Why choose us?</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">Expert security professionals</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">Fast response times</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">Trusted by leading organizations worldwide</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">24/7 security support</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">Proven track record with startups & enterprises</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">Transparent, predictable pricing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">Custom solutions for every client</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">Ongoing support & partnership</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 