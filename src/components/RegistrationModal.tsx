import React, { useState } from 'react';

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
    <>
      <style>{`
        input.modal-input {
          background-color: #390035 !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          color-scheme: dark;
          caret-color: #ffffff;
        }
        input.modal-input:-webkit-autofill,
        input.modal-input:-webkit-autofill:hover,
        input.modal-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0 1000px #390035 inset !important;
          background-color: #390035 !important;
        }
        input.modal-input:-webkit-autofill::first-line {
          -webkit-text-fill-color: #ffffff !important;
        }
        input.modal-input::placeholder {
          color: #cd8fbe !important;
          opacity: 1;
        }
      `}</style>
      
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        
        {/* Modal Container - Responsive */}
        <div 
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[95vh] overflow-y-auto p-[2px] shadow-2xl"
          style={{ 
            borderRadius: '25px',
            background: 'linear-gradient(45deg, #cd8fbe, #901d6b)',
            transform: 'translateY(-25px)'
          }}
        >
          {/* Close Button - Responsive */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-20 rounded-full p-1 md:p-2"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content - Responsive */}
          <div 
            className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] backdrop-blur-lg bg-[#390035] bg-opacity-90 overflow-hidden pb-6 md:pb-8"
            style={{ 
              borderRadius: '23px'
            }}
          >
            {/* Logo/Icon - Responsive */}
            <div className="flex justify-center pt-12 md:pt-16 lg:pt-20">
              <img 
                src="/SIMBOLO copy.png" 
                alt="Stratikey Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain"
              />
            </div>

            {/* Title - Responsive */}
            <div className="text-center mt-6 md:mt-8 lg:mt-10 px-4">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2 md:mb-4" style={{ fontFamily: 'Outfit' }}>
                Registrati alla
              </h2>
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium" style={{ fontFamily: 'Outfit' }}>
                lista di attesa!
              </h2>
            </div>

            {/* Subtitle - Responsive */}
            <div className="text-center mt-4 md:mt-6 lg:mt-8 px-4">
              <p className="text-[#cd8fbe] text-sm sm:text-base md:text-lg font-light" style={{ fontFamily: 'Outfit' }}>
                Lascia i tuoi dati per ricevere l'ingresso in anteprima
              </p>
            </div>

            {/* Form - Responsive */}
            <div className="mt-6 md:mt-8 lg:mt-10 px-4 sm:px-6 md:px-8 lg:px-12">
              <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                
                {/* Name Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                    style={{ fontFamily: 'Outfit', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
                    placeholder="Nome e Cognome"
                    required
                  />
                </div>

                {/* Company Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                    style={{ fontFamily: 'Outfit', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
                    placeholder="Azienda"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="relative mb-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                    style={{ fontFamily: 'Outfit', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
                    placeholder="Telefono"
                  />
                </div>

                {/* Email Input */}
                <div className="relative mb-6">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border-2 border-[#dda6dc] border-opacity-50 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] focus:outline-none focus:border-[#cd8fbe] transition-colors"
                    style={{ fontFamily: 'Outfit', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Terms Checkbox - Responsive */}
                <div className="flex items-start mb-6 px-2">
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="w-5 h-5 md:w-6 md:h-6 opacity-0 absolute cursor-pointer"
                      required
                    />
                    <div className={`w-5 h-5 md:w-6 md:h-6 border-2 border-[#cd8fbe] rounded-md flex items-center justify-center ${formData.acceptTerms ? 'bg-[#cd8fbe]' : 'bg-transparent'}`}>
                      {formData.acceptTerms && (
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <a
                    href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-[#cd8fbe] underline hover:text-[#901d6b] transition-colors cursor-pointer text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'Outfit', fontWeight: '300' }}
                  >
                    Accetta Termini e Condizioni
                  </a>
                </div>

                {/* Submit Button - Responsive */}
                <button
                  type="submit"
                  className="w-full h-12 md:h-14 bg-[#901d6b] hover:bg-[#b15197] text-white text-lg md:text-xl font-semibold rounded-full transition-colors"
                  style={{ fontFamily: 'Outfit' }}
                >
                  ACCEDI
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};