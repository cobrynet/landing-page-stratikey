import React from "react";
import { useState, useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { RegistrationModal } from "../../components/RegistrationModal";

const featureBadges = [
  {
    src: "/attiva h24.svg",
    alt: "Attiva h24",
  },
  {
    src: "/integrazione completa.svg", 
    alt: "Integrazione completa",
  },
  {
    src: "/forza commerciale.svg",
    alt: "Forza commerciale",
  },
];



export const LandingPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const disconnectioneSvgRef = useRef<HTMLImageElement>(null);
  const connessioneSvgRef = useRef<HTMLImageElement>(null);
  const badgeRefs = useRef<(HTMLImageElement | null)[]>([]);

  React.useEffect(() => {
    const minAngle = -80;
    const maxAngle = -27.98;

    const updateRotation = () => {
      const svg = disconnectioneSvgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / rect.height, 0), 1);
      const angle = minAngle + (maxAngle - minAngle) * progress;
      svg.style.transform = `rotate(${angle}deg)`;
    };

    const updateConnessioneRotation = () => {
      const svg = connessioneSvgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / rect.height, 0), 1);
      const minAngleConn = -25.23;
      const maxAngleConn = -77.25;
      const angle = minAngleConn + (maxAngleConn - minAngleConn) * progress;
      svg.style.transform = `rotate(${angle}deg) scaleX(-1)`;
    };

    const handleScroll = () => {
      updateRotation();
      updateConnessioneRotation();
    };

    const handleResize = () => {
      updateRotation();
      updateConnessioneRotation();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    updateRotation();
    updateConnessioneRotation();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: [0, 0.2, 0.8, 1] });

    badgeRefs.current.forEach(badge => {
      if (badge) observer.observe(badge);
    });

    return () => {
      badgeRefs.current.forEach(badge => {
        if (badge) observer.unobserve(badge);
      });
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Responsive "Registrati ora" Button - Fixed Position */}
      <div 
        className="fixed top-4 right-4 md:top-6 md:right-6 lg:top-[86px] lg:right-8 xl:right-16 2xl:right-32 z-50" 
        onClick={handleOpenModal}
      >
        <div className="glow-button flex items-center justify-center gap-2 group cursor-pointer px-4 py-2 md:px-6 md:py-3 rounded-full" 
             style={{ background: 'rgba(144, 29, 107, 0.3)' }}>
          <span className="[font-family:'Outfit',Helvetica] font-medium group-hover:font-semibold text-white text-sm md:text-lg lg:text-xl tracking-[0] leading-[normal] antialiased">
            Registrati ora
          </span>
          <svg 
            className="w-3 h-2 md:w-4 md:h-3 fill-white opacity-90 mt-0.5 transition-transform group-hover:translate-x-0.5" 
            viewBox="0 0 16 12" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.707 6.707a1 1 0 0 0 0-1.414L10.343.929A1 1 0 0 0 8.929 2.343L12.586 6 8.929 9.657a1 1 0 1 0 1.414 1.414l4.364-4.364zM0 7h15V5H0v2z"/>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#390035] via-[#901d6b] to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          
          {/* Header Logo */}
          <div className="flex justify-center pt-12 md:pt-16 lg:pt-20">
            <img
              className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-auto object-cover"
              alt="Stratikey alto"
              src="/stratikey-alto.png"
            />
          </div>

          {/* Hero Title */}
          <div className="text-center mt-8 md:mt-12 lg:mt-16 xl:mt-20">
            <h1 className="[font-family:'Outfit',Helvetica] font-normal text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[64px] tracking-[0] leading-tight px-4">
              Il digitale che potenzia
              <br />
              il tuo commerciale.
            </h1>
          </div>

          {/* Hero Subtitle */}
          <div className="text-center mt-6 md:mt-8 lg:mt-12">
            <p className="[font-family:'Outfit',Helvetica] font-light text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] tracking-[0] leading-relaxed max-w-5xl mx-auto px-4">
              La piattaforma che allinea marketing e vendite:
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>trattative più rapide, più contratti chiusi.
            </p>
          </div>

          {/* Hero CTA Button */}
          <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
            <div className="glass-button w-64 md:w-72 lg:w-80 h-12 md:h-14 cursor-pointer" onClick={handleOpenModal}>
              <div className="glass-surface">
                <div className="glass-highlight"></div>
                <div className="glass-refraction"></div>
                <div className="glass-content">
                  <span className="[font-family:'Outfit',Helvetica] font-medium text-white text-lg md:text-xl lg:text-2xl text-center tracking-[-0.02em] leading-[1.2] select-none antialiased">
                    Registrati adesso
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MacBook Mockup - Responsive */}
          <div className="flex justify-center mt-12 md:mt-16 lg:mt-20 xl:mt-24">
            <img
              className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl 2xl:max-w-4xl h-auto object-cover drop-shadow-[0_20px_35px_rgba(205,143,190,0.5)] transition-transform duration-300 hover:scale-105 cursor-pointer"
              alt="Macbook mockup"
              src="/macbook-mockup.png"
            />
          </div>

          {/* Feature Badges - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16 lg:mt-20 justify-items-center">
            {featureBadges.map((badge, index) => (
              <img
                key={index}
                ref={el => badgeRefs.current[index] = el}
                className="w-32 sm:w-40 md:w-44 lg:w-52 xl:w-60 h-auto fade-in transition-all duration-300 hover:scale-105"
                alt={badge.alt}
                src={badge.src}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Cards Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            
            {/* Disconnection Card */}
            <Card className="bg-white h-auto min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] rounded-[25px] md:rounded-[35px] lg:rounded-[50px] border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 lg:p-12 h-full flex flex-col">
                <div className="mb-6 md:mb-8">
                  <h2 className="[font-family:'Outfit',Helvetica] font-medium text-[#901d6b] text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0] leading-tight mb-4 md:mb-6">
                    La connessione si è persa.
                  </h2>
                  <p className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-base md:text-lg lg:text-xl xl:text-2xl tracking-[0] leading-relaxed">
                    Le aziende industriali si trovano a lavorare con strumenti separati, strategie frammentate e processi commerciali lenti e poco coordinati.
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <img
                    ref={disconnectioneSvgRef}
                    className="w-48 md:w-56 lg:w-64 xl:w-72 h-auto object-contain drop-shadow-[0_0_10px_rgba(205,143,190,0.5)] transition-transform duration-300"
                    style={{ transition: 'transform 0.1s linear', transform: 'rotate(-27.98deg)' }}
                    alt="Illustrazione disconnessione"
                    src="/disconnessione.svg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Connection Card */}
            <Card className="bg-[#390035] h-auto min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] rounded-[25px] md:rounded-[35px] lg:rounded-[50px] border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 lg:p-12 h-full flex flex-col">
                <div className="mb-6 md:mb-8">
                  <h2 className="[font-family:'Outfit',Helvetica] font-medium text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0] leading-tight mb-4 md:mb-6">
                    È il momento di ritrovarla.
                  </h2>
                  <p className="[font-family:'Outfit',Helvetica] font-light text-white text-base md:text-lg lg:text-xl xl:text-2xl tracking-[0] leading-relaxed">
                    Il commerciale diventa finalmente connesso al digitale: un unico ecosistema che integra marketing, vendite e materiali, per trasformare ogni opportunità in contratto.
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <img
                    ref={connessioneSvgRef}
                    className="w-48 md:w-56 lg:w-64 xl:w-72 h-auto object-contain drop-shadow-[0_0_10px_rgba(205,143,190,0.5)] transition-transform duration-300"
                    style={{ transition: 'transform 0.1s linear', transform: 'rotate(-93.23deg) scaleX(-1)' }}
                    alt="Illustrazione connessione"
                    src="/connessione.svg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h2 className="bg-[linear-gradient(90deg,#901d6b_0%,#cf1f96_50%,#390035_100%)] bg-clip-text text-transparent [font-family:'Outfit',Helvetica] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] tracking-[0] leading-tight mb-8 md:mb-12 lg:mb-16 px-4 drop-shadow-sm max-w-5xl mx-auto">
              Con Stratikey la strategia diventa semplice e concreta. Un'unica visione che unisce marketing e vendite, assicura coerenza tra digitale e fisico e trasforma i dati in decisioni efficaci per far crescere la tua azienda.
            </h2>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#901d6b] via-[#390035] to-[#901d6b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h3 className="bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(205,143,190,1)_100%)] bg-clip-text text-transparent [font-family:'Outfit',Helvetica] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight mb-6 md:mb-8 lg:mb-10">
              Intelligenza Artificiale per l'Industria
            </h3>
            <p className="bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(205,143,190,1)_100%)] bg-clip-text text-transparent [font-family:'Outfit',Helvetica] font-light text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[32px] tracking-[0] leading-relaxed max-w-4xl mx-auto px-4">
              L'intelligenza artificiale di Stratikey è progettata e istruita specificamente per il settore industriale: comprende dinamiche, tempi e complessità delle vendite B2B, supportando il commerciale con suggerimenti mirati, automazioni intelligenti e analisi capaci di trasformare i dati in opportunità reali.
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <p className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg md:text-xl lg:text-2xl xl:text-[32px] text-center tracking-[0] leading-relaxed max-w-5xl mx-auto px-4">
              <span className="text-[#390035]">Con il nostro marketplace interno puoi acquistare applicativi e</span><br />
              <span className="text-[#390035]">servizi </span><span className="font-semibold text-[#901d6b]">con un solo click</span><span className="text-[#390035]">, senza perdite di tempo e senza</span><br />
              <span className="text-[#390035]">fornitori esterni.</span>
            </p>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            
            {/* Applicativi Card */}
            <Card className="bg-[#390035] hover:bg-[#901d6b] transition-colors duration-300 h-auto min-h-[300px] lg:min-h-[400px] rounded-[25px] md:rounded-[35px] lg:rounded-[50px] border-0 shadow-lg hover:shadow-xl">
              <CardContent className="p-6 md:p-8 lg:p-12 h-full flex flex-col">
                <h3 className="[font-family:'Outfit',Helvetica] font-medium text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0] leading-tight mb-6 md:mb-8">
                  Applicativi
                </h3>
                <div className="flex-1">
                  <p className="[font-family:'Outfit',Helvetica] font-light text-white text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[32px] leading-relaxed tracking-[0] mb-6 md:mb-8">
                    Email marketing e automazioni<br />
                    Live chat e assistenza clienti
                  </p>
                  <p className="[font-family:'Outfit',Helvetica] font-semibold text-white text-lg md:text-xl lg:text-2xl xl:text-[28px] tracking-[0] leading-relaxed">
                    Work in progress...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Servizi Card */}
            <Card className="bg-[#390035] hover:bg-[#901d6b] transition-colors duration-300 h-auto min-h-[300px] lg:min-h-[400px] rounded-[25px] md:rounded-[35px] lg:rounded-[50px] border-0 shadow-lg hover:shadow-xl">
              <CardContent className="p-6 md:p-8 lg:p-12 h-full flex flex-col">
                <h3 className="[font-family:'Outfit',Helvetica] font-medium text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0] leading-tight mb-6 md:mb-8">
                  Servizi
                </h3>
                <div className="flex-1">
                  <p className="[font-family:'Outfit',Helvetica] font-light text-white text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[32px] leading-relaxed tracking-[0] mb-6 md:mb-8">
                    Brand Identity<br />
                    Sito Web<br />
                    Foto e video aziendali<br />
                    Materiale stampato<br />
                    Contenuti per piani editoriali
                  </p>
                  <p className="[font-family:'Outfit',Helvetica] font-semibold text-white text-lg md:text-xl lg:text-2xl xl:text-[28px] tracking-[0] leading-relaxed">
                    Work in progress...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 md:py-16 lg:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Footer Line */}
          <div className="w-full h-px bg-gradient-to-r from-[#901d6b] via-[#cd8fbe] to-[#901d6b] mb-8 md:mb-12"></div>
          
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Logo & Tagline */}
            <div className="lg:col-span-1">
              <img
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-48 md:w-56 lg:w-60 h-auto mb-4 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                alt="Stratkey basso"
                src="/stratkey-basso.png"
              />
              <div className="[font-family:'Outfit',Helvetica] font-normal text-[#901d6b] text-base md:text-lg lg:text-xl tracking-[0] leading-relaxed mb-6">
                La chiave del risultato<br />è la strategia.
              </div>
              <div className="bg-[linear-gradient(90deg,rgba(144,29,107,1)_0%,rgba(205,143,190,1)_100%)] bg-clip-text text-transparent [font-family:'Outfit',Helvetica] font-semibold text-lg md:text-xl lg:text-2xl xl:text-[28px] tracking-[0] leading-relaxed">
                Work in progress...
              </div>
            </div>

            {/* Contatti */}
            <div>
              <h4 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-lg md:text-xl tracking-[0] leading-tight mb-4">
                Contatti
              </h4>
              <div className="space-y-3">
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">
                  info@stratikey.com
                </div>
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">
                  351 663 8114
                </div>
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">
                  P.IVA 02100690474
                </div>
              </div>
              <div className="mt-8 md:mt-12">
                <h5 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-lg md:text-xl tracking-[0] leading-tight mb-2">
                  Piattaforma
                </h5>
                <button 
                  onClick={handleOpenModal}
                  className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed cursor-pointer hover:text-[#901d6b] transition-colors duration-200 bg-transparent border-none p-0 text-left"
                >
                  Registrati
                </button>
              </div>
            </div>

            {/* Servizi */}
            <div>
              <h4 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-lg md:text-xl tracking-[0] leading-tight mb-4">
                Servizi
              </h4>
              <div className="space-y-3">
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">Brand Identity</div>
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">Sito Web</div>
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">Foto e video aziendali</div>
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">Materiale stampato</div>
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">Contenuti per piani editoriali</div>
              </div>
            </div>

            {/* Applicativi & Legal */}
            <div>
              <h4 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-lg md:text-xl tracking-[0] leading-tight mb-4">
                Applicativi
              </h4>
              <div className="space-y-3 mb-8 md:mb-12">
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">Email marketing e automazioni</div>
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-base md:text-lg tracking-[0] leading-relaxed">Live chat e assistenza clienti</div>
              </div>
              <div className="space-y-3">
                <a 
                  href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/cookie-policy-it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-base md:text-lg lg:text-xl tracking-[0] leading-relaxed hover:text-[#cd8fbe] transition-colors cursor-pointer block"
                >
                  Cookie Policy
                </a>
                <a 
                  href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-base md:text-lg lg:text-xl tracking-[0] leading-relaxed hover:text-[#cd8fbe] transition-colors cursor-pointer block"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="[font-family:'Outfit',Helvetica] font-light text-[#390035] text-sm md:text-base tracking-[0] leading-relaxed">
              © 2024 Stratikey. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};