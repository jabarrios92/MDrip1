/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  Home, 
  Zap, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Quote,
  Menu, 
  X,
  Instagram,
  Phone,
  Star,
  Send,
  CheckCircle2,
  DollarSign,
  CreditCard,
  Smartphone,
  Globe
} from 'lucide-react';

const WhatsappIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group cursor-pointer">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative h-14 w-14 flex items-center justify-center"
          >
            <img 
              src="/logo.webp" 
              alt="MDRIP Logo" 
              className="h-full w-full object-contain mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              onError={(e) => {
                e.currentTarget.src = 'https://picsum.photos/seed/medical/100/100';
              }}
            />
          </motion.div>
          <span className="text-2xl font-bold tracking-tighter text-gradient hidden sm:block group-hover:brightness-125 transition-all">MDRIP</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Services', 'How it Works', 'About Us', 'FAQs', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-white/70 hover:text-[#00ffff] transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://wa.me/573218210894"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-semibold rounded-full transition-all duration-300 shadow-lg shadow-teal-500/20"
          >
            Book Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white/90 backdrop-blur-2xl absolute top-20 left-0 w-full p-6 flex flex-col gap-4 border-b border-white/20 shadow-2xl"
          >
            {['Home', 'Services', 'How it Works', 'About Us', 'FAQs', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-lg font-medium text-black/80 hover:text-[#008080] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a 
              href="https://wa.me/573218210894"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#008080] text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-center"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 15, restDelta: 0.001 });
  
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const logoScale = useTransform(smoothProgress, [0, 0.3], [1, 0.6]);
  const logoRotate = useTransform(smoothProgress, [0, 0.3], [0, -15]);
  const logoY = useTransform(smoothProgress, [0, 0.3], [0, 50]);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.02, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </motion.div>

      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center -mt-20 md:-mt-32"
      >
        <motion.div
          style={{ scale: logoScale, rotate: logoRotate, y: logoY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 mt-[10vh] inline-block"
        >
          <div className="relative">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -inset-20 bg-cyan-500/20 blur-[100px] rounded-full" 
            />
            <img 
              src="/Logohero.webp" 
              alt="MDrip Logo" 
              className="w-[260px] md:w-[345px] mx-auto relative drop-shadow-[0_0_50px_rgba(0,255,255,0.6)]"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              onError={(e) => {
                // Fallback if Logohero.png isn't available
                e.currentTarget.src = 'https://picsum.photos/seed/medical/400/400';
              }}
            />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
        >
          Premium IV Therapy <br />
          <span className="text-gradient italic font-serif">At Your Doorstep</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light"
        >
          Experience professional medical hydration and wellness treatments in the comfort of your home.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="https://wa.me/573218210894"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-bold rounded-full transition-all duration-300 text-lg shadow-xl shadow-teal-500/20 text-center"
          >
            Book Now
          </a>
          <a 
            href="#how-it-works"
            className="w-full sm:w-auto px-10 py-4 glass hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:border-[#00ffff]/50 hover:text-[#00ffff] text-white font-bold rounded-full transition-all duration-300 text-lg text-center"
          >
            How it Works
          </a>
        </motion.div>
      </motion.div>


    </section>
  );
};

const Features = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yTransforms = [y1, y2, y3];

  const features = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Home Comfort",
      desc: "No travel needed. We bring the clinic to your living room or office."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Medical Grade",
      desc: "Administered by certified physicians with premium-grade medical ingredients."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Recovery",
      desc: "Direct-to-bloodstream hydration for immediate results and energy boost."
    }
  ];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              style={{ y: isMobile ? 0 : yTransforms[i] }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                ...(isMobile ? {
                  transition: {
                    y: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 3 + i,
                      ease: "easeInOut"
                    }
                  }
                } : {})
              }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="p-8 rounded-3xl glass hover:border-[#00ffff]/30 transition-all group"
            >
              <div className="w-16 h-16 bg-[#008080]/10 rounded-2xl flex items-center justify-center mb-6 text-[#00ffff] group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-white/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ s: any, i: number, isExpanded: boolean, onToggle: () => void }> = ({ s, i, isExpanded, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    scale.set(1.1);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.05)"
      }}
      className={`group cursor-pointer p-4 rounded-[2.5rem] border transition-all duration-500 backdrop-blur-sm ${
        isExpanded 
          ? 'bg-[#000000] border-[#00ffff]/40 shadow-[0_0_50px_rgba(0,255,255,0.1)]' 
          : 'bg-[#000000] border-white/10 hover:border-[#00ffff]/30'
      }`}
      onClick={onToggle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div 
        className="relative h-72 rounded-3xl overflow-hidden mb-6"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {s.video ? (
          <motion.video
            ref={videoRef}
            src={s.video}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ x: translateX, y: translateY, scale: scaleSpring }}
            muted
            loop
            playsInline
            autoPlay={true}
            preload="auto"
          />
        ) : (
          <motion.img 
            src={s.gif ? s.gif : s.image} 
            alt={s.title} 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ x: translateX, y: translateY, scale: scaleSpring }}
            referrerPolicy="no-referrer"
            fetchPriority={i < 4 ? "high" : "auto"}
            loading={i < 4 ? "eager" : "lazy"}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Elegant Aura Effect for Blue Bag */}
        {/* Radiant Glow Effect for Beauty & Glow */}
        {s.title === "Beauty & Glow" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Emerald Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#10b981]/15 blur-[80px] rounded-full transition-opacity duration-1000 opacity-100" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(16, 185, 129, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Radiant Glow Effect for Athletic Recovery */}
        {s.title === "Athletic Recovery" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Purple Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#8b5cf6]/20 blur-[80px] rounded-full transition-opacity duration-1000 opacity-100" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-purple-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(139, 92, 246, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Floating Ingredients */}
        {s.ingredients && s.ingredients.map((ing: string, idx: number) => {
          const isBeautyGlow = s.title === "Beauty & Glow";

          if (isBeautyGlow) {
            const sidePositions = [
              { left: '10%', top: '25%' },
              { right: '10%', top: '45%' },
              { left: '15%', bottom: '20%' },
            ];
            const pos = sidePositions[idx % sidePositions.length];

            return (
              <div 
                key={ing}
                className="absolute z-20 pointer-events-none"
                style={{ 
                  ...pos,
                  transform: `translateZ(${40 + idx * 10}px)`
                }}
              >
                <div 
                  className="transition-all duration-1000 pointer-events-auto opacity-100 translate-y-0"
                  style={{ transitionDelay: `${idx * 200}ms`, transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                >
                  <div 
                    className="animate-float relative bg-gradient-to-br from-[#10b981]/80 to-[#059669]/80 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(16,185,129,0.4)] text-white text-[11px] font-bold px-5 py-2.5 rounded-full whitespace-nowrap hover:scale-110 transition-transform duration-500 cursor-pointer"
                    style={{ animationDelay: `${idx * 0.7}s` }}
                  >
                    <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] tracking-wider">{ing}</span>
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_ease-in-out_infinite]" style={{ animationDelay: `${idx * 0.5}s` }} />
                  </div>
                </div>
              </div>
            );
          }

          const transforms = [
            "-translate-x-28 -translate-y-28 -rotate-6",
            "translate-x-24 -translate-y-20 rotate-12",
            "-translate-x-24 translate-y-28 -rotate-12",
            "translate-x-28 translate-y-24 rotate-6",
          ];
          const delays = [
            "delay-0",
            "delay-75",
            "delay-150",
            "delay-200",
          ];
          return (
            <div 
              key={ing}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              style={{ transform: "translateZ(40px) translate(-50%, -50%)" }}
            >
              <div 
                className={`transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${delays[idx % delays.length]} opacity-100 scale-100 ${transforms[idx % transforms.length]}`}
              >
                <div 
                  className="relative water-droplet rounded-full text-white text-[11px] font-bold px-4 py-2 animate-float whitespace-nowrap overflow-hidden"
                  style={{ animationDelay: `${idx * 0.5}s` }}
                >
                  <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{ing}</span>
                </div>
              </div>
            </div>
          );
        })}

        {s.title === "Ultra Recovery" && (
          <div className="absolute bottom-6 left-6" style={{ transform: "translateZ(20px)" }}>
            <span className="px-3 py-1 bg-[#00ffff] text-black text-xs font-bold rounded-full uppercase tracking-widest">
              Popular
            </span>
          </div>
        )}
      </motion.div>
      <motion.h3 
        animate={{ 
          scale: isExpanded ? 1.1 : 1,
          color: isExpanded ? "#00ffff" : "#ffffff",
          textShadow: isExpanded ? "0 0 20px rgba(0, 255, 255, 0.5)" : "none"
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-xl font-bold mb-2 origin-left group-hover:text-[#00ffff] transition-colors"
      >
        {s.title}
      </motion.h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {s.tags.map((t: string) => (
          <span key={t} className="text-[10px] uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>
      
      <AnimatePresence>
        {isExpanded && s.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/60 text-sm mb-6 leading-relaxed border-t border-white/5 pt-4">
              {s.description}
            </p>
            <motion.a 
              href={`https://wa.me/573218210894?text=Hi! I'm interested in the ${s.title} drip.`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-3 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 mb-6 shadow-lg shadow-teal-500/10"
            >
              <WhatsappIcon className="w-4 h-4" />
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-bold text-[#00ffff]">{s.price}</span>
        <div className="flex items-center gap-3">
          {s.description && (
            <span 
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                isExpanded ? 'text-white' : 'text-[#00ffff] hover:text-white'
              }`}
            >
              {isExpanded ? 'Less' : 'More'}
            </span>
          )}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              rotate: isExpanded ? 90 : 0,
              backgroundColor: isExpanded ? "#00ffff" : "rgba(255, 255, 255, 0.05)",
              color: isExpanded ? "#000000" : "#ffffff"
            }}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00ffff]/50 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about-us" ref={ref} className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#00ffff]">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient leading-tight">Physician-Led <br />Medical Care</h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#00ffff] first-letter:mr-3 first-letter:float-left">
                MDrip provides physician-led medical care in the comfort of your accommodation. 
                Our licensed physicians bring high quality and discreet professional medical 
                evaluation and IV therapy directly to your Airbnb or hotel room in Medellín.
              </p>
              <p>
                We specialize in medical treatment for travelers and residents who need 
                professional care without visiting a clinic. Every visit includes a thorough 
                medical evaluation to ensure IV therapy is safe and appropriate for your condition.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#00ffff] mb-1">100%</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Licensed MDs</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#00ffff] mb-1">24/7</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Availability</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 relative group">
              <motion.div style={{ y: imgY, height: "130%", top: "-15%", position: "absolute", width: "100%" }}>
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Medical Professional in Medellín" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-3xl border border-white/20 backdrop-blur-xl">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-[#00ffff]/20 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <ShieldCheck className="w-8 h-8 text-[#00ffff]" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white">Premium Care</p>
                    <p className="text-sm text-white/50">Discreet & Professional</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00ffff]/5 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#008080]/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PaymentMethods = () => {
  const methods = [
    { name: "Cash", icon: <DollarSign className="w-6 h-6" />, desc: "USD or COP at current rate" },
    { name: "Bancolombia", icon: <CreditCard className="w-6 h-6" />, desc: "Direct bank transfer" },
    { name: "Nequi", icon: <Smartphone className="w-6 h-6" />, desc: "Instant mobile payment" },
    { name: "Bre-B", icon: <Zap className="w-6 h-6" />, desc: "Instant bank transfer" },
    { name: "PayPal", icon: <Globe className="w-6 h-6" />, desc: "International credit cards" }
  ];

  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Payment Methods</h2>
          <p className="text-white/50 max-w-xl mx-auto">Flexible options for your convenience.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {methods.map((m, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, borderColor: "rgba(0, 255, 255, 0.3)" }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 text-center flex flex-col items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#00ffff]/10 flex items-center justify-center text-[#00ffff]">
                {m.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{m.name}</h3>
                <p className="text-xs text-white/40 uppercase tracking-wider">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const services = [
    {
      title: "Immunity Boost",
      price: "$130 USD",
      video: "/Animacionamarilla.webm",
      tags: ["HIGH-DOSE VITAMIN C", "ELECTROLYTES"],
      description: "Strengthen your body’s natural defenses with a treatment centered around High-dose Vitamin C and Electrolytes. This potent blend is designed to fortify the immune system, support cellular function, and reduce inflammation."
    },
    {
      title: "The Hangover Cure",
      price: "$120 USD",
      video: "/Animacionazul.webm",
      tags: ["RINGER LACTATE", "THIAMINE", "ANTI-NAUSEA"],
      description: "Recover quickly from a night out with our specialized hangover treatment. Designed to rehydrate with Ringer Lactate and Thiamine, and flush toxins with anti-nausea medication to restore your balance fast."
    },
    {
      title: "Myers Cocktail",
      price: "$135 USD",
      video: "/Animacionverde.webm",
      tags: ["CALCIUM GLUCONATE", "B-COMPLEX", "VITAMIN C"],
      description: "The gold standard for total cellular restoration. This potent blend of Calcium Gluconate, B-Complex, and Vitamin C is designed to support energy levels, immune function, and relax your muscles."
    },
    {
      title: "Ultra Recovery",
      price: "$125 USD",
      video: "/Animacionmorada.webm",
      tags: ["THIAMINE", "VITAMIN B2", "VITAMIN B6", "VITAMIN B12", "ELECTROLYTES", "RINGER LACTATE"],
      description: "Accelerate your recovery with a comprehensive blend of Thiamine, Vitamin B2, Vitamin B6, Vitamin B12, and electrolytes in a ringer lactate solution, specifically designed to combat travel-induced fatigue."
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Drip Menu</h2>
          <p className="text-white/50 max-w-xl mx-auto">Tailored infusions designed to help you feel your best, wherever you are.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard 
              key={i} 
              s={s} 
              i={i} 
              isExpanded={expandedIndex === i}
              onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "1",
      title: "Choose Your Drip",
      desc: "Select the infusion that matches your needs from our curated menu. Our physicians will be there to guide you every step of the way."
    },
    {
      num: "2",
      title: "Schedule via WhatsApp",
      desc: "Contact us directly via WhatsApp to pick a time that works for you. No complex forms, just direct professional communication."
    },
    {
      num: "3",
      title: "We Come to You",
      desc: "A certified physician will assess you at your location."
    },
    {
      num: "4",
      title: "Feel Better",
      desc: "Relax and enjoy your treatment. Most sessions take 45-60 minutes."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">How it Works</h2>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover="hover"
                className="flex gap-6 group cursor-pointer"
              >
                <motion.span 
                  variants={{
                    hover: { 
                      color: "#00ffff", 
                      textShadow: "0 0 25px rgba(0, 255, 255, 0.8)",
                      scale: 1.15,
                      opacity: 1
                    }
                  }}
                  className="text-4xl font-serif italic text-[#00ffff]/30 font-bold transition-all duration-500"
                >
                  {step.num}
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#00ffff] transition-colors duration-500">{step.title}</h3>
                  <p className="text-white/50 group-hover:text-white/80 transition-colors duration-500">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Honestly, MDrip saved my trip. I was feeling absolutely wrecked after my flight and some altitude issues. The doc was at my Airbnb in like 45 mins and I felt 100% better right after. Total lifesaver!",
      author: "Sarah J.",
      role: "Traveler"
    },
    {
      quote: "Super professional and low-key. Being a nomad here in Medellin, having this 24/7 is a total game changer. That Energy & Focus drip is the real deal, highly recommend it.",
      author: "Michael T.",
      role: "Digital Nomad"
    },
    {
      quote: "The check-up was actually really thorough, so I felt totally safe. Way better than trying to figure out a hospital here for something that can just be handled at home.",
      author: "Elena R.",
      role: "Resident"
    },
    {
      quote: "Great service. They showed up right on time and everything was super clean. The hydration therapy was exactly what I needed after a long weekend hiking in Guatapé.",
      author: "David L.",
      role: "Adventure Traveler"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-white/50 max-w-xl mx-auto">Real experiences from travelers and residents in Medellín.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-4">
                  <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative">
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00ffff]/10" />
                    <div className="flex flex-col items-center text-center">
                      <p className="text-xl md:text-2xl text-white/90 italic mb-8 leading-relaxed">
                        "{t.quote}"
                      </p>
                      <div>
                        <h4 className="font-bold text-white text-lg">{t.author}</h4>
                        <p className="text-[#00ffff] text-sm uppercase tracking-widest font-semibold">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-[#00ffff]/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-[#00ffff]/20 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'w-8 bg-[#00ffff]' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', rating: 5 });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-white/50">Your feedback helps us provide the best care possible.</p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="w-16 h-16 text-[#00ffff] mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-white/50">Your feedback has been sent successfully.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00ffff]/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Email (Optional)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00ffff]/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 transition-colors ${formData.rating >= star ? 'text-[#00ffff] fill-[#00ffff]' : 'text-white/20'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Your Experience</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00ffff]/50 transition-colors resize-none"
                  placeholder="Tell us about your treatment..."
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-5 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : (
                  <>
                    Send Feedback
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};


const CTA = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#008080] to-[#00ffff] opacity-90 z-0" />
          <motion.div 
            style={{ y: bgY, height: "140%", top: "-20%", left: 0, position: "absolute", width: "100%" }}
            className="bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20 z-10"
            aria-hidden="true"
          />
          <div className="relative z-20">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-8">Ready to feel your best?</h2>
            <p className="text-black/70 text-xl mb-12 max-w-xl mx-auto">
              Book your first session today and get 20% off with code <span className="font-bold">FIRSTDRIP</span>
            </p>
            <a 
              href="https://wa.me/573218210894"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-black text-white font-bold rounded-full text-xl hover:scale-105 transition-transform shadow-2xl inline-block"
            >
              Book Your Session Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ faq, index, activeIndex, setActiveIndex }: { faq: any, index: number, activeIndex: number | null, setActiveIndex: (i: number | null) => void }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const isOpen = activeIndex === index;

  useEffect(() => {
    if (isOpen && itemRef.current) {
      const timer = setTimeout(() => {
        itemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.01,
        borderColor: "rgba(0, 255, 255, 0.3)",
        boxShadow: "0 0 30px rgba(0, 255, 255, 0.05)"
      }}
      className={`border rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 ${
        isOpen 
          ? 'bg-white/[0.08] border-[#00ffff]/40 shadow-[0_0_40px_rgba(0,255,255,0.1)]' 
          : 'bg-white/[0.03] border-white/10'
      }`}
    >
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="w-full px-6 py-6 text-left flex items-center justify-between group transition-all duration-500"
      >
        <span className={`font-semibold text-lg pr-8 transition-colors duration-500 ${
          isOpen ? 'text-[#00ffff]' : 'text-white/80 group-hover:text-white'
        }`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ 
            rotate: isOpen ? 90 : 0,
            scale: isOpen ? 1.2 : 1,
            color: isOpen ? "#00ffff" : "rgba(255, 255, 255, 0.4)"
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#00ffff]/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4 mx-6 mb-2">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept Cash (USD or COP), Bancolombia bank transfers, Nequi, Bre-B, and PayPal. Payment is typically made at the time of service."
    },
    {
      question: "How do I book a session?",
      answer: "Currently, all bookings are handled directly via WhatsApp. This allows for a quick medical pre-evaluation and direct coordination with our physicians. Just click any 'Book Now' button to start a chat with us."
    },
    {
      question: "How do I know which drip is best for me?",
      answer: "Our medical professionals are here to help. You can contact us via WhatsApp for a free pre-evaluation where our doctors will assess your condition and recommend the most suitable treatment for your needs."
    },
    {
      question: "What is IV Therapy?",
      answer: "IV Therapy is a medical treatment that delivers fluids, vitamins, and minerals directly into your bloodstream. This bypasses the digestive system for 100% absorption and immediate results."
    },
    {
      question: "How long does a session take?",
      answer: "Most sessions take between 45 to 60 minutes, depending on the specific drip and your individual needs. Our professionals will monitor you throughout the entire process."
    },
    {
      question: "Is it safe?",
      answer: "Yes, IV therapy is very safe when administered by trained medical professionals. We use high-quality ingredients and follow strict medical protocols to ensure your safety and comfort."
    },
    {
      question: "Who performs the treatment?",
      answer: "All our treatments are performed exclusively by licensed physicians who specialize in IV administration, ensuring the highest level of medical expertise."
    },
    {
      question: "How quickly will I feel the effects?",
      answer: "Many clients report feeling an immediate boost in energy and hydration. Depending on the drip, full effects are typically felt within a few hours and can last for several days."
    }
  ];

  return (
    <section id="faqs" className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">FAQs</h2>
          <p className="text-white/60 text-lg">Everything you need to know about our services.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              index={index} 
              activeIndex={activeIndex} 
              setActiveIndex={setActiveIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenPolicy }: { onOpenPolicy: (type: 'privacy' | 'terms') => void }) => {
  return (
    <footer id="contact" className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.webp" 
                  alt="MDRIP Logo" 
                  className="h-full w-full object-contain mix-blend-screen brightness-125"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/medical/100/100';
                  }}
                />
              </div>
              <span className="text-3xl font-bold tracking-tighter text-gradient">MDRIP</span>
            </div>
            <p className="text-white/40 max-w-md mb-8">
              Redefining wellness with premium home-care IV therapy. Professional, safe and discreet medical hydration delivered to your door.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/mdrip.med/" },
                { Icon: WhatsappIcon, href: "https://wa.me/573218210894" }
              ].map(({ Icon, href }, i) => (
                <motion.a 
                  key={i} 
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: [
                      "0 0 15px rgba(0, 255, 255, 0.2)",
                      "0 0 25px rgba(0, 255, 255, 0.4)",
                      "0 0 15px rgba(0, 255, 255, 0.2)"
                    ],
                    borderColor: "rgba(0, 255, 255, 0.5)",
                    color: "#00ffff"
                  }}
                  transition={{ 
                    boxShadow: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10 
                    }
                  }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 border border-white/5 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Drip Menu</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#about-us" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/40">
              <li>
                <a 
                  href="https://wa.me/573218210894" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#00ffff] transition-colors group"
                >
                  <svg className="w-5 h-5 text-[#00ffff] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-medium">+57 321 821 0894</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#00ffff]" strokeWidth={2.5} />
                <span>Medellín, ANT. & Surrounding Areas</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#00ffff]" strokeWidth={2.5} />
                <span>Available 24/7</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20 uppercase tracking-widest">
          <p>© 2026 MDRIP IV THERAPY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onOpenPolicy('terms')} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};


import { Chatbot } from './components/Chatbot';
import Links from './pages/Links';

function HomePage() {
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <Services />
        <PaymentMethods />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Feedback />
        <CTA />
      </main>
      <Footer onOpenPolicy={(type) => setPolicyType(type)} />
      <Chatbot />
      
      <AnimatePresence>
        {policyType && (
          <PolicyModal type={policyType} onClose={() => setPolicyType(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </BrowserRouter>
  );
}

const PolicyModal: React.FC<{ type: 'privacy' | 'terms', onClose: () => void }> = ({ type, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#0d0d0d] border border-white/10 w-full max-w-4xl max-h-[80vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gradient">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto custom-scrollbar text-white/70 space-y-6">
          {type === 'privacy' ? (
            <>
              <section>
                <h3 className="text-white font-bold mb-3">1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you book a session, sign up for our newsletter, or contact us for support. This may include your name, email address, phone number, and medical history relevant to IV therapy.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">2. How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, to process your bookings, and to communicate with you about your appointments and our services.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">3. Medical Confidentiality</h3>
                <p>Your medical information is treated with the highest level of confidentiality. Our physicians follow strict protocols to ensure your health data is protected and only used for the purpose of providing safe medical care.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">4. Data Security</h3>
                <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet is 100% secure.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">5. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at jabarrios92@gmail.com or via WhatsApp.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3 className="text-white font-bold mb-3">1. Acceptance of Terms</h3>
                <p>By accessing or using MDRIP's services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">2. Medical Services</h3>
                <p>MDRIP provides physician-led IV therapy. All treatments are subject to a medical evaluation by a licensed physician. We reserve the right to refuse service if a treatment is deemed unsafe or inappropriate for a client.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">3. Bookings and Cancellations</h3>
                <p>Bookings are subject to availability. Cancellations made less than 2 hours before the scheduled appointment may be subject to a cancellation fee. Please notify us as soon as possible if you need to reschedule.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">4. Limitation of Liability</h3>
                <p>To the maximum extent permitted by law, MDRIP shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-3">5. Governing Law</h3>
                <p>These terms shall be governed by and construed in accordance with the laws of Colombia, without regard to its conflict of law provisions.</p>
              </section>
            </>
          )}
        </div>
        
        <div className="p-8 border-t border-white/10 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-bold rounded-2xl transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
