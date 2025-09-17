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
    <div className="bg-white grid justify-items-center [align-items:start] w-screen">
      <div className="responsive-wrapper">
        <div className="responsive-container bg-white overflow-hidden relative">
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

            <img
              className="absolute w-[246px] h-[57px] top-[184px] left-[1276px] object-cover"
              alt="Stratikey alto"
              src="/stratikey-alto.png"
            />

            <div className="absolute top-[375px] left-[1777px] [font-family:'Outfit',Helvetica] font-normal text-white text-[64px] text-center tracking-[0] leading-[normal]">
              Il digitale che potenzia
              <br />
              il tuo commerciale.
            </div>

            <div className="absolute top-[565px] left-[1758px] [font-family:'Outfit',Helvetica] font-light text-white text-[32px] text-center tracking-[0] leading-[normal]">
              La piattaforma che allinea marketing e vendite:
              <br />
              trattative più rapide, più contratti chiusi.
            </div>




            {featureBadges.map((badge, index) => (
              <img
                key={index}
                ref={el => badgeRefs.current[index] = el}
                className={`absolute ${badge.className} fade-in`}
                alt={badge.alt}
                src={badge.src}
              />
            ))}

            <Card className="left-[1493px] bg-white absolute w-[582px] h-[785px] top-[1842px] rounded-[50px] border-0">
              <CardContent className="p-0">
                <div className="absolute w-[547px] h-[610px] top-[175px] left-[17px]">
                  <div className="absolute top-[74px]">
                    <img
                     ref={disconnessioneSvgRef}
                     className="w-[328.9px] h-[479.54px] object-contain drop-shadow-[0_0_10px_rgba(205,143,190,0.5)]"
                     style={{ transition: 'transform 0.1s linear', transform: 'rotate(-27.98deg)' }}
                      alt="Illustrazione disconnessione"
                      src="/disconnessione.svg"
                    />
                  </div>
                </div>
                <div className="absolute w-[490px] top-[51px] left-[59px] [font-family:'Outfit',Helvetica] font-medium text-[#901d6b] text-5xl tracking-[0] leading-[39.8px]">
                  La connessione si
                  <br />è persa.
                </div>
                <div className="absolute w-[464px] top-[155px] left-[59px] [font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-2xl tracking-[0] leading-[26px]">
                  Le aziende industriali si trovano a lavorare con strumenti
                  separati, strategie frammentate e processi commerciali lenti e
                  poco coordinati.
                </div>
              </CardContent>
            </Card>

            <Card className="left-[2105px] bg-[#390035] absolute w-[582px] h-[785px] top-[1842px] rounded-[50px] border-0">
              <CardContent className="p-0">
                <div className="absolute w-[380px] h-[530px] top-[235px] left-[177px]">
                  <img
                   ref={connessioneSvgRef}
                   className="w-[380px] h-[530px] object-contain drop-shadow-[0_0_10px_rgba(205,143,190,0.5)]"
                    style={{ transition: 'transform 0.1s linear', transform: 'rotate(-93.23deg) scaleX(-1)' }}
                    alt="Illustrazione connessione"
                    src="/connessione.svg"
                  />
                </div>
                <div className="absolute w-[490px] top-[51px] left-[59px] [font-family:'Outfit',Helvetica] font-medium text-white text-5xl tracking-[0] leading-[39.8px]">
                  È il momento di ritrovarla.
                </div>
                <div className="absolute w-[464px] top-[155px] left-[59px] [font-family:'Outfit',Helvetica] font-light text-white text-2xl tracking-[0] leading-[26px]">
                  Il commerciale diventa finalmente connesso al digitale: un
                  unico ecosistema che integra marketing, vendite e materiali,
                  per trasformare ogni opportunità in contratto.
                </div>
              </CardContent>
            </Card>

            <div className="absolute w-[1194px] top-[3912px] left-[1493px] bg-[linear-gradient(90deg,#901d6b_0%,#cf1f96_50%,#390035_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-medium text-transparent text-[48px] text-center tracking-[0] leading-[normal] [text-shadow:0_2px_4px_rgba(0,0,0,0.1)] drop-shadow-sm">
              Con Stratikey la strategia diventa semplice e concreta. Un'unica visione che unisce marketing e vendite, assicura coerenza tra digitale e fisico e trasforma i dati in decisioni efficaci per far crescere la tua azienda.
            </div>

            <div className="absolute w-[1194px] top-[5300px] left-[1493px] [font-family:'Outfit',Helvetica] font-normal text-[#390035] text-[32px] text-center tracking-[0] leading-[normal]">
              <span className="text-[#390035]">Con il nostro marketplace interno puoi acquistare applicativi e</span>
              <br />
              <span className="text-[#390035]">servizi </span><span className="font-semibold text-[#901d6b]">con un solo click</span><span className="text-[#390035]">, senza perdite di tempo e senza</span>
              <br />
              <span className="text-[#390035]">fornitori esterni.</span>
            </div>

            <div className="absolute w-[510px] top-[4463px] left-[1493px] bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(205,143,190,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-medium text-transparent text-5xl tracking-[0] leading-[normal]">
              Intelligenza Artificiale per l&apos;Industria
            </div>

            <div className="absolute w-[510px] top-[4601px] left-[1493px] bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(205,143,190,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-light text-transparent text-[32px] tracking-[0] leading-[normal]">
              L&apos;intelligenza artificiale di Stratikey è progettata e
              istruita specificamente per il settore industriale: comprende
              dinamiche, tempi e complessità delle vendite B2B, supportando il
              commerciale con suggerimenti mirati, automazioni intelligenti e
              analisi capaci di trasformare i dati in opportunità reali.
            </div>

            <Card className="left-[1493px] absolute w-[582px] h-[472px] top-[5513px] bg-[#390035] hover:bg-[#901d6b] transition-colors duration-300 rounded-[50px] border-0">
              <CardContent className="p-0">
                <div className="absolute top-[50px] left-[59px] [font-family:'Outfit',Helvetica] font-medium text-white text-5xl tracking-[0] leading-[39.8px]">
                  Applicativi
                </div>
                <div className="w-[464px] top-[124px] left-[59px] font-light text-white text-[32px] leading-[36.7px] absolute [font-family:'Outfit',Helvetica] tracking-[0]">
                  Email marketing e automazioni
                  <br />
                  Live chat e assistenza clienti
                </div>
                <div className="absolute w-[464px] top-60 left-[59px] [font-family:'Outfit',Helvetica] font-semibold text-white text-[28px] tracking-[0] leading-[40.5px]">
                  Work in progress...
                </div>
              </CardContent>
            </Card>

            <Card className="left-[2105px] absolute w-[582px] h-[472px] top-[5513px] bg-[#390035] hover:bg-[#901d6b] transition-colors duration-300 rounded-[50px] border-0">
              <CardContent className="p-0">
                <div className="absolute top-[50px] left-[59px] [font-family:'Outfit',Helvetica] font-medium text-white text-5xl tracking-[0] leading-[39.8px]">
                  Servizi
                </div>
                <div className="absolute w-[464px] top-[124px] left-[59px] [font-family:'Outfit',Helvetica] font-light text-white text-[32px] tracking-[0] leading-[36.7px]">
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
                <div className="top-[343px] left-[59px] text-white absolute w-[464px] [font-family:'Outfit',Helvetica] font-semibold text-[28px] tracking-[0] leading-[40.5px]">
                  Work in progress...
                </div>
              </CardContent>
            </Card>

            <img
              className="absolute w-[1555px] h-px top-[6294px] left-[1312px] object-cover"
              alt="Linea footer"
              src="/linea-footer.svg"
            />

            {/* Footer Section */}
            <div className="absolute w-[1194px] top-[6350px] left-[1493px]">
              {/* Layout principale del footer */}
              <div className="flex gap-16">
                {/* Prima colonna: Logo e tagline */}
                <div className="flex flex-col min-w-[280px]">
                  <img
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-[243px] h-[57px] mb-4 object-cover"
                    style={{ cursor: 'pointer' }}
                    alt="Stratkey basso"
                    src="/stratkey-basso.png"
                  />
                  <div className="[font-family:'Outfit',Helvetica] font-normal text-[#901d6b] text-xl tracking-[0] leading-[24px] mb-6">
                    <div style={{ marginTop: '23px' }}>
                      La chiave del risultato<br />è la strategia.
                    </div>
                  </div>
                  <div className="bg-[linear-gradient(90deg,rgba(144,29,107,1)_0%,rgba(205,143,190,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-semibold text-transparent text-[28px] tracking-[0] leading-[32px] mt-[43px]">
                  <div className="bg-[linear-gradient(90deg,rgba(144,29,107,1)_0%,rgba(205,143,190,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-semibold text-transparent text-[28px] tracking-[0] leading-[32px] -mt-[4px]">
                    Work in progress...
                  </div>
                </div>
                </div>

                {/* Seconda colonna: Contatti */}
                <div className="min-w-[200px]">
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
                  <div className="mt-16">
                    <h4 className="[font-family:'Outfit',Helvetica] font-light text-[#901d6b] text-xl tracking-[0] leading-[20px] mb-2 -mt-[5px]">
                      Piattaforma
                    </h4>
                    <button 
                      className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px] mt-[8px] cursor-pointer hover:text-[#901d6b] transition-colors duration-200 bg-transparent border-none p-0 text-left"
                    >
                      Registrati
                    </button>
                  </div>
                </div>

                {/* Terza colonna: Servizi */}
                <div className="min-w-[200px]">
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
                <div className="min-w-[200px]">
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
                  <div className="mt-[96px] space-y-3">
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
            </div>

            {/* Copyright */}
            <div className="absolute w-[1194px] top-[6950px] left-[1493px] text-center">
              <div className="[font-family:'Outfit',Helvetica] font-normal text-[#390035] text-lg tracking-[0] leading-[20px]">
                © 2025 Cobrynet – Tutti i diritti riservati.
              </div>
            </div>

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

        </div>
      </div>
      
      {/* Pulsante Registrati ora - FISSO al viewport */}
      <div className="fixed w-[200px] sm:w-[220px] md:w-[240px] lg:w-[246px] h-[44px] sm:h-[48px] md:h-[50px] top-[70px] sm:top-[78px] md:top-[82px] left-1/2 transform -translate-x-1/2 z-[100]" onClick={handleOpenModal}>
        <div className="glow-button flex items-center justify-center gap-2 group cursor-pointer" style={{ background: 'rgba(144, 29, 107, 0.3)' }}>
            <span className="[font-family:'Outfit',Helvetica] font-medium group-hover:font-semibold text-white text-base sm:text-lg md:text-xl tracking-[0] leading-[normal] antialiased">
              Registrati ora
            </span>
            <svg 
              className="w-3 sm:w-3.5 md:w-4 h-2.5 sm:h-2.5 md:h-3 fill-white opacity-90 mt-0.5 transition-transform group-hover:translate-x-0.5" 
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
            {/* Pulsante chiudi X */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              type="button"
            >
              ×
            </button>
            
            {/* Contenuto del modal */}
            <div className="p-6 pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Registrati a Stratikey
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome e Cognome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Inserisci il tuo nome e cognome"
                  />
                </div>

                {/* Azienda */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Azienda *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Nome della tua azienda"
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+39 123 456 7890"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="tua@email.com"
                  />
                </div>

                {/* Checkbox Termini */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Accetto i{' '}
                    <a
                      href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      termini e condizioni
                    </a>
                    {' '}*
                  </label>
                </div>

                {/* Pulsante Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                  >
                    Invia Registrazione
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