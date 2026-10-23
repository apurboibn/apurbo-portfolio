import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Reveal, Stagger, StaggerItem } from './motion/Reveal';

// Confetti is only needed after a click, so load it on demand instead of in the main bundle
const fireConfetti = (options) => {
  import('canvas-confetti')
    .then(({ default: confetti }) => confetti({ disableForReducedMotion: true, ...options }))
    .catch(() => {});
};

export default function ContactSection({ portfolio }) {
  const contact = portfolio?.contact || {};
  const email = contact.email || 'apurbo01hridoy@gmail.com';
  const phone = contact.phone || '+8801925397719';
  const location = contact.location || 'Dhaka, Bangladesh';

  const [copiedField, setCopiedField] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return; // clipboard blocked (old browser / insecure context) — the link itself still works
    }
    setCopiedField(field);
    fireConfetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.85 },
      colors: ['#10B981', '#06B6D4', '#6366F1']
    });
    setTimeout(() => setCopiedField(null), 2500);
  };

  // There is no backend, so the form hands the message to the visitor's email app
  // (it used to only pretend to send, and messages were silently lost).
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    const subject = formState.subject.trim() || `Portfolio enquiry from ${formState.name}`;
    const body = `${formState.message}\n\n— ${formState.name}\n${formState.email}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsSubmitted(true);
    fireConfetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#06B6D4', '#6366F1']
    });
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 8000);
  };

  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <section id="contact" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Glow (desktop only) */}
      <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          icon={Sparkles}
          eyebrow="Let's Collaborate"
          title={<>Get in <span className="text-gradient-emerald">Touch</span></>}
          description="Have a project in mind, need WordPress/e-commerce development, or want to discuss AI research? Let's talk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <Stagger className="lg:col-span-5 space-y-4 sm:space-y-5" stagger={0.1}>
            
            {/* Direct Email Card */}
            <StaggerItem className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-200 dark:border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Direct Email</h3>
                    <a href={`mailto:${email}`} className="block break-all text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(email, 'email')}
                  aria-label="Copy email"
                  className="shrink-0 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </StaggerItem>

            {/* Direct Phone & WhatsApp Card */}
            <StaggerItem className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-200 dark:border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Phone & WhatsApp</h3>
                    <a href={`tel:${cleanPhone}`} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(phone, 'phone')}
                    aria-label="Copy phone number"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                    title="Copy phone"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-cyan-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="pt-2 flex gap-2">
                <a
                  href={`https://wa.me/${cleanPhone.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </StaggerItem>

            {/* Location Card */}
            <StaggerItem className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="shrink-0 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Location & Base</h3>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{location}</p>
                </div>
              </div>
            </StaggerItem>

            {/* Quick Availability Badge */}
            <StaggerItem className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Availability Status
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Open to permanent software developer roles, WordPress/WooCommerce projects, and high-conversion client landing page commissions.
              </p>
            </StaggerItem>

          </Stagger>

          {/* Right Column: Interactive Message Form */}
          <Reveal className="lg:col-span-7" delay={0.15}>
            <div className="glass-panel p-5 sm:p-8 rounded-3xl border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Send a Direct Message
              </h3>

              <AnimatePresence mode="wait" initial={false}>
              {isSubmitted ? (
                <m.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3"
                >
                  <m.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                    className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </m.div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Your email app is opening…</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Your message is ready in a new email — just press Send there. If nothing opened, write to{' '}
                    <a href={`mailto:${email}`} className="font-semibold text-emerald-600 dark:text-emerald-400 underline break-all">{email}</a>.
                  </p>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-slate-500 dark:text-slate-400">Your Name *</label>
                      <input
                        type="text"
                        required
                        id="contact-name"
                        value={formState.name}
                        autoComplete="name"
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-slate-500 dark:text-slate-400">Your Email *</label>
                      <input
                        type="email"
                        required
                        id="contact-email"
                        value={formState.email}
                        autoComplete="email"
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-mono text-slate-500 dark:text-slate-400">Subject / Project Type</label>
                    <input
                      type="text"
                      id="contact-subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="WordPress Site, Sales Funnel, AI Research, etc."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono text-slate-500 dark:text-slate-400">Your Message *</label>
                    <textarea
                      rows={5}
                      required
                      id="contact-message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Apurba, I'd like to discuss a project..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span>Send Message</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    Opens your email app with this message ready to send.
                  </p>
                </m.form>
              )}
              </AnimatePresence>

            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
