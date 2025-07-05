import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import PageWrapper from '../../components/PageWrapper';

const ForgotPasswordConfirmation = () => {
  const userEmail = "tadzongmbipeabraham@gmail.com"; 
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
            <div className="w-full max-w-2xl space-y-6 text-center">
              {/* Titre */}
              <h2 className="text-[#10B981] font-semibold text-lg md:text-xl">
                Vous avez oublié votre mot de passe
              </h2>

              {/* Message d'information */}
              <p className="text-gray-800 text-sm leading-relaxed">
                Un email va vous être envoyé à l’adresse suivante 
                <span className="font-semibold">{userEmail}</span> <br />
                pour vous permettre de réinitialiser le mot de passe de votre compte.
              </p>

              <hr className="border-t border-gray-300" />

              {/* Bouton retour */}
              <div className="flex justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-[#F26C21] hover:bg-orange-600 text-white font-semibold py-2.5 px-8 rounded-md transition-colors duration-300"
                >
                  Retour à l’accueil
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default ForgotPasswordConfirmation;
