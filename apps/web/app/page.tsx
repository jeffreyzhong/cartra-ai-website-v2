import Navigation from './components/Navigation';
import FAQ from './components/FAQ';
import FadeIn from './components/FadeIn';
import CalendlyButton from './components/CalendlyButton';
import ContactLink from './components/ContactLink';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen text-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <FadeIn delay={100}>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                AI Workforce For Your Business
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="text-3xl md:text-5xl mb-6">
                <p className="mb-2">Custom AI Agents To Power</p>
                <p className="font-heading">The Future of Your Company.</p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Cut operational costs, improve productivity, and reduce human error by replacing manual, repetitive work with custom AI Agents tailored to your workflows and software stack.
              </p>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
                <div className="flex flex-col">
                  <CalendlyButton className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
                    Book a Free Consultation
                  </CalendlyButton>
                  <p className="text-sm text-gray-600 mt-2">or email us at <span className="underline">team@cartra.ai</span></p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span className="font-medium">Accepting 2 more clients in Q4 2025</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={500}>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Image src="/META.svg" alt="Meta" width={120} height={32} className="h-8 w-auto" />
                  <span className="text-gray-400">&</span>
                  <Image src="/GOOG.svg" alt="Google" width={120} height={32} className="h-8 w-auto" />
                </div>
                <p className="text-sm text-gray-600">Built by ex - Meta & Google engineers</p>
              </div>
            </FadeIn>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <FadeIn delay={600}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">60% avg cost savings</p>
                </div>
              </FadeIn>
              <FadeIn delay={650}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">30% reduction in human error</p>
                </div>
              </FadeIn>
              <FadeIn delay={700}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Fully customized to your company</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* What Are AI Agents Section
      <FadeIn delay={800}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 font-heading">
                The Digital-Employee Revolution.
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                If you&apos;ve heard about AI but aren&apos;t sure what it means for your business, you&apos;re not alone. Let us explain in plain terms.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
                <h3 className="text-2xl mb-4 font-heading">Think of an AI Agent as Your Digital Employee</h3>
                <p className="text-gray-700 mb-4">
                  An AI agent is like having a highly capable employee who never sleeps, never makes mistakes, and never asks for a raise. But instead of being a general-purpose worker, each agent is specifically trained to handle one type of task-perfectly.
                </p>
                <p className="text-gray-700">
                  Just like you might hire someone to handle your accounting, or someone else to manage customer service, an AI agent is built to excel at a specific job. The difference? It works 24/7, processes information instantly, and gets better over time-all while costing a fraction of a full-time employee.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Understand Your Business</h4>
                  <p className="text-gray-600 text-sm">
                    Unlike generic AI tools, custom agents are built specifically for your workflows, your software, and your industry. They speak your language and understand your processes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Work Around the Clock</h4>
                  <p className="text-gray-600 text-sm">
                    While your team sleeps, agents keep working. Process invoices overnight, respond to customer inquiries at 2 AM, or generate reports before your morning meeting-all automatically.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Never Get Tired or Make Mistakes</h4>
                  <p className="text-gray-600 text-sm">
                    Human error costs money. An agent follows the same process perfectly every single time-no typos, no missed steps, no &quot;I forgot to do that.&quot; Consistency becomes your new normal.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Scale With You</h4>
                  <p className="text-gray-600 text-sm">
                    Need to process 10x more invoices next month? An agent handles it without breaking a sweat. No hiring, no training, no growing pains-just instant capacity when you need it.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 border border-green-200 p-8 rounded-lg">
                <h3 className="text-2xl mb-4 font-heading">Why Mid-Market Companies Need Custom Agents</h3>
                <p className="text-gray-700 mb-4">
                  You&apos;ve probably seen big tech companies using AI, but here&apos;s the thing: <strong>mid-market companies often benefit even more</strong>. Here&apos;s why:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>You don&apos;t have enterprise budgets</strong> for massive IT teams, but you have the same operational challenges. Custom agents give you enterprise-level automation at a fraction of the cost.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>Every dollar counts.</strong> When you&apos;re growing, efficiency isn&apos;t nice-to-have-it&apos;s survival. Agents help you do more with your existing team and budget.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>You&apos;re competing with bigger players</strong> who have more resources. Agents level the playing field by automating tasks that would otherwise require hiring more people.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>Your processes are unique.</strong> Off-the-shelf software rarely fits perfectly. Custom agents are built specifically for how <em>you</em> work, not how some software company thinks you should work.</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-6">
                  The bottom line? AI agents aren&apos;t just for tech companies. They&apos;re for any company that wants to work smarter, reduce costs, and scale without the traditional constraints of headcount and operational overhead.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn> */}

      {/* Testimonials Section */}
      <FadeIn delay={800}>
        <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">The Results</p>
            <h2 className="text-3xl md:text-5xl mb-4 font-heading">Impact From Day 1.</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              While competitors debate AI strategy, our clients are already cutting costs and scaling operations-without adding headcount or complexity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading">8-Figure U.S. Freight Forwarder</h3>
              </div>
              <p className="text-gray-600">
                Automated customs forms processing, multiple ERP workflows, and built a custom email-triaging AI which reduced manual entry errors by 30%, cut document handling time by 50%, and enabled the operations team to process more shipments without increasing headcount.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading">250-Partner Law Firm</h3>
              </div>
              <p className="text-gray-600">
                Eliminated $500k in annual software waste and billable hour leakage. Partners now have their hours auto-tracked and logged with real-time dashboards instead of spending hours on manual time-entry.
              </p>
            </div>
          </div>
          
          <div className="bg-green-800 p-8 rounded-lg border border-green-700 shadow-sm mb-12">
            <h3 className="text-2xl mb-4 font-heading text-green-100">Built by engineers who&apos;ve scaled billions.</h3>
            <p className="text-white">
              Our team comes equipped with decades of combined experience across Meta and Google where we have scaled products to billion of users. We bring enterprise-grade engineering to mid-market operational challenges-at a fraction of enterprise pricing.
            </p>
          </div>
          
          <div className="text-center">
            <CalendlyButton className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
              Learn How We Can Help
            </CalendlyButton>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Problem Statement Section */}
      <FadeIn delay={1000}>
        <section id="opportunity" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">
              The Opportunity
            </p>
            <h2 className="text-3xl md:text-5xl mb-4 font-heading">
              Transform Your Company With AI.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlock untapped potential within your company by deploying custom AI agents that work 24/7, don&apos;t make mistakes, and scale your operations without increasing costs or headcount.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Do More With Less</h3>
              <p className="text-gray-600 text-sm">
                Your current team can accomplish exponentially more when AI agents handle the repetitive tasks. Multiply output without multiplying headcount. Turn your existing workforce into a force multiplier.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Edge Out Your Competitors</h3>
              <p className="text-gray-600 text-sm">
                While your competition struggles with manual bottlenecks and hiring constraints, you&apos;ll operate at speeds they can&apos;t match. Faster response times, lower costs, and superior service become your unfair advantage.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Repetitive Work is History</h3>
              <p className="text-gray-600 text-sm">
                Data entry, form filling, report generation, email triage. All the mind-numbing tasks that drain your team&apos;s time and energy. Our agents handle them flawlessly, 24/7, so your people can focus on what actually moves the needle.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Grow Beyond Limits</h3>
              <p className="text-gray-600 text-sm">
                Scale to new markets, serve more clients, launch new products. All without the traditional constraints of headcount and operational overhead. What seemed impossible becomes your new normal.
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Services Section
      <FadeIn delay={1300}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-heading">
              Example agents across<br />every cost sink
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From lead generation to customer support our AI agents are custom-built for your specific workflows, data, and industry requirements. These are just examples: let us build you what you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The AI Voice Agent</h4>
              <p className="text-gray-600 text-sm mb-4">Service Desks & Call Centers</p>
              <p className="text-gray-700 mb-4">
                Answers, triages, schedules, and resolves FAQs with 97% accuracy, cutting support spend up to 40% and recapturing missed revenue.
              </p>
              <p className="text-sm text-gray-500">Speech Recognition</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The Outreach Agent</h4>
              <p className="text-gray-600 text-sm mb-4">Sales & Community Outreach</p>
              <p className="text-gray-700 mb-4">
                Mines public data, drafts context‑rich messages, and auto‑schedules follow‑ups, driving 5x reply rates and three times more qualified leads while remaining CAN‑SPAM compliant.
              </p>
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-sm text-gray-600 mb-2">Search Prospects</p>
                <h5 className="text-sm mb-1 font-heading">Define Target Criteria</h5>
                <p className="text-xs text-gray-500 mb-2">Natural language prospect targeting</p>
                <p className="text-xs text-gray-600 italic">product managers at fintech companies</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The Automation Agent</h4>
              <p className="text-gray-600 text-sm mb-4">Finance & Back office</p>
              <p className="text-gray-700">
                Reconciles invoices, cross‑checks GL accounts, and updates dashboards overnight, saving a media conglomerate $400k in 90 days and returning 15 to 20 staff hours each week.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The Conversion Agent</h4>
              <p className="text-gray-600 text-sm mb-4">E-commerce & online portals</p>
              <p className="text-gray-700 mb-4">
                Engages hesitant shoppers in real time with smart recommendations and instant Q&A, lifting conversions up to 30% and average order value 25%.
              </p>
              <div className="flex gap-4 mt-4">
                <div className="text-sm">
                  <p className="text-gray-600">Avg Order Value</p>
                  <p className="text-green-600 font-semibold">+25%</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Revenue</p>
                  <p className="text-green-600 font-semibold">+30%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="#contact"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
      </FadeIn> */}

      {/* Industries Section */}
      <FadeIn delay={1200}>
        <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">
              The Market
            </p>
            <h2 className="text-4xl md:text-5xl mb-4 font-heading">Built from the ground up for all industries.</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every industry has it&apos;s own quircks, complexities, and requirements. We build for yours specifically.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Logistics & Manufacturing</h3>
              <p className="text-gray-600 text-sm">
                Optimize production and streamline supply chains. Automate customs documentation, invoice reconciliation, inventory management, and shipment tracking while reducing manual entry errors by 30% and eliminating operational bottlenecks.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Legal</h3>
              <p className="text-gray-600 text-sm">
                Streamline legal operations and reduce manual workload. Automate contract review, document analysis, compliance monitoring, and research tasks while maintaining confidentiality and regulatory standards, freeing legal teams to focus on strategic work.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Finance</h3>
              <p className="text-gray-600 text-sm">
                Forecast faster and serve smarter. Automated reconciliations, real-time anomaly detection, and personalized client outreach strengthen compliance posture while freeing analysts from spreadsheet drudgery and manual data entry.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Insurance</h3>
              <p className="text-gray-600 text-sm">
                Process claims faster and underwrite smarter. Automated policy reviews, fraud detection, and intelligent document extraction reduce processing time by 50% while improving accuracy and customer satisfaction, all within regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Process Section */}
      <FadeIn delay={1400}>
        <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">
              The Process
            </p>
            <h2 className="text-4xl md:text-5xl mb-4 font-heading">
              From analysis to<br />transformation in just weeks.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-2xl mb-4 text-gray-400 font-heading">01</h5>
              <h3 className="text-2xl mb-4 font-heading">Discover & Map</h3>
              <p className="text-gray-600">
                We meet with your team to identify your highest-cost manual processes. You&apos;ll receive a detailed ROI projection pinpointing exactly where to start for maximum immediate impact. No guesswork, just data-driven priorities.
              </p>
            </div>
            
            <div>
              <h5 className="text-2xl mb-4 text-gray-400 font-heading">02</h5>
              <h3 className="text-2xl mb-4 font-heading">Build & Deploy</h3>
              <p className="text-gray-600">
                Our ex-Meta/Google engineers build custom agents that integrate directly into your existing tech stack. Zero platform migration. Zero workflow disruption. Your team keeps working while we build the AI layer underneath, then deploy seamlessly.
              </p>
            </div>
            
            <div>
              <h5 className="text-2xl mb-4 text-gray-400 font-heading">03</h5>
              <h3 className="text-2xl mb-4 font-heading">Launch & Scale</h3>
              <p className="text-gray-600">
                Launch with real-time performance monitoring, a dedicated success manager, and an executive KPI dashboard. Watch cost savings, time recovered, and accuracy improvements live. Then replicate successful automations across your entire organization.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <CalendlyButton className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
              Talk to us
            </CalendlyButton>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Security & Trust Section
      <FadeIn delay={1900}>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">Security & Trust</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-heading">
              Enterprise-grade,<br />audit-ready.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We build our platform on a foundation of state-of-the-art security and privacy protocols, because we know your business data is your most valuable asset.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Your Data is Your Data.</h3>
              <p className="text-gray-600">
                We never use your data to train models. You retain full ownership, period. We sign MSAs and NDAs.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Secure Infrastructure</h3>
              <p className="text-gray-600">
                End‑to‑end encryption in transit and at rest meets or exceeds federal standards.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Compliance Alignment</h3>
              <p className="text-gray-600">
                SOC 2 Type II, ISO 27001, GDPR, CCPA, FERPA, HIPAA‑adjacent data flows. You name it we have it.
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeIn> */}

      {/* FAQ Section */}
      <FadeIn delay={1600}>
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? Our FAQ section has you covered with quick answers to the most common inquiries. For any further questions, email us at <span className="underline">team@cartra.ai</span> or just book a call.
            </p>
          </div>
          
          <FAQ />
        </div>
      </section>
      </FadeIn>

      {/* Final CTA Section */}
      <FadeIn delay={1800}>
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 p-12 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">
              Get Started
            </p>
            <h3 className="text-3xl md:text-4xl mb-4 font-heading">
              Let&apos;s get to know each other.
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Book a 30-minute no-strings-attached strategy call where we&apos;ll get acquainted, discuss your company&apos;s situation, and you&apos;ll walk away with actionable advice and insights. This is completely free - no sales pitch, just genuine guidance you can use immediately.
            </p>
            {/* <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white"></div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 italic mb-8">
              &quot;We replaced a SaaS that we paid $100,000 a year for with Cartra, and it does twice the job for cheaper.&quot; (CEO, 9-figure Online Retailer)
            </p> */}
            <CalendlyButton className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
              Book a Free Consultation
            </CalendlyButton>
          </div>
          <p className="mt-6 text-sm text-gray-500">Limited Availability - Accepting 2 More Clients in Q4 2025</p>
        </div>
      </section>
      </FadeIn>

      {/* Footer */}
      <FadeIn delay={2000}>
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-heading mb-2">Cartra AI</p>
              <div className="text-sm text-gray-600">
                <p>2261 Market Street STE 85777</p>
                <p>San Francisco, CA 94114</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              {/* <Link href="/hiring" className="hover:text-gray-900 transition-colors">Join Us</Link> */}
              <ContactLink className="hover:text-gray-900 transition-colors" />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Cartra. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </FadeIn>
    </div>
  );
}
