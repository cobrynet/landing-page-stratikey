import React, { useState, useRef } from 'react';

interface CarouselCard {
  title: string;
  description: string;
  className: string;
}

const carouselCards: CarouselCard[] = [
  {
    title: "Semplicità",
    description: "Da processi complessi a un'unica piattaforma intuitiva",
    className: "bg-[#390035]"
  },
  {
    title: "Gestione più rapida", 
    description: "Velocizza ogni processo, dall'acquisizione alla conversione",
    className: "bg-gradient-to-br from-[#390035] to-[#901D6B]"
  },
  {
    title: "Efficienza",
    description: "Massimizza i risultati con il minimo sforzo e tempo",
    className: "bg-[#901D6B]"
  }
];

export const CarouselSimplicity: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentSlide < carouselCards.length - 1) {
        // Swipe left - next slide
        setCurrentSlide(prev => prev + 1);
      } else if (diffX < 0 && currentSlide > 0) {
        // Swipe right - previous slide  
        setCurrentSlide(prev => prev - 1);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="carousel-simplicity-section">
      <div 
        className="carousel-simplicity-container"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="carousel-simplicity-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselCards.map((card, index) => (
            <div 
              key={index}
              className={`carousel-simplicity-card ${card.className}`}
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="carousel-simplicity-indicators">
          {carouselCards.map((_, index) => (
            <button
              key={index}
              className={`carousel-simplicity-indicator ${
                index === currentSlide ? 'active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Vai alla slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};