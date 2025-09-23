import React from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<Element>) => Promise<void>;
  isSubmitting: boolean;
  successMessage: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  successMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[200] p-4">
      <div className="relative w-full max-w-[348px] md:max-w-[448px] max-h-[90vh] overflow-y-auto">
        {/* Modal con gradient viola */}
        <div 
          className="rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 relative"
          style={{
            background: `linear-gradient(135deg, #390035 0%, #901d6b 100%)`
          }}
        >
          {/* Pulsante chiudi X */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200"
            type="button"
          >
            ×
          </button>
          
          {/* Logo simbolo */}
          <div className="flex justify-center pt-6 pb-4 md:pt-8 md:pb-6">
            <img
              src="/simbolo-stratikey.png"
              alt="Stratikey Simbolo"
              className="h-12 md:h-16 w-auto object-contain filter drop-shadow-lg"
            />
          </div>
          
          {/* Contenuto del modal */}
          <div className="px-6 pb-6 md:px-8 md:pb-8">
            {/* Titolo */}
            <div className="text-center mb-4 md:mb-6">
              <h2 
                className="text-white text-2xl md:text-3xl font-medium leading-tight"
                style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
              >
                Registrati alla<br />lista di attesa!
              </h2>
            </div>

            {/* Subtitle */}
            <p 
              className="text-white/90 text-center mb-6 md:mb-8 text-sm leading-relaxed"
              style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
            >
              Lascia i tuoi dati per ricevere l'ingresso in anteprima alla piattaforma
            </p>
            
            {/* Messaggio di successo */}
            {successMessage && (
              <div className="mb-6 p-4 bg-white/15 border border-white/30 rounded-2xl backdrop-blur-sm">
                <p 
                  className="text-white text-center text-sm font-medium"
                  style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
                >
                  {successMessage}
                </p>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Nome e Cognome */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 md:px-6 md:py-4 bg-black/30 border border-white/40 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 backdrop-blur-sm transition-all duration-200"
                  placeholder="Nome e Cognome"
                  style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 md:px-6 md:py-4 bg-black/30 border border-white/40 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 backdrop-blur-sm transition-all duration-200"
                  placeholder="Email"
                  style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
                />
              </div>

              {/* Azienda */}
              <div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full px-4 py-3 md:px-6 md:py-4 bg-black/30 border border-white/40 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 backdrop-blur-sm transition-all duration-200"
                  placeholder="Azienda"
                  style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
                />
              </div>

              {/* Telefono */}
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 md:px-6 md:py-4 bg-black/30 border border-white/40 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 backdrop-blur-sm transition-all duration-200"
                  placeholder="Telefono (opzionale)"
                  style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
                />
              </div>

              {/* Checkbox Termini */}
              <div className="flex items-start space-x-3 pt-2">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="w-5 h-5 text-white bg-black/20 border-2 border-white/50 rounded focus:ring-white/30 focus:ring-2"
                  />
                </div>
                <label 
                  htmlFor="terms" 
                  className="text-sm text-white/90 leading-relaxed"
                  style={{ fontFamily: 'Outfit, Helvetica, sans-serif' }}
                >
                  Accetto i{' '}
                  <a 
                    href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white underline hover:text-white/80 transition-colors duration-200"
                  >
                    termini e le condizioni
                  </a>
                </label>
              </div>

              {/* Pulsante ACCEDI */}
              <div className="pt-4 md:pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 md:py-4 md:px-8 rounded-full font-semibold text-base md:text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ 
                    fontFamily: 'Outfit, Helvetica, sans-serif',
                    background: isSubmitting 
                      ? 'linear-gradient(90deg, #901d6b 0%, #cd8fbe 100%)'
                      : 'linear-gradient(90deg, #901d6b 0%, #cd8fbe 100%)',
                    color: '#ffffff'
                  }}
                >
                  {isSubmitting ? 'INVIO IN CORSO...' : 'ACCEDI'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};