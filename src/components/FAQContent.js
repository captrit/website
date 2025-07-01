'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Zap, Users, Globe, Code, Cloud, Target } from 'lucide-react';

const FAQ_CATEGORIES = [
  {
    id: 'general',
    name: 'General Questions',
    icon: <Shield className="w-5 h-5" />,
    color: 'from-brand-500 to-brand-600',
    questions: [
      {
        question: 'What is penetration testing and why do I need it?',
        answer: 'Penetration testing is a simulated cyber attack on your systems to identify vulnerabilities before malicious hackers can exploit them. It helps protect your data, maintain compliance, and build customer trust. Our comprehensive approach includes both automated scanning and manual testing to ensure thorough coverage.'
      },
      {
        question: 'How long does a typical penetration test take?',
        answer: 'The duration varies based on scope and complexity. A basic web application test typically takes 1-2 weeks, while comprehensive infrastructure testing can take 3-4 weeks. We provide detailed timelines during the planning phase and keep you updated throughout the process.'
      },
      {
        question: 'What is the difference between VAPT and penetration testing?',
        answer: 'VAPT (Vulnerability Assessment and Penetration Testing) is a comprehensive approach that combines automated vulnerability scanning with manual penetration testing. While vulnerability assessment identifies potential weaknesses, penetration testing actively exploits them to demonstrate real-world impact and validate findings.'
      }
    ]
  },
  {
    id: 'services',
    name: 'Our Services',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-cyan-500 to-cyan-600',
    questions: [
      {
        question: 'What types of applications and systems do you test?',
        answer: 'We test web applications, mobile apps, APIs, cloud infrastructure, network systems, IoT devices, and more. Our expertise covers both modern and legacy systems across various technologies and platforms including AWS, Azure, GCP, Docker, Kubernetes, and traditional on-premise environments.'
      },
      {
        question: 'Do you provide remediation guidance after testing?',
        answer: 'Yes, our detailed reports include prioritized remediation recommendations, technical guidance, and best practices to help you fix identified vulnerabilities effectively and efficiently. We also offer follow-up consultation to ensure proper implementation.'
      },
      {
        question: 'Are your security assessments compliant with industry standards?',
        answer: 'Our assessments follow industry standards including OWASP, NIST, and ISO 27001 methodologies. We can also tailor our approach to meet specific compliance requirements like PCI DSS, SOC 2, GDPR, or local UAE regulations.'
      }
    ]
  },
  {
    id: 'process',
    name: 'Our Process',
    icon: <Users className="w-5 h-5" />,
    color: 'from-brand-500 to-purple-600',
    questions: [
      {
        question: 'What is your testing methodology?',
        answer: 'We follow a systematic approach: 1) Planning and scoping, 2) Reconnaissance and information gathering, 3) Vulnerability analysis, 4) Exploitation and testing, 5) Post-exploitation analysis, 6) Reporting and remediation guidance. Each phase is documented and communicated transparently.'
      },
      {
        question: 'How do you ensure minimal disruption during testing?',
        answer: 'We coordinate closely with your team to schedule testing during low-traffic periods. Our testing is designed to be non-disruptive, and we immediately stop if any issues arise. We also provide 24/7 support during critical testing phases.'
      },
      {
        question: 'What happens after the testing is complete?',
        answer: 'We deliver a comprehensive report within 5-7 business days, followed by a detailed presentation to your team. We provide ongoing support for remediation efforts and can conduct follow-up assessments to verify fixes.'
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Details',
    icon: <Code className="w-5 h-5" />,
    color: 'from-green-500 to-green-600',
    questions: [
      {
        question: 'Do you test cloud environments?',
        answer: 'Yes, we specialize in cloud security testing including AWS, Azure, and GCP. We assess cloud configurations, IAM policies, storage security, network security, and application security in cloud environments.'
      },
      {
        question: 'What tools and techniques do you use?',
        answer: 'We use a combination of industry-standard tools and custom scripts. Our toolkit includes Burp Suite, OWASP ZAP, Metasploit, custom Python scripts, and specialized cloud security tools. We also develop custom exploits when needed.'
      },
      {
        question: 'How do you handle zero-day vulnerabilities?',
        answer: 'If we discover potential zero-day vulnerabilities, we document them thoroughly and report them responsibly. We work with vendors and coordinate disclosure timelines while ensuring your systems remain protected.'
      }
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance & Legal',
    icon: <Globe className="w-5 h-5" />,
    color: 'from-orange-500 to-orange-600',
    questions: [
      {
        question: 'Are your reports suitable for compliance audits?',
        answer: 'Yes, our reports are designed to meet compliance requirements for various standards including ISO 27001, PCI DSS, SOC 2, and GDPR. We can customize our reporting format to match your specific compliance needs.'
      },
      {
        question: 'What legal protections do you provide?',
        answer: 'We sign comprehensive NDAs and provide legal indemnification for our testing activities. All testing is conducted under formal agreements that protect both parties and ensure compliance with local laws.'
      },
      {
        question: 'Do you provide compliance consulting?',
        answer: 'Yes, we offer compliance consulting services to help you prepare for audits, implement security controls, and maintain ongoing compliance with relevant standards and regulations.'
      }
    ]
  }
];

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleQuestion = (questionId) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(questionId)) {
      newOpenQuestions.delete(questionId);
    } else {
      newOpenQuestions.add(questionId);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const filteredCategories = FAQ_CATEGORIES.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const activeCategoryData = filteredCategories.find(cat => cat.id === activeCategory) || filteredCategories[0];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
            />
            <Target className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap gap-x-6" aria-label="Tabs">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`${
                    activeCategory === category.id
                      ? 'border-brand-500 text-brand-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-bold text-base transition-all`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeCategoryData?.questions.map((faq, index) => {
                const questionId = `${activeCategory}-${index}`;
                const isOpen = openQuestions.has(questionId);

                return (
                  <motion.div
                    key={questionId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(questionId)}
                      className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded-2xl"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <div className="prose prose-gray max-w-none">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 