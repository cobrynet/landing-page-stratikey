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
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        
        {/* Modal Container */}
        <div 
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{ 
            background: 'linear-gradient(180deg, #390035 0%, #4a1142 30%, #5e1d55 70%, #7a2569 100%)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content */}
          <div className="px-8 py-12">
            
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src="/simbolo-stratikey.png" 
                alt="Stratikey Symbol" 
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Title */}
            <div className="text-center mb-2">
              <h2 
                className="text-white text-3xl font-medium leading-tight"
                style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
              >
                Registrati alla<br />lista di attesa!
              </h2>
            </div>

            {/* Subtitle */}
            <div className="text-center mb-10">
              <p 
                className="text-white text-sm opacity-70"
                style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
              >
                Lascia i tuoi dati per ricevere l'ingresso in anteprima
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nome e Cognome */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-14 px-6 rounded-full text-white text-base placeholder-white placeholder-opacity-60 focus:outline-none transition-all duration-200"
                  style={{ 
                    fontFamily: 'Outfit, Helvetica, sans-serif', 
                    fontWeight: '300',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    WebkitTextFillColor: '#ffffff',
                    caretColor: '#ffffff'
                  }}
                  placeholder="Nome e Cognome"
                  required
                />
              </div>

              {/* Azienda */}
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full h-14 px-6 rounded-full text-white text-base placeholder-white placeholder-opacity-60 focus:outline-none transition-all duration-200"
                  style={{ 
                    fontFamily: 'Outfit, Helvetica, sans-serif', 
                    fontWeight: '300',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    WebkitTextFillColor: '#ffffff',
                    caretColor: '#ffffff'
                  }}
                  placeholder="Azienda"
                  required
                />
              </div>

              {/* Telefono */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full h-14 px-6 rounded-full text-white text-base placeholder-white placeholder-opacity-60 focus:outline-none transition-all duration-200"
                  style={{ 
                    fontFamily: 'Outfit, Helvetica, sans-serif', 
                    fontWeight: '300',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    WebkitTextFillColor: '#ffffff',
                    caretColor: '#ffffff'
                  }}
                  placeholder="Telefono"
                />
              </div>

              {/* Email */}
              <div className="relative mb-8">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-14 px-6 rounded-full text-white text-base placeholder-white placeholder-opacity-60 focus:outline-none transition-all duration-200"
                  style={{ 
                    fontFamily: 'Outfit, Helvetica, sans-serif', 
                    fontWeight: '300',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    WebkitTextFillColor: '#ffffff',
                    caretColor: '#ffffff'
                  }}
                  placeholder="Email"
                  required
                />
              </div>

              {/* Checkbox Terms */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="w-5 h-5 opacity-0 absolute cursor-pointer"
                      required
                    />
                    <div 
                      className={`w-5 h-5 border border-white border-opacity-50 rounded-sm flex items-center justify-center transition-all duration-200 ${
                        formData.acceptTerms ? 'bg-white bg-opacity-20' : 'bg-transparent'
                      }`}
                    >
                      {formData.acceptTerms && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <a
                    href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-white text-sm underline opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ fontFamily: 'Outfit, Helvetica, sans-serif', fontWeight: '300' }}
                  >
                    Accetto Termini e Condizioni
                  </a>
                </div>
              </div>

              {/* Status Message */}
              {submitMessage && (
                <div className={`mb-4 text-center text-sm ${submitMessage === 'GRAZIE PER ESSERTI REGISTRATO' ? 'text-green-400' : 'text-red-400'}`} 
                     style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}>
                  {submitMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.acceptTerms}
                className="w-full h-14 bg-gradient-to-r from-[#b8236b] to-[#8e1d5f] hover:from-[#c02771] hover:to-[#9a1f63] disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-full transition-all duration-200 shadow-lg"
                style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
              >
                {isSubmitting ? 'INVIO IN CORSO...' : 'ACCEDI'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};