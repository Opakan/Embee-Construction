/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Instagram, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle, 
  Users, 
  Award, 
  Ruler, 
  Clock, 
  Menu, 
  X, 
  FileCheck, 
  BookOpen, 
  ChevronRight,
  Send,
  Zap
} from 'lucide-react';

import CinematicBackground from './components/CinematicBackground';
import ServiceAnimatedIcon from './components/ServiceAnimatedIcon';
import ProjectShowcase from './components/ProjectShowcase';
import CinematicMap from './components/CinematicMap';
import { PROJECTS, SERVICES, COMPANY_STATS, CLIENT_TESTIMONIALS, ASSETS } from './data';
import { ConsultationRequest } from './types';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Audio state simulation
  const [rainAudioActive, setRainAudioActive] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [rainNoiseNode, setRainNoiseNode] = useState<AudioNode | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'Architectural Design',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<ConsultationRequest | null>(null);
  const [pastConsultations, setPastConsultations] = useState<ConsultationRequest[]>([]);

  // Track active scroll to update header blur and active section highlights
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active nav spy
      const sections = ['home', 'services', 'projects', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Load local booking history
    try {
      const stored = localStorage.getItem('embee_bookings');
      if (stored) {
        setPastConsultations(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft synth audio rain generator to give true immersive cinema experience!
  const toggleRainAudio = () => {
    if (rainAudioActive) {
      if (rainNoiseNode) {
        try {
          (rainNoiseNode as any).stop();
        } catch (_) {}
        setRainNoiseNode(null);
      }
      setRainAudioActive(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);

        // Generate synthetic white/pinkish noise simulating beautiful falling rain
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Apply a gentle pink pass low filter mathematically inside client loop
          output[i] = (lastOut * 0.94 + white * 0.06);
          lastOut = output[i];
          output[i] *= 0.12; // lower volume for ambient background comfort
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Custom bandpass filter to shape the soft rain hiss frequencies
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.35, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        setRainNoiseNode(whiteNoise);
        setRainAudioActive(true);
      } catch (e) {
        console.warn('Audio environment issue (user click-gesture required first):', e);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    // Simulate luxury computing process
    setTimeout(() => {
      const newRequest: ConsultationRequest = {
        id: 'EMB-' + Math.floor(1000 + Math.random() * 9000),
        name: formData.name,
        phone: formData.phone,
        projectType: formData.projectType,
        message: formData.message,
        createdAt: new Date().toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newRequest, ...pastConsultations];
      setPastConsultations(updated);
      try {
        localStorage.setItem('embee_bookings', JSON.stringify(updated));
      } catch (err) {}

      setBookingSuccess(newRequest);
      setIsSubmitting(false);

      // Reset fields
      setFormData({
        name: '',
        phone: '',
        projectType: 'Architectural Design',
        message: ''
      });
    }, 1500);
  };

  const handleCancelBooking = (id: string) => {
    const filtered = pastConsultations.filter(c => c.id !== id);
    setPastConsultations(filtered);
    try {
      localStorage.setItem('embee_bookings', JSON.stringify(filtered));
    } catch (_) {}
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-luxury-gold selection:text-black antialiased overflow-hidden font-sans">
      
      {/* Cinematic Ambient Effects Backdrop */}
      <CinematicBackground rainEnabled={true} intensity={1} />

      {/* Floating Audio Ambient Widget (Top Left) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <button
          onClick={toggleRainAudio}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all text-xs font-mono tracking-wider ${
            rainAudioActive
              ? 'bg-luxury-gold/20 border-luxury-gold text-luxury-gold shadow-[0_0_15px_rgba(217,160,91,0.2)]'
              : 'bg-black/80 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
          }`}
          title="Toggle soft rainfall ambient audio track for absolute cinematic atmosphere"
        >
          <span className="relative flex h-2 w-2">
            {rainAudioActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${rainAudioActive ? 'bg-luxury-gold' : 'bg-gray-600'}`}></span>
          </span>
          <span>AMBIENT SOUND: {rainAudioActive ? 'PLAYING (SOFT RAIN)' : 'MUTED'}</span>
        </button>
      </div>

      {/* FIXED PREMIUM NAVIGATION HEADER */}
      <header
        id="luxury-header"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'py-3.5 bg-black/80 border-b border-luxury-gold/10 backdrop-blur-md shadow-2xl' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Elite Branding Typography */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2.5 bg-gradient-to-br from-luxury-gold to-luxury-bronze text-black rounded-xl font-bold font-display shadow-[0_0_20px_rgba(217,160,91,0.15)] flex items-center justify-center transition-transform group-hover:scale-105">
              <Building2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-lg font-light tracking-[0.25em] font-display group-hover:text-luxury-gold transition-colors uppercase">
                Embee
              </span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-luxury-gold/90 uppercase font-sans mt-0.5">
                Consult &amp; Construction
              </span>
            </div>
          </div>

          {/* Desktop Links Widget */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase">
            {['home', 'services', 'projects', 'about', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollToSection(sect)}
                className={`relative py-1.5 transition-colors duration-300 hover:text-luxury-gold ${
                  activeNav === sect ? 'text-luxury-gold font-bold' : 'text-gray-400'
                }`}
              >
                <span>{sect}</span>
                {activeNav === sect && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-luxury-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Luxury CTA Trigger */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://instagram.com/embee_construction"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="p-2 bg-black/60 border border-white/5 text-gray-400 hover:text-luxury-gold rounded-lg hover:border-luxury-gold/20 transition-all"
              title="Connect on Instagram @embee_construction"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-luxury-gold hover:bg-luxury-bronze text-black font-semibold text-xs rounded-lg transition-all tracking-wider font-mono shadow-[0_4px_15px_rgba(217,160,91,0.15)] uppercase"
            >
              CONSULTATION
            </button>
          </div>

          {/* Responsive Mobile Trigger button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="https://instagram.com/embee_construction"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="p-2 bg-black/60 border border-white/10 text-gray-300 rounded-lg"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-black/60 border border-white/10 text-gray-300 rounded-lg hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE HEADER MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-black/95 border-b border-luxury-gold/10 backdrop-blur-xl py-6 px-6 md:hidden max-h-screen overflow-y-auto"
            id="mobile-navigation-drawer"
          >
            <div className="flex flex-col gap-4">
              {['home', 'services', 'projects', 'about', 'contact'].map((sect) => (
                <button
                  key={sect}
                  onClick={() => scrollToSection(sect)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl font-mono text-xs tracking-widest uppercase transition-all ${
                    activeNav === sect 
                      ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/15' 
                      : 'text-gray-400 border border-transparent'
                  }`}
                >
                  <span>{sect}</span>
                  <ChevronRight className="w-4 h-4 text-luxury-gold" />
                </button>
              ))}
              <div className="h-[1px] bg-white/5 my-2" />
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3.5 bg-luxury-gold text-black font-bold text-xs rounded-xl text-center tracking-widest uppercase"
              >
                REQUEST CONSULTATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO CONTAINER */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      >
        {/* Massive Luxury Architectural Background render */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroArchitecture}
            alt="Embee Architectural Masterpiece"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-102 transform filter brightness-45 contrast-105 duration-1000 scale-[1.01]"
          />
          {/* Dynamic Ambient Spotlight Tracker */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Foreground Content Panel */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center mt-12">
          
          {/* Subtle Golden Subheader Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/60 backdrop-blur-md rounded-full border border-luxury-gold/20 text-luxury-gold mb-8 font-mono text-xs uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Premium Architectural &amp; Structural Solutions</span>
          </motion.div>

          {/* Majestic Hero Headline in Georgia Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-white leading-[1.1] mb-8 font-serif select-none"
          >
            Designing <span className="italic block sm:inline font-extralight text-shadow-glow">Structures</span> <br className="hidden sm:block" /> That Define <br /> <span className="text-luxury-gold font-normal">Excellence.</span>
          </motion.h1>

          {/* Secondary reassurance text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35 }}
            className="max-w-2xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg mt-8 leading-relaxed font-light font-sans tracking-wide"
          >
            Embee Consult and Construction Nig. Ltd is Ibadan&apos;s leading partner for premium steel frameworks, conceptual modeling, pre-stressed structures, and high-end turn-key constructions.
          </motion.p>

          {/* Landing CTA Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group w-full sm:w-auto px-8 py-4 bg-luxury-gold hover:bg-luxury-bronze text-black font-semibold text-sm rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(217,160,91,0.25)] hover:shadow-[0_4px_30px_rgba(217,160,91,0.4)] flex items-center justify-center gap-3 tracking-widest font-mono uppercase"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-black/80 hover:bg-black text-white font-medium text-sm rounded-xl border border-white/10 hover:border-luxury-gold/30 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm tracking-widest font-mono uppercase"
            >
              <span>Request Consultation</span>
            </button>
          </motion.div>

        </div>

        {/* Slow vertical chevron animation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-500 animate-bounce cursor-pointer whitespace-nowrap" onClick={() => scrollToSection('services')}>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-luxury-gold/60 mb-1.5 text-center">SCROLL TO DISCOVER</p>
          <div className="h-5 w-[1.5px] bg-luxury-gold/30 mx-auto" />
        </div>
      </section>

      {/* SECTION 2: SERVICES SECTION */}
      <section 
        id="services" 
        className="relative py-28 bg-[#050505] border-y border-white/5"
      >
        <div className="absolute inset-0 bg-[#020202]/45 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading Panel */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-luxury-gold font-mono text-xs tracking-[0.25em] uppercase bg-luxury-gold/5 p-1.5 px-3 border border-luxury-gold/10 rounded">
                01 / Master Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif mt-4">
                Cinematic <span className="italic text-luxury-gold">3D Services</span>
              </h2>
            </div>
            <p className="max-w-md text-gray-400 text-sm leading-relaxed font-light">
              We coordinate robust architectural and structural works leveraging top-tier CAD diagnostics, ensuring optimal materials and aesthetics.
            </p>
          </div>

          {/* Interactive Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {SERVICES.map((srv, idx) => (
              <motion.div
                key={srv.id}
                id={`service-card-${srv.id}`}
                className="group relative bg-[#0e0e0f] hover:bg-black rounded-2xl p-6 border border-white/5 hover:border-luxury-gold/25 transition-all duration-500 luxury-shadow flex flex-col justify-between min-h-[440px] overflow-hidden cursor-default"
                onMouseEnter={() => setHoveredService(srv.id)}
                onMouseLeave={() => setHoveredService(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Micro-light-strip overlay on card top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Background active image texture subtle glow overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,160,91,0.03)_0%,transparent_60%)] pointer-events-none" />

                {/* Animated Interactive Vector Icon Header */}
                <div className="w-full flex justify-center mb-6">
                  <ServiceAnimatedIcon 
                    type={srv.visualID} 
                    isHovered={hoveredService === srv.id} 
                  />
                </div>

                {/* Service Metadata / Descriptions */}
                <div className="flex-grow flex flex-col justify-end">
                  <div className="text-[10px] font-mono text-luxury-gold/60 mb-2">CATALOG INDEX: EMB_0{idx+1}</div>
                  
                  <h4 className="text-xl font-medium tracking-tight text-white group-hover:text-luxury-gold transition-colors duration-300 font-sans">
                    {srv.title}
                  </h4>
                  
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed mb-4 font-light">
                    {srv.description}
                  </p>

                  {/* Bullet Spec Highlights */}
                  <div className="space-y-1.5 pt-4 border-t border-white/5">
                    {srv.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-gray-300 font-light">
                        <CheckCircle className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: PROJECTS SHOWCASE */}
      <section 
        id="projects" 
        className="relative py-28 bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-luxury-gold font-mono text-xs tracking-[0.25em] uppercase bg-luxury-gold/5 p-1.5 px-3 border border-luxury-gold/10 rounded">
                02 / Architectural Render Showcase
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif mt-4">
                Cinematic <span className="italic text-luxury-gold">Milestones</span>
              </h2>
            </div>
            <p className="max-w-md text-gray-400 text-sm leading-relaxed font-light">
              Explore dynamic virtual renderings of high-end builds constructed natively on-site in Ibadan, Oyo State. Hover to activate detailed structural layouts.
            </p>
          </div>

          {/* Core Projects Grid Showcase Component */}
          <ProjectShowcase projects={PROJECTS} />

        </div>
      </section>

      {/* SECTION 4: ABOUT DESIGN PHILOSOPHY */}
      <section 
        id="about" 
        className="relative py-28 bg-[#050505] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Elegant Studio Image Frame Panel */}
            <div className="relative rounded-3xl overflow-hidden border border-luxury-gold/10 h-[500px]" id="about-image-frame">
              {/* Draft Blueprint Visual background */}
              <img
                src={ASSETS.blueprintDraft}
                alt="Embee Design Studio Collaborating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-95 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              
              {/* Overlay Stat Card Widget */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase text-luxury-gold tracking-widest">
                  DESIGN OFFICE: IBADAN, OYO STATE
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Our engineering studio specializes in the synthesis of structural works and architectural layouts, driving safe and precise project execution.
                </p>
                <div className="flex gap-4 border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                    <span className="text-[10px] text-white font-mono uppercase font-light">COREN Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-luxury-gold" />
                    <span className="text-[10px] text-white font-mono uppercase font-light">Premium Grade Materials</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Narrative Panel */}
            <div className="space-y-8">
              <div>
                <span className="text-luxury-gold font-mono text-xs tracking-[0.25em] uppercase bg-luxury-gold/5 p-1.5 px-3 border border-luxury-gold/10 rounded">
                  03 / Studio Credentials
                </span>
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif mt-4">
                  Engineering <span className="italic text-luxury-gold">Sophistication</span>
                </h2>
              </div>

              <div className="space-y-4 text-gray-300 text-sm leading-relaxed font-sans font-light">
                <p>
                  At <strong className="text-luxury-gold font-medium">Embee Consult and Construction Nig. Ltd</strong>, we refuse default generic designs. We treat structural materials, steel girders, and reinforced concrete as visual elements of a larger, cinematic luxury narrative.
                </p>
                <p>
                  Our system combines rigorous engineering metrics with premium aesthetics. Whether executing architectural designs or deploying large-scale structural foundation works, our reputation is built on reliability, creativity, structural excellence, and precision execution.
                </p>
              </div>

              {/* Glowing Stats Dashboard Showcase */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5 bg-[#0e0e0f]/60 p-6 rounded-2xl">
                {COMPANY_STATS.map((stat, i) => (
                  <div key={i} className="text-center md:text-left flex flex-col justify-center">
                    <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-bronze tracking-tight font-display">
                      {stat.value}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 mt-1 block h-fit font-light">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Luxury Testimonials segment */}
          <div className="mt-20 pt-16 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLIENT_TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-[#0e0e0f]/50 p-6 rounded-2xl border border-white/5 relative">
                <p className="text-gray-400 text-xs italic leading-relaxed font-sans font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h5 className="text-white text-xs font-semibold font-sans">{t.author}</h5>
                    <p className="text-[10px] text-gray-500 mt-0.5">{t.role}</p>
                  </div>
                  <span className="text-[9px] font-mono uppercase text-luxury-gold bg-luxury-gold/10 px-2 py-1 rounded">
                    {t.project}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: LOCATION SECTION */}
      <section 
        id="location" 
        className="relative py-28 bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Context Panel Left */}
            <div className="space-y-6 lg:col-span-1">
              <div>
                <span className="text-luxury-gold font-mono text-xs tracking-[0.25em] uppercase bg-luxury-gold/5 p-1.5 px-3 border border-luxury-gold/10 rounded">
                  04 / GEOLOCATION DATA
                </span>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif mt-4">
                  Office <span className="italic text-luxury-gold">Coordinates</span>
                </h2>
              </div>
              
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                Connect directly with our planning and land surveyor team. We welcome high-end residential and commercial site visitation appointments directly.
              </p>

              {/* Written Address details */}
              <div className="space-y-4 pt-4 border-t border-white/5 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-luxury-gold mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Main Office Address:</h5>
                    <p className="text-gray-400 mt-1 leading-relaxed font-light">
                      13 Ganiyu Bello Street,<br />
                      Felele Challenge, Ibadan,<br />
                      Oyo State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-luxury-gold mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Working Hours:</h5>
                    <p className="text-gray-400 mt-1 font-light">Monday &ndash; Friday [08:00 AM &ndash; 05:00 PM]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Interactive Map Component */}
            <div className="lg:col-span-2">
              <CinematicMap />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: CONTACT & BOOKING FORM */}
      <section 
        id="contact" 
        className="relative py-28 bg-[#0a0a0b] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Interactive consultation booking frame */}
            <div className="bg-[#0e0e0f] rounded-3xl p-8 border border-amber-500/10 shadow-2xl relative" id="consultation-form-card">
              
              {/* Form heading */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold rounded-lg">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Consultation Dispatcher</h4>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Submit Structural &amp; Site Briefing</p>
                </div>
              </div>

              {/* Actual working submission form */}
              <form onSubmit={handleSubmitConsultation} className="space-y-5">
                <div>
                  <label htmlFor="name-input" className="block text-[10px] font-mono uppercase text-gray-300 tracking-wider mb-2">Project Owner / Lead Name</label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Chief Olumide Alao"
                    className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold/60 placeholder:text-gray-600 transition-all font-sans font-light"
                  />
                </div>

                <div>
                  <label htmlFor="phone-input" className="block text-[10px] font-mono uppercase text-gray-300 tracking-wider mb-2">Contact Telephone Number</label>
                  <input
                    id="phone-input"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234 (80) Embee construction"
                    className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold/60 placeholder:text-gray-600 transition-all font-sans font-light"
                  />
                </div>

                <div>
                  <label htmlFor="type-select" className="block text-[10px] font-mono uppercase text-gray-300 tracking-wider mb-2">Architectural Requirement Standard</label>
                  <select
                    id="type-select"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-luxury-gold focus:outline-none focus:border-luxury-gold/60 transition-all font-mono"
                  >
                    <option className="bg-neutral-900 text-white">Architectural Design &amp; Layout</option>
                    <option className="bg-neutral-900 text-white">Structural Frameworks &amp; Beams</option>
                    <option className="bg-neutral-900 text-white">Full Commercial Construction</option>
                    <option className="bg-neutral-900 text-white">Site Survey Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="msg-textarea" className="block text-[10px] font-mono uppercase text-gray-300 tracking-wider mb-2">Project Objectives &amp; Site Scale Coordinates</label>
                  <textarea
                    id="msg-textarea"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about terrain, location within Ibadan, or specific structural steel requests..."
                    className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold/60 placeholder:text-gray-600 transition-all font-sans resize-none font-light"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-luxury-gold hover:bg-luxury-bronze text-black font-semibold text-xs rounded-xl transition-all uppercase tracking-wider font-mono flex items-center justify-center gap-2.5 shadow-lg disabled:opacity-60 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                        <span>Compiling structural bill...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>SUBMIT PROPOSAL REQ</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Consultation Booking Receipt Visual popup on success */}
              <AnimatePresence>
                {bookingSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-[#0c0c0d] rounded-3xl p-8 flex flex-col justify-between items-center text-center border border-luxury-gold/20 z-25"
                    id="booking-receipt-popup"
                  >
                    <div className="w-full flex justify-end">
                      <button 
                        onClick={() => setBookingSuccess(null)}
                        className="p-1 px-3.5 bg-black text-xs font-mono border border-white/5 hover:text-white rounded-lg text-gray-500 transition-all"
                      >
                        CLOSE TICKET
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold border border-luxury-gold/20 mb-2">
                        <FileCheck className="w-6 h-6 animate-pulse" />
                      </div>
                      <h4 className="text-xl font-bold text-white tracking-tight">Docket Scheduled Successfully</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto font-light">
                        A certified site planner at Embee Construction Nig. Ltd has been dispatched to analyze your specifications. Contact us on WhatsApp for rapid file ingestion.
                      </p>
                    </div>

                    {/* Verification docket details card design */}
                    <div className="w-full bg-black/70 p-4 rounded-2xl border border-white/5 text-left font-mono space-y-2 text-[11px] text-gray-300">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500">TICKET_REF:</span>
                        <span className="text-luxury-gold font-bold">{bookingSuccess.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CONSULTANT:</span>
                        <span className="text-white">Embee Surveyor Core</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">OBJECTIVE:</span>
                        <span className="text-white truncate max-w-[180px]">{bookingSuccess.projectType}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-500 mt-2">
                        <span>STAMPED TIME:</span>
                        <span>{bookingSuccess.createdAt}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/2348033621532?text=Hello%20Embee%20Construction!%20I%20just%20scheduled%20a%20consultation%20with%20reference%20${bookingSuccess.id}.%20My%20name%20is%20${bookingSuccess.name}.%20Can%20we%20proceed?`}
                      target="_blank"
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs rounded-xl text-center tracking-wider flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-black" />
                      Dispatch File via WhatsApp Now
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Support Actions segment Right */}
            <div className="space-y-8">
              <div>
                <span className="text-luxury-gold font-mono text-xs tracking-[0.25em] uppercase bg-luxury-gold/5 p-1.5 px-3 border border-luxury-gold/10 rounded">
                  05 / Instant Deployment
                </span>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif mt-4 uppercase">
                  Accelerated <span className="italic text-luxury-gold">Platforms</span>
                </h2>
                <p className="text-gray-400 text-xs mt-3 leading-relaxed font-light">
                  Communicate directly with executive consultants via direct dialing channels or instant messaging endpoints for immediate structural planning integration.
                </p>
              </div>

              {/* Grid of contact links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Dial Trigger */}
                <a
                  href="tel:+2348033621532"
                  className="flex items-center gap-4 p-5 bg-black/45 hover:bg-black/95 rounded-2xl border border-white/5 hover:border-luxury-gold/25 transition-all group"
                >
                  <div className="p-3 bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold rounded-xl group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block">DIRECT OFFICE DIAL</span>
                    <span className="text-sm font-semibold text-white group-hover:text-luxury-gold transition-colors">+234 (80) 3362 1532</span>
                  </div>
                </a>

                {/* WhatsApp Trigger */}
                <a
                  href="https://wa.me/2348033621532?text=Hello%20Embee%20Consult%20and%20Construction%20Nig%20Ltd!%20I%20am%20interested%20in%20requesting%20a%20premium%20architectural%20and%20structural%20design%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 p-5 bg-black/45 hover:bg-[#128C7E]/10 rounded-2xl border border-white/5 hover:border-[#25D366]/30 transition-all group"
                >
                  <div className="p-3 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-xl group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block">INSTANT WHATSAPP WIRE</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">Start Instant Chat</span>
                  </div>
                </a>

                {/* Instagram Showcase Link */}
                <a
                  href="https://instagram.com/embee_construction"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 p-5 bg-black/45 hover:bg-[#E1306C]/10 rounded-2xl border border-white/5 hover:border-[#E1306C]/30 transition-all group"
                >
                  <div className="p-3 bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] rounded-xl group-hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block">INSTAGRAM CHANNEL</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#E1306C] transition-colors">@embee_construction</span>
                  </div>
                </a>

                {/* Topography verification index */}
                <div className="p-5 bg-neutral-900 rounded-2xl border border-white/5 text-[11px] font-mono text-gray-500 leading-relaxed font-light">
                  <span className="text-luxury-gold/80 font-semibold block mb-1">COMPLIANCE REVIEW</span>
                  All blueprint submissions undergo COREN and Ibadan local municipality pre-checks.
                </div>

              </div>

              {/* Display booked ticket index if any scheduled */}
              {pastConsultations.length > 0 && (
                <div className="pt-6 border-t border-white/5">
                  <h5 className="text-[11px] font-mono uppercase text-gray-400 tracking-wider mb-4 flex items-center justify-between">
                    <span>Active Dispatched Tickets ({pastConsultations.length})</span>
                    <span className="text-[9px] text-luxury-gold bg-luxury-gold/5 px-2 py-0.5 border border-luxury-gold/10 rounded">CLIENT_SESSION_PERSISTED</span>
                  </h5>
                  <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2">
                    {pastConsultations.map((c) => (
                      <div key={c.id} className="p-4 bg-black/50 border border-white/5 rounded-xl flex items-center justify-between gap-4 text-xs font-mono">
                        <div>
                          <span className="text-luxury-gold font-bold">{c.id}</span>
                          <span className="text-gray-400 text-[10px] ml-3">&ldquo;{c.projectType}&rdquo;</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 text-[10px]">{c.createdAt}</span>
                          <button
                            onClick={() => handleCancelBooking(c.id)}
                            className="text-red-500/70 hover:text-red-400 p-1 rounded hover:bg-neutral-800 transition-all"
                            title="Cancel Scheduled Consultation"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER AREA */}
      <footer className="bg-black text-[#888] pt-16 pb-8 border-t border-white/5 relative z-10" id="dark-cinematic-footer">
        
        {/* Subtle bottom golden light splash */}
        <div className="absolute bottom-0 inset-x-0 h-[100px] bg-gradient-to-t from-luxury-gold/3 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5 text-sm font-light">
            
            {/* Branding column */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-luxury-gold text-black rounded-lg font-bold font-display flex items-center justify-center">
                  <Building2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h4 className="text-white font-semibold tracking-[0.15em] font-display uppercase text-sm">
                  EMBEE CONSULT &amp; CONSTRUCTION
                </h4>
              </div>
              <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                Premium turning-key construct, conceptual CAD models, pre-stressed spatial structures, and large-scale structural foundation works executed in Ibadan, Oyo State.
              </p>
              
              <div className="pt-2 font-mono text-[10px] text-gray-600 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>REGISTERED COREN CORPORATE MEMBER</span>
              </div>
            </div>

            {/* Nav Index column */}
            <div>
              <h5 className="font-mono text-[11px] uppercase tracking-wider text-white mb-4">Navigations</h5>
              <ul className="space-y-2.5 text-xs text-gray-500 font-sans font-light">
                {['home', 'services', 'projects', 'about', 'contact'].map((sect) => (
                  <li key={sect}>
                    <button 
                      onClick={() => scrollToSection(sect)}
                      className="hover:text-luxury-gold transition-colors capitalize text-left"
                    >
                      {sect}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordinates column */}
            <div>
              <h5 className="font-mono text-[11px] uppercase tracking-wider text-white mb-4">Location Index</h5>
              <div className="text-xs text-gray-500 space-y-3 font-sans leading-relaxed font-light">
                <p>
                  13 Ganiyu Bello Street,<br />
                  Felele Challenge, Ibadan,<br />
                  Oyo State, Nigeria.
                </p>
                <div className="font-mono text-[10px] text-luxury-gold/70 border border-luxury-gold/10 bg-luxury-gold/5 p-2 rounded">
                  LAT: 7.3347° N<br />
                  LNG: 3.8815° E
                </div>
              </div>
            </div>

          </div>

          {/* Copyright/Meta Details */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-600 gap-4">
            <p>
              &copy; {new Date().getFullYear()} Embee Consult and Construction Nig. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="hover:text-luxury-gold cursor-default">Precision Architecture</span>
              <span className="hover:text-luxury-gold cursor-default">Structural Durability</span>
              <a href="https://instagram.com/embee_construction" target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="hover:text-luxury-gold flex items-center gap-1 font-sans">
                <Instagram className="w-3.5 h-3.5" />
                @embee_construction
              </a>
            </div>
          </div>

        </div>

      </footer>

    </div>
  );
}
