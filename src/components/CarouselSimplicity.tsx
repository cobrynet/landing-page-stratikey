import React, { useState, useRef, useEffect } from 'react';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  background: string;
  image?: string;
  hasLines?: boolean;
}

const slides: CarouselSlide[] = [
  {
    id: 'semplicita',
    title: 'Semplicità',
    subtitle: 'Da processi complessi a<br />un\'unica piattaforma<br />intuitiva',
    background: '#390035',
    image: '/maschera-stratikey.png'
  },
  {
    id: 'gestione',
    title: 'Gestione<br />più rapida',
    subtitle: 'Meno tempo sprecato,<br />più opportunità colte',
    background: '#390035',
    image: '/immagine-sito.jpg',
    hasLines: true
  },
  {
    id: 'efficienza',
    title: 'Efficienza',
    subtitle: 'Ogni attività, dal marketing<br />al commerciale, gestite in<br />un solo ecosistema',
    background: 'radial-gradient(50% 50% at 50% 21%, rgba(144,29,107,1) 0%, rgba(57,0,53,1) 100%)'
  }
];

export const CarouselSimplicity: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Touch/swipe logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-simplicity">
      <div 
        className="carousel-container"
        ref={carouselRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="carousel-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="carousel-slide"
              style={{
                background: slide.background
              }}
            >
              {/* Background image for Gestione card */}
              {slide.image && slide.id === 'gestione' && (
                <div className="slide-bg-image">
                  <img
                    src={slide.image}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Decorative image for Semplicita card */}
              {slide.image && slide.id === 'semplicita' && (
                <img
                  src={slide.image}
                  alt="Decorative"
                  className="slide-decorative-image"
                />
              )}

              {/* Dynamic lines for Gestione card */}
              {slide.hasLines && (
                <div className="slide-lines">
                  <div className="line line-1" style={{'--rotation': '45deg'} as React.CSSProperties}></div>
                  <div className="line line-2" style={{'--rotation': '-30deg'} as React.CSSProperties}></div>
                  <div className="line line-3" style={{'--rotation': '60deg'} as React.CSSProperties}></div>
                  <div className="line line-4" style={{'--rotation': '-45deg'} as React.CSSProperties}></div>
                </div>
              )}

              {/* Content */}
              <div className="slide-content">
                <h2 
                  className="slide-title"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <p 
                  className="slide-subtitle"
                  dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};