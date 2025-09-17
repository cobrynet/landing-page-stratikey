import React from "react";
import { useState, useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";

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


export const LandingPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const disconnessioneSvgRef = useRef<HTMLImageElement>(null);
  const connessioneSvgRef = useRef<HTMLImageElement>(null);
  const badgeRefs = useRef<(HTMLImageElement | null)[]>([]);

  React.useEffect(() => {
    const minAngle = -80;
    const maxAngle = -27.98;

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
    updateRotation(); // inizializza disconnessione
    updateConnessioneRotation(); // inizializza connessione

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);
    handleCloseModal();
  };

  return (
    <div className="bg-white w-full">
      <div className="wrapper">
        <div className="relative w-full min-h-screen bg-white overflow-hidden">
          {/* Hero Section */}
          <section className="hero relative min-h-screen flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg,rgba(57,0,53,1) 0%,rgba(144,29,107,1) 50%,rgba(255,255,255,1) 100%)'
            }}>
            <div className="container">

              <div className="row items-center min-h-screen py-8">
                {/* Left Column - Text Content */}
                <div className="col flex flex-col items-center text-center space-y-8">
                  <img
                    className="w-auto h-12 md:h-16 object-cover"
                    alt="Stratikey alto"
                    src="/stratikey-alto.png"
                  />
                  
                  <h1 className="font-normal text-white text-3xl md:text-5xl lg:text-6xl text-center tracking-[0] leading-tight [font-family:'Outfit',Helvetica]">
                    Il digitale che potenzia
                    <br />
                    il tuo commerciale.
                  </h1>

                  <p className="font-light text-white text-lg md:text-2xl lg:text-3xl text-center tracking-[0] leading-normal [font-family:'Outfit',Helvetica]">
                    La piattaforma che allinea marketing e vendite:
                    <br />
                    trattative più rapide, più contratti chiusi.
                  </p>
                </div>

                {/* Right Column - Macbook Image */}
                <div className="col flex justify-center items-center">
                  <img
                    className="w-full max-w-lg lg:max-w-2xl h-auto object-cover drop-shadow-[0_20px_35px_rgba(205,143,190,0.5)] transition-transform duration-300 hover:scale-110 cursor-pointer"
                    alt="Macbook mockup"
                    src="/macbook-mockup.png"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Feature Badges Section */}
          <section className="relative py-16 bg-white">
            <div className="container">
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {featureBadges.map((badge, index) => (
                  <img
                    key={index}
                    ref={el => badgeRefs.current[index] = el}
                    className="w-auto h-16 md:h-20 lg:h-24 object-contain fade-in"
                    alt={badge.alt}
                    src={badge.src}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Cards Section - Problem & Solution */}
          <section className="py-16 bg-white">
            <div className="container">
              {/* Problem & Solution Cards Row */}
              <div className="row gap-8 mb-16">
                {/* Problem Card */}
                <div className="col">
                  <Card className="bg-white relative min-h-[785px] rounded-[50px] border-0 overflow-hidden">
                    <CardContent className="p-0 relative h-full">
                      <div className="absolute w-full h-[400px] top-[175px] flex justify-center items-center">
                        <img
                          ref={disconnessioneSvgRef}
                          className="w-[329px] h-[480px] object-contain drop-shadow-[0_0_10px_rgba(205,143,190,0.5)]"
                          style={{ transition: 'transform 0.1s linear', transform: 'rotate(-27.98deg)' }}
                          alt="Illustrazione disconnessione"
                          src="/disconnessione.svg"
                        />
                      </div>
                      <div className="absolute top-[51px] left-[59px] right-[59px] [font-family:'Outfit',Helvetica] font-medium text-[#901d6b] text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight">
                        La connessione si
                        <br />è persa.
                      </div>
                      <div className="absolute top-[155px] left-[59px] right-[59px] [font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-lg md:text-xl lg:text-2xl tracking-[0] leading-normal">
                        Le aziende industriali si trovano a lavorare con strumenti
                        separati, strategie frammentate e processi commerciali lenti e
                        poco coordinati.
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Solution Card */}
                <div className="col">
                  <Card className="bg-[#390035] relative min-h-[785px] rounded-[50px] border-0 overflow-hidden">
                    <CardContent className="p-0 relative h-full">
                      <div className="absolute w-full h-[400px] top-[235px] flex justify-center items-center">
                        <img
                          ref={connessioneSvgRef}
                          className="w-[380px] h-[530px] object-contain drop-shadow-[0_0_10px_rgba(205,143,190,0.5)]"
                          style={{ transition: 'transform 0.1s linear', transform: 'rotate(-93.23deg) scaleX(-1)' }}
                          alt="Illustrazione connessione"
                          src="/connessione.svg"
                        />
                      </div>
                      <div className="absolute top-[51px] left-[59px] right-[59px] [font-family:'Outfit',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight">
                        È il momento di ritrovarla.
                      </div>
                      <div className="absolute top-[155px] left-[59px] right-[59px] [font-family:'Outfit',Helvetica] font-light text-white text-lg md:text-xl lg:text-2xl tracking-[0] leading-normal">
                        Il commerciale diventa finalmente connesso al digitale: un
                        unico ecosistema che integra marketing, vendite e materiali,
                        per trasformare ogni opportunità in contratto.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Three Value Cards Section */}
          <section className="py-16 bg-white">
            <div className="container">
              <div className="quadranti w-full h-auto">
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
            </div>
          </section>

          {/* AI Section with Gradient Text */}
          <section className="py-16 bg-white relative">
            <div className="container">
              <div className="text-center max-w-6xl mx-auto space-y-8">
                <div className="bg-[linear-gradient(90deg,#901d6b_0%,#cf1f96_50%,#390035_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-medium text-transparent text-2xl md:text-3xl lg:text-5xl text-center tracking-[0] leading-normal [text-shadow:0_2px_4px_rgba(0,0,0,0.1)] drop-shadow-sm">
                  Con Stratikey la strategia diventa semplice e concreta. Un'unica visione che unisce marketing e vendite, assicura coerenza tra digitale e fisico e trasforma i dati in decisioni efficaci per far crescere la tua azienda.
                </div>

                <div className="bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(205,143,190,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-medium text-transparent text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-normal">
                  Intelligenza Artificiale per l'Industria
                </div>

                <div className="bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(205,143,190,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-light text-transparent text-lg md:text-xl lg:text-3xl tracking-[0] leading-normal">
                  L'intelligenza artificiale di Stratikey è progettata e
                  istruita specificamente per il settore industriale: comprende
                  dinamiche, tempi e complessità delle vendite B2B, supportando il
                  commerciale con suggerimenti mirati, automazioni intelligenti e
                  analisi capaci di trasformare i dati in opportunità reali.
                </div>

                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg md:text-xl lg:text-3xl text-center tracking-[0] leading-normal">
                  <span className="text-[#390035]">Con il nostro marketplace interno puoi acquistare applicativi e</span>
                  <br />
                  <span className="text-[#390035]">servizi </span><span className="font-semibold text-[#901d6b]">con un solo click</span><span className="text-[#390035]">, senza perdite di tempo e senza</span>
                  <br />
                  <span className="text-[#390035]">fornitori esterni.</span>
                </div>
              </div>
              
              {/* Animated elements positioned absolutely within section */}
              <img
                className="absolute w-[300px] md:w-[400px] lg:w-[480px] h-auto top-[200px] right-[10%] animate-fade-through"
                alt="Luce"
                src="/luce.svg"
              />

              <div className="absolute w-[350px] md:w-[450px] lg:w-[551px] h-auto top-[180px] right-[8%] rotate-[-3.12deg]">
                <div className="relative w-full aspect-square">
                  {ellipseImages.map((ellipse, index) => (
                    <img
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full object-contain ${
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
          </section>

          {/* Marketplace Cards Section */}
          <section className="py-16 bg-white">
            <div className="container">
              <div className="row gap-8">
                <div className="col">
                  <Card className="bg-[#390035] hover:bg-[#901d6b] transition-colors duration-300 relative min-h-[472px] rounded-[50px] border-0">
                    <CardContent className="p-0 relative h-full">
                      <div className="absolute top-[50px] left-[59px] [font-family:'Outfit',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight">
                        Applicativi
                      </div>
                      <div className="absolute top-[124px] left-[59px] right-[59px] font-light text-white text-xl md:text-2xl lg:text-3xl leading-normal [font-family:'Outfit',Helvetica] tracking-[0]">
                        Email marketing e automazioni
                        <br />
                        Live chat e assistenza clienti
                      </div>
                      <div className="absolute bottom-[50px] left-[59px] right-[59px] [font-family:'Outfit',Helvetica] font-semibold text-white text-lg md:text-xl lg:text-2xl tracking-[0] leading-normal">
                        Work in progress...
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="col">
                  <Card className="bg-[#390035] hover:bg-[#901d6b] transition-colors duration-300 relative min-h-[472px] rounded-[50px] border-0">
                    <CardContent className="p-0 relative h-full">
                      <div className="absolute top-[50px] left-[59px] [font-family:'Outfit',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight">
                        Servizi
                      </div>
                      <div className="absolute top-[124px] left-[59px] right-[59px] [font-family:'Outfit',Helvetica] font-light text-white text-xl md:text-2xl lg:text-3xl tracking-[0] leading-normal">
                        Brand Identity
                        <br />
                        Sito Web
                        <br />
                        Foto e video aziendali
                        <br />
                        Materiale stampato
                        <br />
                        Contenuti per piani editoriali
                      </div>
                      <div className="absolute bottom-[50px] left-[59px] right-[59px] text-white [font-family:'Outfit',Helvetica] font-semibold text-lg md:text-xl lg:text-2xl tracking-[0] leading-normal">
                        Work in progress...
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <section className="py-16 bg-white">
            <div className="container">
              <div className="w-full h-px bg-gradient-to-r from-[#901d6b] to-[#cd8fbe] mb-8"></div>
              
              <div className="flex flex-wrap gap-8 lg:gap-16 mb-16">
                {/* Prima colonna: Logo e tagline */}
                <div className="flex flex-col min-w-[280px] flex-1">
                  <img
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-[243px] h-[57px] mb-4 object-cover cursor-pointer"
                    alt="Stratkey basso"
                    src="/stratkey-basso.png"
                  />
                  <div className="[font-family:'Outfit',Helvetica] font-normal text-[#901d6b] text-xl tracking-[0] leading-[24px] mb-6">
                    <div className="mt-6">
                      La chiave del risultato<br />è la strategia.
                    </div>
                  </div>
                  <div className="bg-[linear-gradient(90deg,rgba(144,29,107,1)_0%,rgba(205,143,190,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-semibold text-transparent text-2xl tracking-[0] leading-normal mt-8">
                    Work in progress...
                  </div>
                </div>

                {/* Seconda colonna: Contatti */}
                <div className="min-w-[200px] flex-1">
                  <h3 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-xl tracking-[0] leading-[20px] mb-4">
                    Contatti
                  </h3>
                  <div className="space-y-3">
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      info@stratikey.com
                    </div>
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      351 663 8114
                    </div>
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      P.IVA 02100690474
                    </div>
                  </div>
                  <div className="mt-8">
                    <h4 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-xl tracking-[0] leading-[20px] mb-2">
                      Piattaforma
                    </h4>
                    <button 
                      onClick={handleOpenModal}
                      className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px] cursor-pointer hover:text-[#901d6b] transition-colors duration-200 bg-transparent border-none p-0 text-left"
                    >
                      Registrati
                    </button>
                  </div>
                </div>

                {/* Terza colonna: Servizi */}
                <div className="min-w-[200px] flex-1">
                  <h3 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-xl tracking-[0] leading-[20px] mb-4">
                    Servizi
                  </h3>
                  <div className="space-y-3">
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      Brand Identity
                    </div>
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      Sito Web
                    </div>
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      Foto e video aziendali
                    </div>
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      Materiale stampato
                    </div>
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      Contenuti per piani editoriali
                    </div>
                  </div>
                </div>

                {/* Quarta colonna: Applicativi */}
                <div className="min-w-[200px] flex-1">
                  <h3 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-xl tracking-[0] leading-[20px] mb-4">
                    Applicativi
                  </h3>
                  <div className="space-y-3">
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      Email marketing e automazioni
                    </div>
                    <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                      Live chat e assistenza clienti
                    </div>
                  </div>
                  <div className="mt-12 space-y-3">
                    <a 
                      href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/cookie-policy-it" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-xl tracking-[0] leading-[20px] hover:text-[#cd8fbe] transition-colors cursor-pointer block"
                    >
                      Cookie Policy
                    </a>
                    <a 
                      href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-xl tracking-[0] leading-[20px] hover:text-[#cd8fbe] transition-colors cursor-pointer block"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center">
                <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                  © 2025 Cobrynet – Tutti i diritti riservati.
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Pulsante Registrati ora - FISSO al viewport */}
      <div className="fixed w-[246px] h-[50px] top-[82px] left-1/2 fixed-button-responsive z-[100]" onClick={handleOpenModal}>
        <div className="glow-button flex items-center justify-center gap-2 group cursor-pointer" style={{ background: 'rgba(144, 29, 107, 0.3)' }}>
            <span className="[font-family:'Outfit',Helvetica] font-medium group-hover:font-semibold text-white text-xl tracking-[0] leading-[normal] antialiased">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
          <div className="bg-gradient-to-b from-purple-900/90 to-purple-800/90 backdrop-blur-sm rounded-3xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative border border-purple-600/30">
            {/* Pulsante chiudi X */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              type="button"
            >
              ×
            </button>
            
            {/* Logo */}
            <div className="flex justify-center pt-8 pb-4">
              <img
                src="/stratikey-alto.png"
                alt="Stratikey"
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Contenuto del modal */}
            <div className="px-8 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-2 text-center">
                Registrati alla lista di attesa!
              </h2>
              
              <p className="text-purple-200 text-center mb-6 text-sm">
                Lascia i tuoi dati per ricevere l'ingresso in anteprima
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome e Cognome */}
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Nome e Cognome"
                  />
                </div>

                {/* Azienda */}
                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Azienda"
                  />
                </div>

                {/* Telefono */}
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Telefono"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Email"
                  />
                </div>

                {/* Checkbox Termini */}
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="h-4 w-4 text-pink-400 focus:ring-pink-400 border-white/30 rounded bg-white/10"
                  />
                  <label htmlFor="terms" className="text-sm text-purple-200">
                    Accetto{' '}
                    <a
                      href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 underline"
                    >
                      Termini e Condizioni
                    </a>
                  </label>
                </div>

                {/* Pulsante Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 px-8 rounded-full hover:from-pink-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all duration-200 font-medium text-lg"
                  >
                    ACCEDI
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};