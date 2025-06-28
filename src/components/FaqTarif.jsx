import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; 
import FaqImage from '../assets/faq2.png'; 

const faqs = [
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes de crédit (Visa, MasterCard, American Express), PayPal, et les virements bancaires pour les plans annuels."
  },
  {
    question: "Puis-je changer mon plan à tout moment ?",
    answer: "Oui, vous pouvez mettre à niveau ou rétrograder votre plan à tout moment depuis votre tableau de bord. Les changements de plan prennent effet immédiatement ou à la fin de votre cycle de facturation actuel, selon le cas."
  },
  {
    question: "Y a-t-il un essai gratuit disponible ?",
    answer: "Oui, nous offrons un essai gratuit de 14 jours pour notre plan Pro, vous permettant d'explorer toutes les fonctionnalités avant de vous engager."
  },
  {
    question: "Que se passe-t-il si je j'annule mon abonnement ?",
    answer: "Si vous annulez votre abonnement, votre compte restera actif jusqu'à la fin de la période de facturation en cours. Après cela, votre accès aux fonctionnalités premium sera révoqué, et votre compte passera au plan gratuit."
  }
];

const FaqTarif = () => {
  // État pour gérer quel élément de la FAQ est ouvert
  // Un tableau vide signifie qu'aucun n'est ouvert par défaut
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16   px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Foires Aux Questions
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start max-w-6xl mx-auto gap-12 lg:gap-16">

        {/* Section Image */}
        <div className="flex-shrink-0 lg:w-1/2 flex justify-center items-center ">
          <img
            src={FaqImage}
            alt="Personnage avec un point d'interrogation"
            className="w-3/4 md:w-2/3 lg:w-full h-auto object-contain max-w-sm sm:max-w-md lg:max-w-none"
          />
        </div>

        {/* Section FAQ Accordion */}
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
    </section>
  );
};

export default FaqTarif;