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


export const LandingPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const disconnessioneSvgRef = useRef<HTMLImageElement>(null);
  const connessioneSvgRef = useRef<HTMLImageElement>(null);
  const badgeRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Carousel data
  const carouselSlides = [
    { 
      image: '/carosello-1.svg', 
      alt: 'Semplicità - Da processi complessi a un\'unica piattaforma intuitiva' 
    },
    { 
      image: '/carosello-3.svg', 
      alt: 'Efficenza - Ogni attività, dal marketing al commerciale, gestita in un solo ecosistema' 
    },
    { 
      image: '/carosello-2.svg', 
      alt: 'Gestione più rapida - Meno tempo sprecato, più opportunità colte' 
    }
  ];

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    
    // Prevent vertical scroll during horizontal swipe
    if (touchStart && touchStartY) {
      const diffX = Math.abs(e.targetTouches[0].clientX - touchStart);
      const diffY = Math.abs(e.targetTouches[0].clientY - touchStartY);
      
      if (diffX > diffY) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
    setTouchStartY(null);
  };

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

  // Parallax effect per gli SVG della sezione AI
  React.useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const parallaxFactor = 0.06;
    const scrollHandlers = new Map();
    
    const panel23 = document.getElementById('panel-23');
    const panel24 = document.getElementById('panel-24');
    const el23 = document.getElementById('ia-23');
    const el24 = document.getElementById('ia-24');
    
    const targets = [
      { panel: panel23, el: el23 },
      { panel: panel24, el: el24 },
    ].filter(t => t.panel && t.el);

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const t = targets.find(x => x.panel === entry.target);
        if (!t || !t.panel || !t.el) return;

        if (entry.isIntersecting) {
          const onScroll = () => {
            if (!t.panel || !t.el) return;
            const rect = t.panel.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const progress = (vh / 2 - rect.top) / (vh + rect.height);
            const offsetY = (progress - 0.5) * vh * parallaxFactor;
            t.el.style.transform = `translate3d(0, ${offsetY.toFixed(1)}px, 0)`;
          };
          onScroll();
          scrollHandlers.set(t.panel, onScroll);
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll, { passive: true });
        } else {
          const handler = scrollHandlers.get(t.panel);
          if (handler) {
            window.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
            scrollHandlers.delete(t.panel);
          }
          if (t.el) {
            t.el.style.transform = '';
          }
        }
      });
    }, { threshold: [0, 0.15, 0.5, 1] });

    targets.forEach(t => {
      if (t.panel) {
        io.observe(t.panel);
      }
    });

    return () => {
      scrollHandlers.forEach((handler) => {
        window.removeEventListener('scroll', handler);
        window.removeEventListener('resize', handler);
      });
      scrollHandlers.clear();
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSuccessMessage('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      terms: formData.get('terms') as string
    };
    
    try {
      const response = await fetch('/api/send-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSuccessMessage('GRAZIE PER ESSERTI REGISTRATO! Ti invieremo un\'email di conferma a breve.');
        (e.target as HTMLFormElement).reset();
        
        setTimeout(() => {
          handleCloseModal();
        }, 3000);
      } else {
        setSuccessMessage(result.message || 'Errore durante la registrazione. Riprova più tardi.');
      }
      
    } catch (error) {
      console.error('Errore invio registrazione:', error);
      setSuccessMessage('Errore durante la registrazione. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white grid justify-items-center [align-items:start] w-full">
      {/* DESKTOP VERSION */}
      <div className="responsive-wrapper hidden md:block">
        <div className="responsive-container bg-white overflow-hidden relative">
        <div className="absolute w-[4180px] h-[6775px] top-[-109px] left-[-1226px]">
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
              alt="Stratikey Logo"
              src="/marchio-bianco-stratikey.png"
            />

            <div className="absolute top-[345px] left-[1777px] [font-family:'Outfit',Helvetica] font-normal text-white text-[64px] text-center tracking-[0] leading-[normal]">
              Il digitale che potenzia
              <br />
              il tuo commerciale.
            </div>

            <div className="absolute top-[535px] left-[1758px] [font-family:'Outfit',Helvetica] font-light text-white text-[32px] text-center tracking-[0] leading-[normal]">
              La piattaforma che allinea marketing e vendite:
              <br />
              trattative più rapide, più contratti chiusi.
            </div>

            {/* Pulsante Registrati Ora sotto il testo hero */}
            <div className="absolute top-[690px] left-[1961px] w-[246px] h-[50px]" onClick={handleOpenModal}>
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
                      onClick={handleOpenModal}
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
            <div className="absolute w-[1194px] top-[6750px] left-[1493px] text-center">
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

      {/* MOBILE VERSION */}
      <div className="md:hidden">
        <div className="container-mobile">
          {/* HERO */}
          <section className="hero stack">
            <img className="brand" src="/marchio-bianco-stratikey.png" alt="stratikey" />
            <h1 className="hero__title">Il digitale che potenzia il tuo commerciale</h1>
            <p className="hero__subtitle">La piattaforma che allinea marketing e vendite: trattative più rapide, più contratti chiusi.</p>

            <div onClick={handleOpenModal} className="cta">
              Registrati adesso
              <svg aria-hidden="true" viewBox="0 0 16 12"><path d="M1 6h13M8 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            </div>

            <div className="badges">
              <span className="badge"><i className="fa-solid fa-bolt"></i> Attiva 24h</span>
              <span className="badge"><i className="fa-solid fa-briefcase"></i> Forza commerciale</span>
              <span className="badge"><i className="fa-solid fa-circle-nodes"></i> Integrazione completa</span>
            </div>
          </section>

          {/* CARDS */}
          <section className="stack stack--connection" style={{marginTop:'calc(var(--s6) + 30px)'}}>
            <div className="card card--light card--connection">
              <h2>La connessione si<br />è persa.</h2>
              <p>Le aziende industriali si trovano a lavorare con strumenti separati: il marketing gestisce lead e campagne, le vendite trattano con i clienti, ma manca la sincronizzazione.</p>
            </div>

            <div className="card card--dark card--reconnection">
              <h2>È il momento di<br />ritrovarla.</h2>
              <p>Il commerciale diventa finalmente connesso al digitale: ogni interazione è tracciata, ogni opportunità è ottimizzata, ogni decisione è basata su dati concreti.</p>
            </div>

            <h2 className="text-gradient">Con Stratikey la strategia<br />diventa semplice e concreta.</h2>
            <p className="text-gradient-subtitle">Un'unica visione che unisce marketing e vendite, assicura coerenza tra digitale e fisico e trasforma i dati in decisioni efficaci per far crescere la tua azienda.</p>
          </section>

          {/* CAROUSEL CARDS */}
          <section className="carousel" aria-roledescription="carousel">
            <div className="carousel-viewport">
              <div 
                className="carousel-container" 
                style={{transform: `translateX(-${currentSlide * 100}%)`}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {carouselSlides.map((slide, index) => (
                  <div key={index} className="carousel-slide">
                    <img 
                      src={slide.image} 
                      alt={slide.alt}
                      className="card--carousel"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="carousel-dots">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-current={index === currentSlide ? 'true' : undefined}
                  aria-label={`Vai alla slide ${index + 1}`}
                />
              ))}
            </div>
          </section>

          {/* AI section */}
          <section className="ai">
            <div className="ai__wrap">
              <h2 className="ai__title">Intelligenza Artificiale<br />per l'Industria</h2>
              <p className="ai__text">L'intelligenza artificiale di Stratikey è progettata e istruita specificamente per il settore industriale: comprende dinamiche, tempi e complessità delle vendite B2B, supportando il commerciale con suggerimenti mirati, automazioni intelligenti e analisi capaci di trasformare i dati in opportunità reali.</p>
              
              {/* Pannelli SVG animati */}
              <div className="ia-panels">
                {/* Pannello 1: Group-23.svg (floating) */}
                <div className="ia-panel" id="panel-23">
                  <div className="ia-media">
                    <img
                      id="ia-23"
                      className="ia-float"
                      src="/Group-23.svg"
                      alt="Grafica AI – animazione flottante"
                      width="1200" 
                      height="900"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Pannello 2: Group-24.svg (blink) */}
                <div className="ia-panel" id="panel-24">
                  <div className="ia-media">
                    <img
                      id="ia-24"
                      className="ia-blink"
                      src="/Group-24.svg"
                      alt="Elemento AI a intermittenza"
                      width="1200" 
                      height="900"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DUE CARD FINALI */}
          <section className="stack" style={{marginTop:'var(--s6)'}}>
            <div className="card card--magenta">
              <h2>Applicativi</h2>
              <p>Email marketing e automazioni</p>
              <p>Live chat e assistenza clienti</p>
              <p style={{fontWeight:500, fontSize:'14px', lineHeight:'17px', marginTop:'var(--s3)', opacity:0.9}}>Work in progress…</p>
            </div>

            <div className="card card--dark">
              <h2>Servizi</h2>
              <p>Brand Identity</p>
              <p>Sito Web</p>
              <p>Foto e video aziendali</p>
              <p>Materiale stampato</p>
              <p>Contenuti per piani editoriali</p>
              <p style={{fontWeight:500, fontSize:'14px', lineHeight:'17px', marginTop:'var(--s3)', opacity:0.9}}>Work in progress…</p>
            </div>
          </section>

          {/* FOOTER */}
          <div className="divider"></div>
          <footer className="footer">
            <img className="footer__brand" src="/marchio-bianco-stratikey.png" alt="stratikey" />
            <div className="footer__col-title">Contatti</div>
            <div className="footer__item">info@stratikey.com</div>
            <div className="footer__item">351 663 8114</div>
            <div className="footer__item">P.IVA 02100690474</div>

            <div className="footer__col-title">Servizi</div>
            <div className="footer__item">Brand Identity</div>
            <div className="footer__item">Sito Web</div>
            <div className="footer__item">Foto e video aziendali</div>
            <div className="footer__item">Materiale stampato</div>
            <div className="footer__item">Contenuti per piani editoriali</div>

            <div className="footer__col-title">Piattaforma</div>
            <div className="footer__item">Registrati</div>
            <div className="footer__item">Email marketing e automazioni</div>
            <div className="footer__item">Live chat e assistenza clienti</div>

            <p className="footer__note">© 2025 COBRYNET. Tutti i diritti riservati.</p>
          </footer>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        successMessage={successMessage}
      />

    </div>
  );
};