'use client';

import React from 'react'
import { Shield, FileText, LockKeyhole, Zap } from 'lucide-react'

export default function SecurityReport() {
  return (
    <section className="relative py-24 bg-white">
      {/* Brand Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Report Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/80 to-brand-100/80 rounded-3xl blur-3xl -z-10"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-brand-600 text-sm font-medium">Security Report</p>
                  <h3 className="text-text-primary text-xl font-bold">SQL Injection</h3>
                </div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="h-2 bg-gray-100/50 rounded-full w-3/4"></div>
                <div className="h-2 bg-gray-100/50 rounded-full w-5/6"></div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-4 font-mono text-sm mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-text-secondary">Vulnerable Endpoint</span>
                </div>
                <div className="bg-red-50/70 backdrop-blur-sm border border-red-100 rounded p-2 mb-3">
                  <code className="text-red-600">/api/users/{'{id}'}</code>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
                  <span className="text-text-secondary">Exploit</span>
                </div>
                <div className="bg-brand-50/70 backdrop-blur-sm border border-brand-100 rounded p-2">
                  <code className="text-brand-600 break-all">
                    /api/users/1234' UNION SELECT id,username,password,email FROM users--
                  </code>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-text-secondary">High Severity</span>
                </div>
                <span className="text-text-secondary">Data Exposure Risk</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Investor-Safe,<br />Dev-Readable Reports
              </span>
            </h2>
            
            <div className="space-y-4">
              {[
                // Generate more natural-looking line lengths
                'w-5/12', 'w-7/12', 'w-4/12', 'w-9/12',
                'w-6/12', 'w-3/12', 'w-8/12', 'w-5/12',
                'w-10/12', 'w-4/12', 'w-7/12', 'w-6/12',
                'w-7/12'
              ].map((widthClass, index) => (
                <div key={index} className="w-full">
                  <div 
                    className={`h-1.5 bg-gray-100 rounded-full ${widthClass} transition-all duration-200`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 