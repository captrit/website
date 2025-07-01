'use client';

import React, { useState } from 'react';
import { Globe, Smartphone, FlaskConical, Cloud, Network, Settings, Brain, ShieldCheck, Layers, ArrowRight, Server, Shield, Code, Target, Fish, AppWindow } from 'lucide-react';

const CATEGORIZED_SERVICES = [
  {
    name: 'Application Security',
    icon: <Code className="w-5 h-5 mr-2" />,
    services: [
      { 
        icon: <Globe className="w-8 h-8" />, title: 'Web App Pentesting',
        aed: [15000, 30000], usd: [4100, 8200],
        description: "Comprehensive testing of your web applications to identify and remediate vulnerabilities, from injection flaws to broken access control."
      },
      { 
        icon: <Smartphone className="w-8 h-8" />, title: 'Mobile App Pentesting',
        aed: [12000, 25000], usd: [3300, 6900],
        description: "In-depth security analysis of your iOS and Android applications to uncover flaws in the app, its backend APIs, and third-party libraries."
      },
      { 
        icon: <FlaskConical className="w-8 h-8" />, title: 'API Security Testing',
        aed: [15000, 50000], usd: [4100, 13700],
        description: "Specialized testing of your REST, SOAP, and GraphQL APIs to prevent data breaches and ensure secure communication between services."
      },
      { 
        icon: <AppWindow className="w-8 h-8" />, title: 'Thick Client VAPT',
        aed: [15000, 30000], usd: [4100, 8200],
        description: "Security testing of your standalone desktop applications to identify vulnerabilities in the client, server communication, and data storage."
      },
    ]
  },
  {
    name: 'Infrastructure & Cloud',
    icon: <Server className="w-5 h-5 mr-2" />,
    services: [
      { 
        icon: <Cloud className="w-8 h-8" />, title: 'Cloud Security Audit (Basic)',
        aed: [2200, 6700], usd: [600, 1800],
        description: "A foundational review of your cloud configuration (AWS, Azure, GCP) to identify common misconfigurations and security gaps."
      },
      { 
        icon: <Network className="w-8 h-8" />, title: 'Network VAPT',
        aed: [20000, 50000], usd: [5500, 13700],
        description: "Thorough vulnerability assessment and penetration testing of your internal and external networks to protect against unauthorized access."
      },
      { 
        icon: <Settings className="w-8 h-8" />, title: 'DevSecOps / CI/CD Audit',
        aed: [6000, 18000], usd: [1600, 5000],
        description: "Review and analysis of your development pipeline to integrate security practices, automating checks and ensuring a secure SDLC."
      },
    ]
  },
   {
    name: 'Specialized Pentesting',
    icon: <Layers className="w-5 h-5 mr-2" />,
    services: [
        { 
            icon: <Layers className="w-8 h-8" />, title: 'Gray Box Pentesting',
            aed: [15000, 50000], usd: [4100, 13700],
            description: "A simulated attack with partial knowledge of the target system, balancing efficiency with depth to find critical vulnerabilities."
        },
        { 
            icon: <Layers className="w-8 h-8" />, title: 'Black Box Pentesting',
            aed: [15000, 150000], usd: [4100, 41000],
            description: "A real-world attack simulation with zero prior knowledge of your systems, testing your defenses from an external attacker's perspective."
        },
        { 
            icon: <Layers className="w-8 h-8" />, title: 'White Box Pentesting',
            aed: [15000, 180000], usd: [4100, 49000],
            description: "A full-knowledge assessment with access to source code and architecture, providing the most comprehensive analysis."
        },
        { 
            icon: <Target className="w-8 h-8" />, title: 'Red Team Simulation',
            aed: [15000, 150000], usd: [4100, 41000],
            description: "Stealth ops, phishing, and social engineering to test your organization's detection and response capabilities."
        },
    ]
  }
];

function formatPrice(service, currency) {
  const { aed, usd, hourly, pricingModel } = service;
  const price = currency === 'AED' ? aed : usd;
  const [min, max] = price.length > 1 ? price : [price[0], price[0]];
  const symbol = currency === 'AED' ? 'AED' : '$';

  if (pricingModel === 'per-seat-yearly') {
    return `From ${symbol}${min.toLocaleString()}/year`;
  }

  const range = min === max 
    ? `${symbol}${min.toLocaleString()}` 
    : `${symbol}${min.toLocaleString()} – ${max.toLocaleString()}`;

  return hourly ? `${range}/hr` : range;
}

export default function OnDemandPricing() {
  const [currency, setCurrency] = useState('AED');
  const [activeCategory, setActiveCategory] = useState(CATEGORIZED_SERVICES[0].name);
  const activeServices = CATEGORIZED_SERVICES.find(cat => cat.name === activeCategory);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Currency Toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Service Offerings
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Each service is a standalone project. Prices are estimates and may vary based on scope.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 self-start md:self-center">
            <span className={`font-semibold transition-colors ${currency === 'AED' ? 'text-brand-600' : 'text-gray-500'}`}>
              AED
            </span>
            <button
              onClick={() => setCurrency(currency === 'AED' ? 'USD' : 'AED')}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 ${currency === 'USD' ? 'bg-brand-600' : 'bg-gray-200'}`}
              role="switch"
              aria-checked={currency === 'USD'}
            >
              <span
                aria-hidden="true"
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${currency === 'USD' ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className={`font-semibold transition-colors ${currency === 'USD' ? 'text-brand-600' : 'text-gray-500'}`}>
              USD
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex flex-wrap gap-x-6" aria-label="Tabs">
                    {CATEGORIZED_SERVICES.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            className={`${
                                activeCategory === category.name
                                    ? 'border-brand-500 text-brand-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-bold text-base transition-all`}
                        >
                            {category.icon}
                            {category.name}
                        </button>
                    ))}
                </nav>
            </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in" key={activeCategory}>
          {activeServices?.services.map((service) => (
            <div 
              key={service.title} 
              className="group relative bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-300 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-brand-50 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 ease-in-out"></div>
              <div className="p-6 flex-grow flex flex-col z-10">
                <div className="flex items-start justify-between">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-100 to-brand-100 text-brand-600 group-hover:from-cyan-500 group-hover:to-brand-500 group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                   <span className="px-3 py-1 text-xs rounded-full bg-brand-100 text-brand-700 font-bold shadow-sm group-hover:bg-brand-200 transition-colors">Premium</span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600 text-sm flex-grow">{service.description}</p>
              </div>
              
              <div className="bg-gray-50/70 p-6 border-t border-gray-200/80 z-10">
                <p className="text-xs text-gray-500 font-medium uppercase">Estimated Price</p>
                <div className="flex items-baseline">
                  <p className="mt-1 text-2xl font-extrabold text-gray-900 tracking-tight">
                    {formatPrice(service, currency)}
                  </p>
                  {service.pricingModel === 'per-seat-yearly' && <p className="ml-1.5 text-sm text-gray-500">per user</p>}
                </div>
                <a 
                  href="/contact" 
                  className="group/button mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-brand-600 text-white font-semibold text-sm shadow-sm hover:bg-gradient-to-r hover:from-brand-600 hover:to-cyan-500 transition-all duration-300"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
} 