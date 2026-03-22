import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center py-10 px-5 font-sans overflow-hidden relative">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-gradient-to-b from-[#004792]/20 to-[#00ffff]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-[350px] flex flex-col items-center relative z-10">
        <header className="flex flex-col items-center mb-12 text-center">
          <div className="w-[110px] h-[110px] rounded-full p-[3px] bg-gradient-to-br from-[#004792] to-[#00ffff] mb-6 shadow-[0_0_30px_rgba(0,255,255,0.3)] animate-[pulse_3s_ease-in-out_infinite]">
            <img 
              src="/Logohero.webp" 
              alt="MDrip Profile" 
              className="w-full h-full rounded-full object-cover bg-black"
            />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2 tracking-tight">MDrip</h1>
          <p className="text-[#a0a0a0] text-[16px] font-medium">Premium IV Therapy in Medellín 💧</p>
        </header>

        <div className="w-full flex flex-col gap-6">
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/573218210894" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative flex items-center justify-center w-full py-4 px-6 rounded-full text-white font-semibold text-[16px] transition-all duration-300 border-2 border-[#25D366] bg-black shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:bg-[#25D366] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:scale-95 active:bg-[#25D366] active:shadow-[0_0_30px_rgba(37,211,102,0.8)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="absolute left-6 text-[#25D366] transition-all duration-300 group-hover:text-white group-active:text-white group-hover:scale-110 group-active:scale-110">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Chat with our Medical Team</span>
          </a>

          {/* Website Button */}
          <Link 
            to="/" 
            className="group relative flex items-center justify-center w-full py-4 px-6 rounded-full text-white font-semibold text-[16px] transition-all duration-300 border-2 border-[#00ffff] bg-black shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:bg-[#00ffff] hover:text-black hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:-translate-y-1 active:scale-95 active:bg-[#00ffff] active:text-black active:shadow-[0_0_30px_rgba(0,255,255,0.8)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-6 text-[#00ffff] transition-all duration-300 group-hover:text-black group-active:text-black group-hover:scale-110 group-active:scale-110">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>Visit our Website</span>
          </Link>

          {/* Instagram Button */}
          <a 
            href="https://www.instagram.com/mdrip.med/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative flex items-center justify-center w-full py-4 px-6 rounded-full text-white font-semibold text-[16px] transition-all duration-300 border-2 border-[#E1306C] bg-black shadow-[0_0_15px_rgba(225,48,108,0.2)] hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:shadow-[0_0_25px_rgba(225,48,108,0.6)] hover:-translate-y-1 active:scale-95 active:bg-gradient-to-r active:from-[#f09433] active:via-[#dc2743] active:to-[#bc1888] active:border-transparent active:shadow-[0_0_30px_rgba(225,48,108,0.8)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-6 text-[#E1306C] transition-all duration-300 group-hover:text-white group-active:text-white group-hover:scale-110 group-active:scale-110">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>Follow us on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Links;
