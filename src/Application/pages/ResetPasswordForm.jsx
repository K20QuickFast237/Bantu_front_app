import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import PageWrapper from '../../components/PageWrapper';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Envoi de la nouvelle valeur au backend ici
    console.log('Nouveau mot de passe :', password);
  };

  return (
    <>
      <PageWrapper>
        <Header />

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-2xl space-y-6">
              {/* Titre */}
              <h2 className="text-center text-[#10B981] font-semibold text-lg md:text-xl">
                Réinitialisation du mot de passe
              </h2>

              {/* Texte d'information */}
              <p className="text-center text-gray-800 text-sm">
                Merci de saisir votre nouveau mot de passe, puis de le confirmer.
              </p>

              <hr className="border-t border-gray-300" />

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Nouveau mot de passe */}
                <div className="bg-gray-200 p-2 flex items-center gap-2">
                  <label htmlFor="password" className="text-sm text-gray-800 whitespace-nowrap pl-2">
                    Nouveau mot de passe :
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Confirmation */}
                <div className="bg-gray-200 p-2 flex items-center gap-2">
                  <label htmlFor="confirmPassword" className="text-sm text-gray-800 whitespace-nowrap pl-2">
                    Confirmer le mot de passe :
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Bouton */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#F26C21] hover:bg-orange-600 text-white font-semibold py-2.5 px-8 rounded-md transition-colors duration-300"
                  >
                    Réinitialiser le mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default ResetPasswordForm;
