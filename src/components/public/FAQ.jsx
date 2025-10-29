import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';
import Fleche2Icon from '../../assets/fleche2.png';
import GraffitiRedIcon from '../../assets/Grafitti.png';
import { useTranslation } from 'react-i18next'; // Ajout

const FAQ = () => {
  const { t } = useTranslation(); // Hook i18n
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      question: t('faq.hero.whatIs.question'),
      answer: t('faq.hero.whatIs.answer'),
    },
    {
      question: t('faq.hero.services.question'),
      answer: t('faq.hero.services.answer'),
    },
    {
      question: t('faq.hero.access.question'),
      answer: t('faq.hero.access.answer'),
    },
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
      toast.success(t('faq.newsletter.success'));
      setEmail(''); // Réinitialiser le champ après succès
    } catch (error) {
      const errorMessage = error.response?.data?.message || t('faq.newsletter.error');
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="min-h-screen bg-gray-50 py-16"
    >
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('faq.hero.title')}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12"
        >
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('faq.newsletter.placeholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t('faq.newsletter.button')}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.main>
    </motion.section>
  );
};

export default FAQ;