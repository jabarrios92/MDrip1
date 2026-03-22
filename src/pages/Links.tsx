import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Globe, Instagram } from 'lucide-react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LinkCard = ({ href, title, icon, color, delay, isInternal }: any) => {
  const content = (
    <>
      {/* Subtle background glow on hover (desktop) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{ background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)` }} 
      />
      
      {/* Icon Container */}
      <div 
        className="flex items-center justify-center w-14 h-14 rounded-[18px] bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10" 
        style={{ color: color }}
      >
        {icon}
      </div>
      
      {/* Text */}
      <span className="flex-1 text-white font-semibold text-[15px] tracking-wide ml-4 relative z-10">
        {title}
      </span>
      
      {/* Chevron */}
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors relative z-10">
        <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
      </div>
    </>
  );

  // active:scale-95 is the secret to great mobile interactivity
  const className = "relative flex items-center w-full p-2 pr-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden group active:scale-95 transition-all duration-300 hover:border-white/20 hover:bg-white/10 shadow-xl";

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }
  };

  if (isInternal) {
    return (
      <motion.div {...motionProps} className="w-full">
        <Link to={href} className={className}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a 
      {...motionProps}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
    >
      {content}
    </motion.a>
  );
};

const Links = () => {
  return (
    <div className="min-h-screen bg-[#050505] flex justify-center items-center py-12 px-5 font-sans relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00ffff]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#004792]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[360px] flex flex-col items-center relative z-10">
        <motion.header 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center mb-10 text-center"
        >
          {/* Glowing Avatar */}
          <div className="relative w-[110px] h-[110px] rounded-full p-[3px] bg-gradient-to-br from-[#004792] via-[#008080] to-[#00ffff] mb-5 shadow-[0_0_30px_rgba(0,255,255,0.15)] group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#004792] to-[#00ffff] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <img 
              src="/Logohero.webp" 
              alt="MDrip Profile" 
              className="relative w-full h-full rounded-full object-cover bg-black border-2 border-black z-10"
            />
          </div>
          <h1 className="text-white text-3xl font-bold mb-1 tracking-tight">MDrip</h1>
          <p className="text-white/60 text-[15px] font-medium">Premium IV Therapy in Medellín 💧</p>
        </motion.header>

        <div className="w-full flex flex-col gap-4">
          <LinkCard 
            href="https://wa.me/573218210894"
            title="Chat with our Medical Team"
            icon={<WhatsappIcon className="w-7 h-7" />}
            color="#25D366"
            delay={0.1}
          />
          <LinkCard 
            href="/"
            title="Visit our Website"
            icon={<Globe className="w-7 h-7" />}
            color="#00ffff"
            delay={0.2}
            isInternal
          />
          <LinkCard 
            href="https://www.instagram.com/mdrip.med/"
            title="Follow us on Instagram"
            icon={<Instagram className="w-7 h-7" />}
            color="#E1306C"
            delay={0.3}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-white/30 text-xs font-medium tracking-widest uppercase">Revitalize your body</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Links;
