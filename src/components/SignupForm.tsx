import React, { useState } from 'react';

const SignupForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: "tuaemail@gmail.com",
          subject: "Nuova registrazione",
          text: `Nome: ${name || 'Non specificato'}\nEmail: ${email}`
        })
      });

      const data = await response.json();

      if (data.ok) {
        alert("Registrazione completata con successo!");
        // Reset form
        e.currentTarget.reset();
      } else {
        alert(`Errore nella registrazione: ${data.error}`);
      }
    } catch (error) {
      alert("Errore di connessione. Riprova più tardi.");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        placeholder="Nome" 
        disabled={isLoading}
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        required 
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrazione...' : 'Registrati'}
      </button>
    </form>
  );
};

export default SignupForm;