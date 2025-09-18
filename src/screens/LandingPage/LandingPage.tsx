import React from "react";
import { useState } from "react";

export const LandingPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
    
    // Mostra immediatamente il messaggio richiesto
    setSuccessMessage('Grazie per esserti registrato alla lista di attesa! ti verrà inviata un email per confermare che la registrazione è andata a buon fine!');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);
    
    try {
      // Invia i dati all'API per l'invio email
      const response = await fetch('/api/send-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          acceptTerms: true
        })
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        console.error('Error sending registration:', result.message);
        // Mantiene il messaggio di successo anche se l'API fallisce
      }
      
    } catch (error) {
      console.error('Error during registration:', error);
      // Mantiene il messaggio di successo anche se c'è un errore di rete
    } finally {
      setIsSubmitting(false);
      
      // Chiude il modal dopo 3 secondi
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#2B0932] via-[#5C1E66] to-[#7A2B83] section-y">
        <div className="container">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 md:mb-16">
            <img src="/stratikey-alto.png" alt="Stratikey" className="h-8 md:h-12" />
            <button 
              onClick={handleOpenModal}
              className="inline-flex items-center rounded-full bg-white/10 text-white px-4 py-2 md:px-6 md:py-3 hover:bg-white/20 transition text-sm md:text-base"
            >
              Registrati ora →
            </button>
          </div>
          
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-white font-extrabold fluid-h1 mb-6">
                Il digitale che potenzia<br />
                il tuo commerciale.
              </h1>
              <p className="text-white/80 fluid-lead mb-8">
                La piattaforma che allinea marketing e vendite: trattative più rapide, più contratti chiusi.
              </p>
              <button 
                onClick={handleOpenModal}
                className="inline-flex items-center rounded-full bg-white text-[#390035] font-semibold px-6 py-3 md:px-8 md:py-4 hover:bg-white/90 transition"
              >
                Inizia ora
              </button>
            </div>
            
            <div className="relative">
              <img
                className="w-full max-w-2xl mx-auto h-auto drop-shadow-[0_20px_35px_rgba(205,143,190,0.5)] transition-transform duration-300 hover:scale-105"
                alt="Macbook mockup"
                src="/macbook-mockup.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Registrati alla Lista d'Attesa
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                {/* Nome */}
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Nome e Cognome"
                  />
                </div>

                {/* Azienda */}
                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Azienda"
                  />
                </div>

                {/* Telefono */}
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Telefono"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Email"
                  />
                </div>

                {/* Checkbox Termini */}
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="h-4 w-4 text-pink-400 focus:ring-pink-400 border-white/30 rounded bg-white/10"
                  />
                  <label htmlFor="terms" className="text-sm text-purple-200">
                    Accetto{' '}
                    <a
                      href="https://app.legalblink.it/api/documents/67d49eda117e0a002358d716/privacy-policy-per-siti-web-o-e-commerce-it"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 underline"
                    >
                      Termini e Condizioni
                    </a>
                  </label>
                </div>

                {/* Pulsante Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 px-8 rounded-full hover:from-pink-700 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all duration-200 font-medium text-lg"
                  >
                    {isSubmitting ? 'Invio in corso...' : 'Registrati alla lista d\'attesa'}
                  </button>
                </div>

                {/* Messaggio di successo */}
                {successMessage && (
                  <div className="mt-6 p-4 bg-green-600/20 border border-green-400/30 rounded-xl">
                    <p className="text-green-200 text-center text-sm">{successMessage}</p>
                  </div>
                )}
              </div>
            </form>

            {/* Pulsante Chiudi */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-purple-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};