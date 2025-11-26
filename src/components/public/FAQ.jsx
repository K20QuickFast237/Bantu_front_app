import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronDown } from 'lucide-react'; // ChevronDown ajouté
import { toast } from 'sonner';
import api from '../../services/api';
import GraffitiRedIcon from '../../assets/Grafitti.png';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const faqs = [
    { question: t('faq.hero.whatIs.question'), answer: t('faq.hero.whatIs.answer') },
    { question: t('faq.hero.services.question'), answer: t('faq.hero.services.answer') },
    { question: t('faq.hero.access.question'), answer: t('faq.hero.access.answer') },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error(t('faq.newsletter.error'));
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      toast.success(t('faq.form.subscribeSuccess'));
      setEmail(''); // Réinitialiser le champ après succès
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'inscription.";
      toast.error("Erreur d'inscription", {
        description: errorMessage,
      });
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 max-w-[450px] relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('faq.form.title')}
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t('faq.form.subtitle')}
            </motion.p>
            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-row items-center w-full max-w-sm border border-gray-300 rounded-full overflow-hidden p-1 bg-white shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder={t('faq.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow p-2 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent ml-2"
                disabled={isSubmitting}
              />
              <motion.button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none flex items-center justify-center disabled:bg-gray-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('faq.newsletter.button')}
              </motion.button>
            </motion.form>
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
              {t('faq.hero.title')}
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
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 ml-4 text-gray-500 flex-shrink-0" />
                    </motion.div>
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
    </motion.section >
  );
};

export default FAQ;