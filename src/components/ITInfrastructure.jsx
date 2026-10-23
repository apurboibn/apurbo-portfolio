import React from 'react';
import { 
  Wrench, 
  Network, 
  MonitorCheck, 
  Cpu, 
  ShieldAlert, 
  Sparkles,
  Zap
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { Reveal } from './motion/Reveal';

const IT_CAPABILITIES = [
  {
    icon: MonitorCheck,
    title: 'Hardware & System Troubleshooting',
    description: 'Diagnosis and resolution of PC/laptop hardware faults, hanging issues, performance bottlenecks, thermal throttling, and component upgrades.',
    badge: 'Desktop & Laptop Support',
    color: 'emerald'
  },
  {
    icon: Network,
    title: 'Office Network Management',
    description: 'LAN setup, router/switch configuration, subnetting, Wi-Fi optimization, IP conflict resolution, and enterprise office network troubleshooting.',
    badge: 'Cisco IT Essentials Certified',
    color: 'cyan'
  },
  {
    icon: Cpu,
    title: 'OS & BIOS Configuration',
    description: 'Fresh Windows deployment, dual-boot setups, BIOS/UEFI flashing and firmware configuration, driver synchronization, and secure boot management.',
    badge: 'OS Deployment',
    color: 'indigo'
  },
  {
    icon: ShieldAlert,
    title: 'Creative Software Crash Resolution',
    description: 'Specialized diagnosis of Adobe Photoshop crash issues, GPU acceleration conflicts, scratch disk overflows, and plugin stability troubleshooting.',
    badge: 'Application Stabilization',
    color: 'amber'
  }
];

export default function ITInfrastructure() {
  return (
    <section id="it-infrastructure" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="hidden md:block absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          tone="cyan"
          icon={Wrench}
          eyebrow="Infrastructure & Operations"
          title={<>IT Operations & <span className="text-gradient-emerald">Technical Support</span></>}
          description="Hands-on IT operations experience developed at BizMappers Ltd. and backed by Cisco Networking Academy certification."
        />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {IT_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <Reveal
                key={idx}
                delay={(idx % 2) * 0.1}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative overflow-hidden glass-panel p-5 sm:p-7 rounded-2xl border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors duration-300 group"
              >
                {/* Scan line that sweeps across on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"
                />
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {cap.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-300">
                        {cap.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <Reveal y={30} className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50/90 via-slate-50/50 to-emerald-50/20 dark:from-slate-900/90 dark:via-slate-900/50 dark:to-emerald-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase">
              <Zap className="w-4 h-4" />
              The Full-Spectrum Advantage
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              Why IT Operations Matters in Modern Web Engineering
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Having combined software development with direct IT operations, Apurba understands DNS records, hosting servers, SSL certifications, network latency, and OS environments from the bare metal up.
            </p>
          </div>

          <a
            href="#contact"
            className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Hire for Web & IT Needs
            <Zap className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
          </a>
        </Reveal>

      </div>
    </section>
  );
}
