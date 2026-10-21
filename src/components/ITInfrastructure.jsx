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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Infrastructure & Operations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
            IT Operations & <span className="text-gradient-emerald">Technical Support</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Hands-on IT operations experience developed at BizMappers Ltd. and backed by Cisco Networking Academy certification.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {IT_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 sm:p-7 rounded-2xl border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
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
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50/90 via-slate-50/50 to-emerald-50/20 dark:from-slate-900/90 dark:via-slate-900/50 dark:to-emerald-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
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
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Hire for Web & IT Needs
          </a>
        </div>

      </div>
    </section>
  );
}
