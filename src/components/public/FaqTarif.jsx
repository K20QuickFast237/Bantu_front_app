import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; 
import FaqImage from '../../assets/faq2.png'; 
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FaqTarif = () => {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t('tarif.faq.paymentMethods.question'),
      answer: t('tarif.faq.paymentMethods.answer')
    },
    {
      question: t('tarif.faq.changePlan.question'),
      answer: t('tarif.faq.changePlan.answer')
    },
    {
      question: t('tarif.faq.freeTrial.question'),
      answer: t('tarif.faq.freeTrial.answer')
    }
    // Retirer la 4ème FAQ qui n'existe pas
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16   px-4 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
          {t('tarif.faq.title')}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start max-w-6xl mx-auto gap-12 lg:gap-16">
        <div className="flex-shrink-0 lg:w-1/2 flex justify-center items-center ">
          <img
            src={FaqImage}
            alt="Personnage avec un point d'interrogation"
            className="w-3/4 md:w-2/3 lg:w-full h-auto object-contain max-w-sm sm:max-w-md lg:max-w-none"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left text-xm font-medium text-gray-800 focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed animate-fadeIn"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </motion.section>
    </section>
  );
};

export default FaqTarif;