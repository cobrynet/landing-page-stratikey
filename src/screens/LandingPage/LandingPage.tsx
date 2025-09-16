import { useState } from "react";
import { RegistrationModal } from "../../components/RegistrationModal";

export const LandingPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Main Container */}
      <div className="min-h-screen bg-white relative overflow-x-hidden">
        
        {/* Fixed Registration Button */}
        <div 
          className="fixed left-1/2 transform -translate-x-1/2 z-50"
          style={{ top: "82px" }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#cd8fbe] to-[#901d6b] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Registrati ora
          </button>
        </div>

        {/* Header Section */}
        <div className="relative h-screen flex flex-col justify-center items-center px-4">
          
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
          
          {/* Logo */}
          <div className="relative z-10 mb-8">
            <img 
              src="/SIMBOLO.png" 
              alt="Stratikey Logo" 
              className="h-20 w-auto mx-auto mb-4"
            />
          </div>

          {/* Main Title */}
          <div className="relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-[#901d6b] to-[#cd8fbe] bg-clip-text text-transparent">
                STRATIKEY
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 mb-8">
              La piattaforma B2B per marketing e vendite
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Trasforma il tuo business con la nostra soluzione innovativa per il marketing digitale e la gestione delle vendite.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative z-10 mt-12">
            <img 
              src="/macbook-mockup.png" 
              alt="Stratikey Platform" 
              className="max-w-2xl w-full h-auto mx-auto"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Perché scegliere Stratikey?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="w-16 h-16 bg-gradient-to-r from-[#cd8fbe] to-[#901d6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Attivo H24</h4>
                <p className="text-gray-600">
                  La piattaforma lavora per te 24 ore su 24, automatizzando i processi di marketing e vendita.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="w-16 h-16 bg-gradient-to-r from-[#cd8fbe] to-[#901d6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔗</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Integrazione Completa</h4>
                <p className="text-gray-600">
                  Si integra perfettamente con tutti i tuoi strumenti esistenti per un workflow ottimizzato.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="w-16 h-16 bg-gradient-to-r from-[#cd8fbe] to-[#901d6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💼</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Forza Commerciale</h4>
                <p className="text-gray-600">
                  Potenzia il tuo team commerciale con strumenti avanzati per la gestione dei lead e delle vendite.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-4 bg-gradient-to-r from-[#901d6b] to-[#cd8fbe]">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Pronto a trasformare il tuo business?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Unisciti a centinaia di aziende che hanno già scelto Stratikey per il loro successo.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#901d6b] px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Inizia Subito
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="py-12 px-4 bg-gray-900 text-center">
          <img 
            src="/SIMBOLO.png" 
            alt="Stratikey Logo" 
            className="h-12 w-auto mx-auto mb-4 opacity-80"
          />
          <p className="text-gray-400">
            © 2024 Stratikey. Tutti i diritti riservati.
          </p>
        </div>

      </div>

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};