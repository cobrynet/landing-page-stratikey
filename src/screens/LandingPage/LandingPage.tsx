import React from "react";
import { useState, useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { RegistrationModal } from "../../components/RegistrationModal";

const featureBadges = [
  {
    className: "w-[206px] h-[75px] top-[1020px] left-[2370px]",
    src: "/attiva h24.svg",
    alt: "Attiva h24",
  },
  {
    className: "w-[371px] h-[83px] top-[1140px] left-[1560px]",
    src: "/integrazione completa.svg",
    alt: "Integrazione completa",
  },
  {
    className: "w-[324px] h-[75px] top-[1450px] left-[2220px]",
    src: "/forza commerciale.svg",
    alt: "Forza commerciale",
  },
];


const ellipseImages = [
  { className: "w-[396px] h-[458px] top-3 left-3", src: "/ellipse-28.svg" },
  {
    className: "w-[396px] h-[458px] top-3 left-[21px]",
    src: "/ellipse-28.svg",
  },
  {
    className: "w-[396px] h-[458px] top-3 left-[31px]",
    src: "/ellipse-28.svg",
  },
  { className: "w-[396px] h-[458px] top-3 left-10", src: "/ellipse-28.svg" },
  {
    className: "w-[394px] h-[460px] top-[11px] left-[50px]",
    src: "/ellipse-30.svg",
  },
  {
    className: "w-[392px] h-[461px] top-2.5 left-[61px]",
    src: "/ellipse-31.svg",
  },
  {
    className: "w-[391px] h-[462px] top-[19px] left-[70px]",
    src: "/ellipse-32.svg",
  },
  {
    className: "w-[391px] h-[462px] top-[29px] left-[79px]",
    src: "/ellipse-33.svg",
  },
  {
    className: "w-[393px] h-[460px] top-[39px] left-[88px]",
    src: "/ellipse-34.svg",
  },
];


// BackgroundCanvas component for scalable artboard
const BackgroundCanvas = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="relative mx-auto" style={{
        width: '1728px',
        height: '6893px',
        transform: 'scale(var(--artboard-scale, 1))',
        transformOrigin: 'top center',
        maxWidth: 'none'
      }}>
        {children}
      </div>
    </div>
  );
};

