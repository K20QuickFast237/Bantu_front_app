import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fleche2Icon from '../assets/fleche2.png';
import GraffitiRedIcon from '../assets/Grafitti.png';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "C'est Quoi Bantulink ?",
      answer: "Bantulink est une SuperApp qui combine recrutement et e-commerce, permettant aux utilisateurs de trouver un emploi, recruter, vendre ou acheter en toute simplicité dans une seule plateforme.",
    },
    {
      question: "Quels Sont Les Services Que Vous Proposez ?",
      answer: "Nous proposons BantuHire pour le recrutement (recherche d'emploi, réseautage, certifications) et BantuMarket pour le commerce (boutiques personnalisées, paiements sécurisés, chat avec clients).",
    },
    {
      question: "Comment Y Accéder ?",
      answer: "Vous pouvez accéder à Bantulink via notre application mobile disponible sur iOS et Android, ou via notre site web. Inscrivez-vous avec votre email pour commencer.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
    <motion.main
      className="bg-white py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
        {/* Section de gauche : Question pour Bantulink et formulaire */}
        <motion.div
          className="w-full lg:w-1/2 mb-12 lg:mb-0 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Correction de la position et taille de l'icône GraffitiRedIcon pour la responsivité */}
          <motion.img
            src={GraffitiRedIcon}
            alt="Decorative graffiti lines"
            className="absolute top-[-20px] sm:top-[-30px] lg:top-[-40px] right-4 sm:right-8 md:right-24 lg:right-44 w-12 sm:w-16 h-auto rotate-12"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 12 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          {/* Correction de la taille du titre H2 pour la responsivité */}
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            J'ai Une Question<br />Pour Bantulink
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Si vous avez des questions, nous y répondrons.
          </motion.p>
          <motion.div
            className="flex flex-row items-center w-full max-w-sm border border-gray-300 rounded-full overflow-hidden p-1 bg-white shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="email"
              placeholder="Enter Votre Email"
              className="flex-grow p-2 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <motion.button
              className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              S'inscrire
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Section de droite : Questions/Réponses fréquentes */}
        <motion.div
          className="w-full lg:w-1/2 lg:pl-16"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h3
            className="text-xl font-semibold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Peut-Être Que Votre Question A Reçu <br /> Une Réponse, Vérifiez-La
          </motion.h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="flex flex-col border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(index)}>
                  <p className="text-gray-700 text-lg">{faq.question}</p>
                  <motion.img
                    src={Fleche2Icon}
                    alt="Arrow icon"
                    className="w-6 h-6 ml-4 flex-shrink-0"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      className="text-gray-600 text-base mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
    </motion.section>
  );
};

export default FAQ;