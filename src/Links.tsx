import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Globe, MessageCircle } from 'lucide-react';

const Links = () => {
  useEffect(() => {
    document.title = "MDrip Links";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051014] via-[#0a192f] to-[#051014] text-white flex flex-col items-center py-12 px-6 font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00ffff]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#008080]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        className="w-full max-w-[420px] relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-6 relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[40px] rounded-full" />
          <img 
            src="/Logohero.webp" 
            alt="MDrip Logo" 
            className="w-32 h-auto relative drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            onError={(e) => {
              e.currentTarget.src = '/logo.webp';
            }}
          />
        </motion.div>

        {/* Header Text */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            MDrip
          </h1>
          <p className="text-white/60 text-sm font-medium px-4">
            Premium IV Therapy & Wellness in Medellín
          </p>
        </motion.div>

        {/* Links Container */}
        <motion.div variants={itemVariants} className="w-full flex flex-col gap-4">
          
          {/* Primary Button - WhatsApp */}
          <motion.a
            href="https://wa.me/573218210894?text=Hello%20I%20want%20information%20about%20MDrip"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-lg shadow-[0_8px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_25px_rgba(37,211,102,0.4)] transition-all duration-300 overflow-hidden"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <MessageCircle className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Book via WhatsApp</span>
          </motion.a>

          {/* Secondary Button - Instagram */}
          <motion.a
            href="https://instagram.com/mdrip.med"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/20 shadow-lg transition-all duration-300"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
            <span>Instagram</span>
          </motion.a>

          {/* Secondary Button - Website */}
          <motion.a
            href="https://mdrip.co"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/20 shadow-lg transition-all duration-300"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Globe className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <span>Visit Website</span>
          </motion.a>

        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} MDrip IV Therapy. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Links;
