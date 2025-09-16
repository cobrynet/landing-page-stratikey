import React, { useState, useEffect } from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    acceptTerms: false
  });

  // Lock/unlock body scroll when modal is open/closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-start justify-center z-50 p-1 pt-2">
      <div 
        className="w-[95vw] h-[100vh] p-[2px] shadow-2xl"
        style={{ 
          borderRadius: '25px',
          background: 'linear-gradient(45deg, #cd8fbe, #901d6b)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-20 rounded-full p-1 md:p-2"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div 
          className="relative w-full h-full backdrop-blur-lg bg-[#390035] bg-opacity-90 flex flex-col justify-center px-8 py-6"
          style={{ borderRadius: '23px' }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/SIMBOLO copy.png" 
              alt="Stratikey Logo" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-white text-3xl md:text-4xl font-medium mb-2" style={{ fontFamily: 'Outfit' }}>
              Registrati alla
            </h2>
            <h2 className="text-white text-3xl md:text-4xl font-medium" style={{ fontFamily: 'Outfit' }}>
              lista di attesa!
            </h2>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-8">
            <p className="text-[#cd8fbe] text-base md:text-lg font-light" style={{ fontFamily: 'Outfit' }}>
              Lascia i tuoi dati per ricevere l'ingresso in anteprima
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              
              {/* Name Input */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-12 px-4 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                style={{ fontFamily: 'Outfit', fontWeight: '300' }}
                placeholder="Nome e Cognome"
                required
              />

              {/* Company Input */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full h-12 px-4 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                style={{ fontFamily: 'Outfit', fontWeight: '300' }}
                placeholder="Azienda"
                required
              />

              {/* Phone Input */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full h-12 px-4 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                style={{ fontFamily: 'Outfit', fontWeight: '300' }}
                placeholder="Telefono"
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 px-4 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                style={{ fontFamily: 'Outfit', fontWeight: '300' }}
                placeholder="Email"
                required
              />

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 cursor-pointer"
                  required
                />
                <a
                  href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#cd8fbe] underline hover:text-[#901d6b] transition-colors cursor-pointer text-sm"
                  style={{ fontFamily: 'Outfit', fontWeight: '300' }}
                >
                  Accetta Termini e Condizioni
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 bg-[#901d6b] hover:bg-[#b15197] text-white text-lg font-semibold rounded-full transition-colors"
                style={{ fontFamily: 'Outfit' }}
              >
                ACCEDI
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};