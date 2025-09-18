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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('React form submit - formData:', formData);
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Send registration data to backend API
      const response = await fetch('/api/send-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          acceptTerms: formData.acceptTerms
        })
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitMessage('GRAZIE PER ESSERTI REGISTRATO');
        
        // Clear form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            acceptTerms: false
          });
          onClose();
        }, 2000);
      } else {
        setSubmitMessage(result.message || 'Errore durante la registrazione. Riprova più tardi.');
      }
      
    } catch (error) {
      console.error('Errore invio registrazione:', error);
      setSubmitMessage('Errore durante la registrazione. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
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
          font-family: 'Outfit', Helvetica, sans-serif !important;
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
            className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden pb-6 md:pb-8"
            style={{ 
              borderRadius: '23px',
              backgroundColor: '#390035'
            }}
          >
            {/* Logo/Icon + Text - Responsive */}
            <div className="flex items-center justify-center gap-3 pt-12 md:pt-16 lg:pt-20">
              <img 
                src="/simbolo-stratikey.png" 
                alt="Stratikey Symbol" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
              />
              <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium" style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}>
                stratikey
              </span>
            </div>

            {/* Title - Responsive */}
            <div className="text-center mt-6 md:mt-8 lg:mt-10 px-4">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2 md:mb-4" style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}>
                Registrati alla
              </h2>
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium" style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}>
                lista di attesa!
              </h2>
            </div>

            {/* Subtitle - Responsive */}
            <div className="text-center mt-4 md:mt-6 lg:mt-8 px-4">
              <p className="text-[#cd8fbe] text-sm sm:text-base md:text-lg font-light" style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}>
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
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border border-[#cd8fbe] border-opacity-30 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] placeholder-opacity-70 focus:outline-none focus:border-[#cd8fbe] focus:border-opacity-60 transition-all duration-200"
                    style={{ fontFamily: 'Outfit, Helvetica, sans-serif', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
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
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border border-[#cd8fbe] border-opacity-30 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] placeholder-opacity-70 focus:outline-none focus:border-[#cd8fbe] focus:border-opacity-60 transition-all duration-200"
                    style={{ fontFamily: 'Outfit, Helvetica, sans-serif', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
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
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border border-[#cd8fbe] border-opacity-30 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] placeholder-opacity-70 focus:outline-none focus:border-[#cd8fbe] focus:border-opacity-60 transition-all duration-200"
                    style={{ fontFamily: 'Outfit, Helvetica, sans-serif', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
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
                    className="modal-input w-full h-12 md:h-14 px-4 md:px-6 bg-transparent border border-[#cd8fbe] border-opacity-30 rounded-full text-white text-base md:text-lg placeholder-[#cd8fbe] placeholder-opacity-70 focus:outline-none focus:border-[#cd8fbe] focus:border-opacity-60 transition-all duration-200"
                    style={{ fontFamily: 'Outfit, Helvetica, sans-serif', fontWeight: '300', color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#ffffff' }}
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Terms Checkbox - Responsive */}
                <div className="flex items-center justify-center mb-8 px-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="w-5 h-5 md:w-6 md:h-6 opacity-0 absolute cursor-pointer"
                      required
                    />
                    <div className={`w-5 h-5 md:w-6 md:h-6 border border-[#cd8fbe] border-opacity-50 rounded-sm flex items-center justify-center transition-all duration-200 ${formData.acceptTerms ? 'bg-[#cd8fbe] border-[#cd8fbe]' : 'bg-transparent'}`}>
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
                    className="ml-3 text-[#cd8fbe] text-opacity-80 underline hover:text-[#901d6b] transition-colors cursor-pointer text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'Outfit, Helvetica, sans-serif', fontWeight: '300' }}
                  >
                    Accetto Termini e Condizioni
                  </a>
                </div>

                {/* Status Message */}
                {submitMessage && (
                  <div className={`mb-4 text-center text-sm md:text-base ${submitMessage === 'GRAZIE PER ESSERTI REGISTRATO' ? 'text-green-400' : 'text-red-400'}`} style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}>
                    {submitMessage}
                  </div>
                )}

                {/* Submit Button - Responsive */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.acceptTerms}
                  className="w-full h-12 md:h-14 bg-[#901d6b] hover:bg-[#a8206f] disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-lg md:text-xl font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
                >
                  {isSubmitting ? 'INVIO IN CORSO...' : 'ACCEDI'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};