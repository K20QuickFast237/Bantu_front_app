import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/app/Header';
import Footer from '../../components/public/Footer';
import PageWrapper from '../../components/public/PageWrapper';
import { useTranslation } from 'react-i18next';

const ForgotPasswordConfirmation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const userEmail = location.state?.email;
   
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
                {t('forgotPasswordConfirmation.title')}
              </h2>

              {/* Message d'information */}
              <p className="text-gray-800 text-sm leading-relaxed">
                {t('forgotPasswordConfirmation.infoMessage')}
                <span className="font-semibold">{userEmail}</span> <br />
                {t('forgotPasswordConfirmation.forReset')}
              </p>

              <hr className="border-t border-gray-300" />

              {/* Bouton retour */}
              <div className="flex justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-[#F26C21] hover:bg-orange-600 text-white font-semibold py-2.5 px-8 rounded-md transition-colors duration-300"
                >
                  {t('forgotPasswordConfirmation.backToHome')}
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