// ContentContainer component for centered responsive content
const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export const LandingPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const disconnessioneSvgRef = useRef<HTMLImageElement>(null);
  const connessioneSvgRef = useRef<HTMLImageElement>(null);
  const badgeRefs = useRef<(HTMLImageElement | null)[]>([]);

  React.useEffect(() => {
    // Check if user prefers reduced motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If user prefers reduced motion, set static angles and return
      const disconnectionSvg = disconnessioneSvgRef.current;
      const connessioneSvg = connessioneSvgRef.current;
      
      if (disconnectionSvg) {
        disconnectionSvg.style.transform = 'rotate(-27.98deg)';
      }
      if (connessioneSvg) {
        connessioneSvg.style.transform = 'rotate(-77.25deg) scaleX(-1)';
      }
      return;
    }

    const minAngle = -80;
    const maxAngle = -27.98;
    let rafId: number | null = null;
    let isAnimating = false;

    const updateRotation = () => {
      const svg = disconnessioneSvgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // calcoliamo la progressione: 0 quando entra, 1 quando è tutto visibile
      const progress = Math.min(Math.max((windowHeight - rect.top) / rect.height, 0), 1);

      // interpoliamo la rotazione
      const angle = minAngle + (maxAngle - minAngle) * progress;
      svg.style.transform = `rotate(${angle}deg)`;
    };

    const updateConnessioneRotation = () => {
      const svg = connessioneSvgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // calcoliamo la progressione: 0 quando entra, 1 quando è tutto visibile
      const progress = Math.min(Math.max((windowHeight - rect.top) / rect.height, 0), 1);

      // interpoliamo la rotazione in reverse (da -93.23deg a -78.23deg)
      const minAngleConn = -25.23;
      const maxAngleConn = -77.25;
      const angle = minAngleConn + (maxAngleConn - minAngleConn) * progress;
      svg.style.transform = `rotate(${angle}deg) scaleX(-1)`;
    };

    // Throttled animation function using requestAnimationFrame
    const animateRotations = () => {
      updateRotation();
      updateConnessioneRotation();
      isAnimating = false;
    };

    const handleScroll = () => {
      // Only schedule new animation frame if one isn't already pending
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(animateRotations);
      }
    };

    const handleResize = () => {
      // For resize, update immediately since it's less frequent
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      updateRotation();
      updateConnessioneRotation();
    };

    // Add passive event listeners for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Initialize animations
    updateRotation(); // inizializza disconnessione
    updateConnessioneRotation(); // inizializza connessione

    return () => {
      // Clean up event listeners and any pending animation frames
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
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
    <div className="bg-white relative min-h-screen" style={{
      '--artboard-scale': 'clamp(0.3, calc(100vw / 1728), 1.5)'
    } as React.CSSProperties}>
      {/* Background Canvas - scalabile */}
      <BackgroundCanvas>
        <div className="absolute w-[4180px] h-[6571px] top-[-109px] left-[-1226px]">
          <div className="absolute w-[4180px] h-[6557px] top-0 left-0">
            <div className="absolute w-[1728px] h-[3053px] top-[109px] left-[1226px] bg-[linear-gradient(180deg,rgba(57,0,53,1)_0%,rgba(144,29,107,1)_50%,rgba(255,255,255,1)_100%)]" />

            <img
              className="absolute w-[1400px] h-[1340px] top-[750px] left-[1390px] object-cover drop-shadow-[0_20px_35px_rgba(205,143,190,0.5)] transition-transform duration-300 hover:scale-110 cursor-pointer"
              alt="Macbook mockup"
              src="/macbook-mockup.png"
            />

            <div className="absolute w-[4180px] h-[3630px] top-[2904px] left-0 [background:radial-gradient(50%_50%_at_50%_50%,rgba(144,29,107,1)_0%,rgba(255,255,255,0)_100%)]" />

            <div className="absolute w-[1076px] h-[1076px] top-0 left-[1552px] rounded-[538px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(144,29,107,1)_0%,rgba(144,29,107,0)_100%)]" />

















            <div className="quadranti absolute top-[2952px] left-[1493px] w-[1194px] h-[650px]">
              <article className="quad left card bg-[#390035] semplicita-card">
                {/* PNG decorativo con classe specifica */}
                <img 
                  className="maschera-stratikey" 
                  src="/maschera-stratikey.png" 
                  alt="Maschera Stratikey"
                />

                {/* Contenuto normale */}
                <div className="absolute w-[490px] bottom-[71px] left-[30px] [font-family:'Outfit',Helvetica] font-medium text-white text-5xl tracking-[0] leading-[39.8px] card-title">
                    Semplicità
                </div>
                
                {/* Sottotitolo che appare in hover */}
                <div className="absolute w-[490px] bottom-[67px] left-[30px] [font-family:'Outfit',Helvetica] font-light text-white text-[32px] tracking-[0] leading-[36px] card-subtitle">
                    Da processi complessi a<br />un'unica piattaforma<br />intuitiva
                </div>
              </article>

              <article className="quad center card bg-[#390035] gestione-card">
                {/* Immagine di sfondo che scala con hover */}
                <div className="absolute inset-0 opacity-100 transition-all duration-500">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    alt="Gestione background"
                    src="/immagine-sito.jpg"
                  />
                </div>
                
                {/* Dynamic Lines for Gestione Card */}
                <div className="dynamic-lines">
                  <div className="line line-1" style={{'--rotation': '45deg'} as React.CSSProperties}></div>
                  <div className="line line-2" style={{'--rotation': '-30deg'} as React.CSSProperties}></div>
                  <div className="line line-3" style={{'--rotation': '60deg'} as React.CSSProperties}></div>
                  <div className="line line-4" style={{'--rotation': '-45deg'} as React.CSSProperties}></div>
                </div>
                
                {/* Contenuto normale */}
                <div className="absolute w-[490px] bottom-[71px] left-[30px] [font-family:'Outfit',Helvetica] font-medium text-white text-5xl tracking-[0] leading-[39.8px] card-title z-10">
                    Gestione<br />più rapida
                </div>
                
                {/* Sottotitolo che appare in hover */}
                <div className="absolute w-[490px] bottom-[63px] left-[30px] [font-family:'Outfit',Helvetica] font-light text-white text-[32px] tracking-[0] leading-[36px] card-subtitle z-10">
                    Meno tempo sprecato,<br />più opportunità colte
                </div>
              </article>

              <article className="quad right card bg-[radial-gradient(50%_50%_at_50%_21%,rgba(144,29,107,1)_0%,rgba(57,0,53,1)_100%)] efficienza-card">
                {/* Contenuto normale */}
                <div className="absolute w-[490px] bottom-[71px] left-[30px] [font-family:'Outfit',Helvetica] font-medium text-white text-5xl tracking-[0] leading-[39.8px] card-title">
                    Efficenza
                </div>
                
                {/* Sottotitolo che appare in hover */}
                <div className="absolute w-[490px] bottom-[67px] left-[30px] [font-family:'Outfit',Helvetica] font-light text-white text-[32px] tracking-[0] leading-[36px] card-subtitle">
                    Ogni attività, dal marketing<br />al commerciale, gestite in<br />un solo ecosistema
                </div>
              </article>
            </div>

            <img
              className="absolute w-[480px] h-[462px] top-[4498px] left-[2180px] animate-fade-through"
              alt="Luce"
              src="/luce.svg"
            />

            <div className="absolute w-[551px] h-[560px] top-[4434px] left-[2164px] rotate-[-3.12deg]">
              <div className="relative w-[493px] h-[509px] top-[25px] left-7">
                {ellipseImages.map((ellipse, index) => (
                  <img
                    key={index}
                    className={`absolute ${ellipse.className} ${
                      index % 3 === 0 ? 'animate-spiral-interweave' :
                      index % 3 === 1 ? 'animate-spiral-flip' :
                      'animate-spiral-weave'
                    }`}
                    alt="Ellipse"
                    src={ellipse.src}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </BackgroundCanvas>

      {/* Responsive Content Container */}
      <ContentContainer>
        {/* Hero Section - Responsive */}
        <section className="relative pt-safe-top min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          {/* Logo - Responsive positioning */}
          <div className="mb-8 lg:mb-12">
            <img
              className="h-12 sm:h-14 lg:h-16 object-contain mx-auto"
              alt="Stratikey logo"
              src="/stratikey-alto.png"
            />
          </div>

          {/* Hero Title - Responsive typography */}
          <h1 className="text-white font-outfit font-normal text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6 sm:mb-8 max-w-4xl">
            Il digitale che potenzia
            <br />
            il tuo commerciale.
          </h1>

          {/* Hero Subtitle - Responsive typography */}
          <p className="text-white font-outfit font-light text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed mb-8 sm:mb-12 max-w-3xl">
            La piattaforma che allinea marketing e vendite:
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            trattative più rapide, più contratti chiusi.
          </p>

          {/* Main CTA - Responsive glass button */}
          <div className="mb-16" onClick={handleOpenModal}>
            <div className="glass-button cursor-pointer inline-flex items-center px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full transform hover:scale-105 transition-all duration-300">
              <div className="glass-surface relative">
                <div className="glass-highlight"></div>
                <span className="relative font-outfit font-medium text-white text-lg sm:text-xl lg:text-2xl tracking-[0] leading-normal antialiased">
                  Registrati adesso
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Buttons - Fixed positioned */}
        
        {/* CTA desktop - top right */}
        <div className="hidden md:block fixed top-4 right-4 lg:top-6 lg:right-8 z-50" onClick={handleOpenModal}>
          <div className="glow-button flex items-center justify-center gap-2 group cursor-pointer px-6 py-3 rounded-full" style={{ background: 'rgba(144, 29, 107, 0.3)' }}>
            <span className="font-outfit font-medium group-hover:font-semibold text-white text-lg tracking-[0] leading-[normal] antialiased">
              Registrati ora
            </span>
            <svg className="w-4 h-3 fill-white opacity-90 mt-0.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.707 6.707a1 1 0 0 0 0-1.414L10.343.929A1 1 0 0 0 8.929 2.343L12.586 6 8.929 9.657a1 1 0 1 0 1.414 1.414l4.364-4.364zM0 7h15V5H0v2z"/>
            </svg>
          </div>
        </div>
        
        {/* CTA mobile - sticky bottom */}
        <div className="md:hidden fixed bottom-safe-bottom inset-x-0 p-4 z-50" onClick={handleOpenModal}>
          <div className="glow-button w-full flex items-center justify-center gap-2 group cursor-pointer py-4 rounded-full" style={{ background: 'rgba(144, 29, 107, 0.8)' }}>
            <span className="font-outfit font-medium text-white text-lg tracking-[0] leading-[normal] antialiased">
              Registrati ora
            </span>
            <svg className="w-4 h-3 fill-white opacity-90 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.707 6.707a1 1 0 0 0 0-1.414L10.343.929A1 1 0 0 0 8.929 2.343L12.586 6 8.929 9.657a1 1 0 1 0 1.414 1.414l4.364-4.364zM0 7h15V5H0v2z"/>
            </svg>
          </div>
        </div>

        {/* Feature Badges Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {featureBadges.map((badge, index) => (
              <div 
                key={index}
                className="flex items-center justify-center fade-in transform hover:scale-105 transition-all duration-300"
              >
                <img
                  ref={el => badgeRefs.current[index] = el}
                  className="h-16 sm:h-20 lg:h-24 object-contain"
                  alt={badge.alt}
                  src={badge.src}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Feature Cards Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Disconnection Card */}
            <Card className="bg-white rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 sm:p-8 lg:p-12 relative h-96 sm:h-[400px] lg:h-[500px]">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    ref={disconnessioneSvgRef}
                    className="w-64 sm:w-80 lg:w-96 h-auto object-contain drop-shadow-lg"
                    style={{ transition: 'transform 0.1s linear', transform: 'rotate(-27.98deg)' }}
                    alt="Illustrazione disconnessione"
                    src="/disconnessione.svg"
                  />
                </div>
                <div className="relative z-10">
                  <h2 className="font-outfit font-medium text-[#901d6b] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6">
                    La connessione si<br />è persa.
                  </h2>
                  <p className="font-outfit font-light text-[#901d6b] text-lg sm:text-xl lg:text-2xl leading-relaxed">
                    Le aziende industriali si trovano a lavorare con strumenti
                    separati, strategie frammentate e processi commerciali lenti e
                    poco coordinati.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Connection Card */}
            <Card className="bg-[#390035] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 sm:p-8 lg:p-12 relative h-96 sm:h-[400px] lg:h-[500px]">
                <div className="absolute top-1/2 right-4 sm:right-8 lg:right-12 transform -translate-y-1/2">
                  <img
                    ref={connessioneSvgRef}
                    className="w-64 sm:w-80 lg:w-96 h-auto object-contain drop-shadow-lg"
                    style={{ transition: 'transform 0.1s linear', transform: 'rotate(-93.23deg) scaleX(-1)' }}
                    alt="Illustrazione connessione"
                    src="/connessione.svg"
                  />
                </div>
                <div className="relative z-10">
                  <h2 className="font-outfit font-medium text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6">
                    È il momento di ritrovarla.
                  </h2>
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl leading-relaxed">
                    Il commerciale diventa finalmente connesso al digitale: un
                    unico ecosistema che integra marketing, vendite e materiali,
                    per trasformare ogni opportunità in contratto.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Feature Cards Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Semplicità Card */}
            <Card className="bg-[#390035] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-0 overflow-hidden relative group h-64 sm:h-80 lg:h-96 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-0 relative h-full">
                <img 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
                  src="/maschera-stratikey.png" 
                  alt="Maschera Stratikey"
                />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-12 lg:left-12 z-10">
                  <h3 className="font-outfit font-medium text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-2 card-title">
                    Semplicità
                  </h3>
                  <p className="font-outfit font-light text-white text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-subtitle">
                    Da processi complessi a<br />un'unica piattaforma<br />intuitiva
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Gestione Card */}
            <Card className="bg-[#390035] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-0 overflow-hidden relative group h-64 sm:h-80 lg:h-96 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-0 relative h-full">
                <div className="absolute inset-0 opacity-100 transition-all duration-500">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Gestione background"
                    src="/immagine-sito.jpg"
                  />
                </div>
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-12 lg:left-12 z-10">
                  <h3 className="font-outfit font-medium text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-2 card-title">
                    Gestione<br />più rapida
                  </h3>
                  <p className="font-outfit font-light text-white text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-subtitle">
                    Meno tempo sprecato,<br />più opportunità colte
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Efficienza Card */}
            <Card className="bg-gradient-to-br from-[#901d6b] to-[#390035] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-0 overflow-hidden relative group h-64 sm:h-80 lg:h-96 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-0 relative h-full">
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-12 lg:left-12 z-10">
                  <h3 className="font-outfit font-medium text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-2 card-title">
                    Efficienza
                  </h3>
                  <p className="font-outfit font-light text-white text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-subtitle">
                    Ogni attività, dal marketing<br />al commerciale, gestite in<br />un solo ecosistema
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Strategy Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-outfit font-medium text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-relaxed bg-gradient-to-r from-[#901d6b] via-[#cf1f96] to-[#390035] bg-clip-text text-transparent">
              Con Stratikey la strategia diventa semplice e concreta. Un'unica visione che unisce marketing e vendite, assicura coerenza tra digitale e fisico e trasforma i dati in decisioni efficaci per far crescere la tua azienda.
            </p>
          </div>
        </section>

        {/* AI Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-outfit font-medium text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 sm:mb-8 bg-gradient-to-r from-white via-[#cd8fbe] to-white bg-clip-text text-transparent">
              Intelligenza Artificiale per l'Industria
            </h2>
            <p className="font-outfit font-light text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed bg-gradient-to-r from-white via-[#cd8fbe] to-white bg-clip-text text-transparent">
              L'intelligenza artificiale di Stratikey è progettata e
              istruita specificamente per il settore industriale: comprende
              dinamiche, tempi e complessità delle vendite B2B, supportando il
              commerciale con suggerimenti mirati, automazioni intelligenti e
              analisi capaci di trasformare i dati in opportunità reali.
            </p>
          </div>
        </section>

        {/* Marketplace Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
            <p className="font-outfit font-normal text-xl sm:text-2xl lg:text-3xl leading-relaxed text-[#390035]">
              <span>Con il nostro marketplace interno puoi acquistare applicativi e</span>
              <br />
              <span>servizi </span><span className="font-semibold text-[#901d6b]">con un solo click</span><span>, senza perdite di tempo e senza</span>
              <br />
              <span>fornitori esterni.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Applicativi Card */}
            <Card className="bg-[#390035] hover:bg-[#901d6b] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-0 transition-colors duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <h3 className="font-outfit font-medium text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 sm:mb-8">
                  Applicativi
                </h3>
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                    Email marketing e automazioni
                  </p>
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                    Live chat e assistenza clienti
                  </p>
                </div>
                <p className="font-outfit font-semibold text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                  Work in progress...
                </p>
              </CardContent>
            </Card>

            {/* Servizi Card */}
            <Card className="bg-[#390035] hover:bg-[#901d6b] rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-0 transition-colors duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <h3 className="font-outfit font-medium text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 sm:mb-8">
                  Servizi
                </h3>
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                    Brand Identity
                  </p>
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                    Sito Web
                  </p>
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                    Foto e video aziendali
                  </p>
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                    Materiale stampato
                  </p>
                  <p className="font-outfit font-light text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                    Contenuti per piani editoriali
                  </p>
                </div>
                <p className="font-outfit font-semibold text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                  Work in progress...
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer Section - Responsive */}
        <footer className="py-16 sm:py-20 lg:py-24 border-t border-[#901d6b]/20">
          <div className="max-w-6xl mx-auto">
            {/* Footer line decoration */}
            <div className="w-full h-px bg-[#901d6b]/30 mb-12"></div>
            
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
              {/* Logo and Tagline */}
              <div className="lg:col-span-1">
                <img
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="h-12 sm:h-14 object-contain mb-6 cursor-pointer"
                  alt="Stratikey logo"
                  src="/stratkey-basso.png"
                />
                <p className="font-outfit font-normal text-[#901d6b] text-lg sm:text-xl leading-relaxed mb-6">
                  La chiave del risultato<br />è la strategia.
                </p>
                <p className="font-outfit font-semibold text-2xl sm:text-3xl leading-tight bg-gradient-to-r from-[#901d6b] to-[#cd8fbe] bg-clip-text text-transparent">
                  Work in progress...
                </p>
              </div>

              {/* Contatti */}
              <div>
                <h3 className="font-outfit font-light text-[#901d6b] text-lg sm:text-xl leading-tight mb-4">
                  Contatti
                </h3>
                <div className="space-y-3">
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    info@stratikey.com
                  </p>
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    351 663 8114
                  </p>
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    P.IVA 02100690474
                  </p>
                </div>
                <div className="mt-8">
                  <h4 className="font-outfit font-light text-[#901d6b] text-lg sm:text-xl leading-tight mb-2">
                    Piattaforma
                  </h4>
                  <button 
                    onClick={handleOpenModal}
                    className="font-outfit font-normal text-[#390035] hover:text-[#901d6b] text-base sm:text-lg leading-tight transition-colors duration-200 bg-transparent border-none p-0 text-left cursor-pointer"
                  >
                    Registrati
                  </button>
                </div>
              </div>

              {/* Servizi */}
              <div>
                <h3 className="font-outfit font-light text-[#901d6b] text-lg sm:text-xl leading-tight mb-4">
                  Servizi
                </h3>
                <div className="space-y-3">
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    Brand Identity
                  </p>
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    Sito Web
                  </p>
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    Foto e video aziendali
                  </p>
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    Materiale stampato
                  </p>
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    Contenuti per piani editoriali
                  </p>
                </div>
              </div>

              {/* Applicativi and Legal */}
              <div>
                <h3 className="font-outfit font-light text-[#901d6b] text-lg sm:text-xl leading-tight mb-4">
                  Applicativi
                </h3>
                <div className="space-y-3 mb-8">
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    Email marketing e automazioni
                  </p>
                  <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                    Live chat e assistenza clienti
                  </p>
                </div>
                <div className="space-y-3">
                  <a 
                    href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/cookie-policy-it" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-outfit font-light text-[#901d6b] hover:text-[#cd8fbe] text-lg sm:text-xl leading-tight transition-colors cursor-pointer block"
                  >
                    Cookie Policy
                  </a>
                  <a 
                    href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-outfit font-light text-[#901d6b] hover:text-[#cd8fbe] text-lg sm:text-xl leading-tight transition-colors cursor-pointer block"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center pt-8 border-t border-[#901d6b]/20">
              <p className="font-outfit font-normal text-[#390035] text-base sm:text-lg leading-tight">
                © 2025 Cobrynet – Tutti i diritti riservati.
              </p>
            </div>
          </div>
        </footer>
      </ContentContainer>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};