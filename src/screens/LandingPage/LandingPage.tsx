import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { RegistrationModal } from '../../components/RegistrationModal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="fluid-container bg-white">
        
        {/* HERO SECTION - Converted to responsive grid */}
        <section className="relative min-h-screen use-cq overflow-hidden bg-[linear-gradient(180deg,rgba(57,0,53,1)_0%,rgba(144,29,107,1)_50%,rgba(255,255,255,1)_100%)]">
          
          {/* Decorative background gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-[10%] w-[62%] h-[62%] rounded-full opacity-80 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(144,29,107,1)_0%,rgba(144,29,107,0)_100%)]" />
          </div>
          
          {/* Hero Content Grid */}
          <div className="relative z-10 grid grid-cols-12 gap-4 lg:gap-8 pt-16 pb-8 lg:pt-24 lg:pb-16 min-h-screen">
            
            {/* Left Content Column */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center space-y-6 lg:space-y-8 px-4 lg:px-0">
              
              {/* Logo */}
              <div className="flex justify-center lg:justify-start mb-4 lg:mb-8">
                <img
                  className="w-[14.2%] h-auto max-w-[246px] object-contain"
                  alt="Stratikey alto"
                  src="/stratikey-alto.png"
                />
              </div>
              
              {/* Main Headline */}
              <div className="hero-content text-center lg:text-left">
                <h1 className="font-normal text-white tracking-[0] leading-tight" style={{ fontFamily: 'Outfit', fontSize: 'var(--text-6xl)' }}>
                  Il digitale che potenzia
                  <br />
                  il tuo commerciale.
                </h1>
              </div>
              
              {/* Subtext */}
              <div className="hero-content text-center lg:text-left">
                <p className="font-light text-white tracking-[0] leading-relaxed" style={{ fontFamily: 'Outfit', fontSize: 'var(--text-2xl)' }}>
                  La piattaforma che allinea marketing e vendite:
                  <br />
                  trattative più rapide, più contratti chiusi.
                </p>
              </div>
              
              {/* CTA Button in Hero */}
              <div className="flex justify-center lg:justify-start mt-8">
                <div className="glass-button inline-flex items-center justify-center gap-2 px-8 py-4 cursor-pointer group" onClick={handleOpenModal}>
                  <span className="[font-family:'Outfit',Helvetica] font-medium group-hover:font-semibold text-white text-xl tracking-[0] leading-[normal] antialiased">
                    Registrati adesso
                  </span>
                  <svg 
                    className="w-4 h-3 fill-white opacity-90 mt-0.5 transition-transform group-hover:translate-x-0.5" 
                    viewBox="0 0 16 12" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.707 6.707a1 1 0 0 0 0-1.414L10.343.929A1 1 0 0 0 8.929 2.343L12.586 6 8.929 9.657a1 1 0 1 0 1.414 1.414l4.364-4.364zM0 7h15V5H0v2z"/>
                  </svg>
                </div>
              </div>
              
            </div>
            
            {/* Right Content Column - MacBook Mockup */}
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center lg:justify-end relative">
              <div className="hero-mockup relative w-full max-w-[80%] aspect-[1400/1340]">
                <img
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(205,143,190,0.5)] transition-transform duration-300 hover:scale-110 cursor-pointer"
                  alt="Macbook mockup"
                  src="/macbook-mockup.png"
                />
              </div>
            </div>
            
          </div>
        </section>
        
        {/* PLACEHOLDER for additional sections - will be converted progressively */}
        <section className="min-h-screen bg-white flex items-center justify-center text-center relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(144,29,107,0.1)_0%,rgba(255,255,255,0)_100%)]" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h2 className="text-5xl font-semibold text-[#901d6b] mb-8">
              Sistema Responsive Avanzato
            </h2>
            <p className="text-2xl text-gray-600 mb-12">
              Il sito ora usa un sistema responsive fluido con percentuali.<br />
              Le sezioni rimanenti verranno convertite progressivamente.
            </p>
            <div className="glass-button inline-flex items-center justify-center gap-2 px-8 py-4 cursor-pointer group" onClick={handleOpenModal}>
              <span className="[font-family:'Outfit',Helvetica] font-medium group-hover:font-semibold text-white text-xl tracking-[0] leading-[normal] antialiased">
                Registrati adesso
              </span>
              <svg 
                className="w-4 h-3 fill-white opacity-90 mt-0.5 transition-transform group-hover:translate-x-0.5" 
                viewBox="0 0 16 12" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.707 6.707a1 1 0 0 0 0-1.414L10.343.929A1 1 0 0 0 8.929 2.343L12.586 6 8.929 9.657a1 1 0 1 0 1.414 1.414l4.364-4.364zM0 7h15V5H0v2z"/>
              </svg>
            </div>
            
            {/* Demo responsive cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              <Card className="bg-gradient-to-br from-[#901d6b] to-[#390035] text-white p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-4">Responsive Fluido</h3>
                  <p className="text-sm opacity-90">Layout che si adatta con percentuali reali</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#cd8fbe] to-[#901d6b] text-white p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-4">Container Queries</h3>
                  <p className="text-sm opacity-90">Posizionamenti intelligenti e adattivi</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#390035] to-[#901d6b] text-white p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-4">Typography Scalare</h3>
                  <p className="text-sm opacity-90">Testi che si ridimensionano fluidamente</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
      </div>
      
      {/* Modal di registrazione - FISSO al viewport (fuori dal responsive-container) */}
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      
      {/* Pulsante Registrati ora - RESPONSIVE e accessibile su tutti i dispositivi */}
      <div className="hidden md:fixed md:top-6 md:right-4 lg:right-8 xl:right-16 z-[100]" onClick={handleOpenModal}>
        <div className="glass-button flex items-center justify-center gap-2 group cursor-pointer px-6 py-3 rounded-full" style={{ background: 'rgba(144, 29, 107, 0.3)' }}>
            <span className="[font-family:'Outfit',Helvetica] font-medium group-hover:font-semibold text-white text-lg tracking-[0] leading-[normal] antialiased">
              Registrati ora
            </span>
            <svg 
              className="w-4 h-3 fill-white opacity-90 mt-0.5 transition-transform group-hover:translate-x-0.5" 
              viewBox="0 0 16 12" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.707 6.707a1 1 0 0 0 0-1.414L10.343.929A1 1 0 0 0 8.929 2.343L12.586 6 8.929 9.657a1 1 0 1 0 1.414 1.414l4.364-4.364zM0 7h15V5H0v2z"/>
            </svg>
        </div>
      </div>
    </div>
  );
};

export { LandingPage };