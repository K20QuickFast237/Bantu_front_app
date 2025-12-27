import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'; // Icônes mises à jour
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout
import ReginaMilesImage from '../../assets/temoigne.png'; // Gardé pour l'exemple
import Tem1 from '../../assets/tem1.png';
import Tem2 from '../../assets/tem2.png';
import Tem3 from '../../assets/tem3.png';
import PhoneImage from '../../assets/telephone2.png';
import appleIcon from '../../assets/appleIcon.svg';
import googleIcon from '../../assets/googleIcon.svg';

const TestimonialsSection = () => {
  const { t } = useTranslation(); // Ajout
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: t('testimonials.quote1'),
      name: t('testimonials.name1'),
      role: t('testimonials.role1'),
      rating: 4,
      image: ReginaMilesImage,
    },
    {
      id: 2,
      quote: t('testimonials.quote2'),
      name: t('testimonials.name2'),
      role: t('testimonials.role2'),
      rating: 5,
      image: Tem1,
    },
    {
      id: 3,
      quote: t('testimonials.quote3'),
      name: t('testimonials.name3'),
      role: t('testimonials.role3'),
      rating: 4,
      image: Tem2,
    },
    {
      id: 4,
      quote: t('testimonials.quote4'),
      name: t('testimonials.name5'), // Correction: name4 -> name4 (erreur dans original ?)
      role: t('testimonials.role4'),
      rating: 5,
      image: Tem3,
    },
    {
      id: 5,
      quote: t('testimonials.quote5'),
      name: t('testimonials.name5'),
      role: t('testimonials.role5'),
      rating: 4,
      image: Tem1,
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">

          {/* <img src={GraffittiRedIcon} alt="Decorative lines" className="h-17 w-16 mt-[-40px] ml-90" /> */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center md:text-left leading-tight md:max-w-lg mb-8 md:mb-0"
                dangerouslySetInnerHTML={{ __html: t('testimonials.title') }} // Pour gérer les <br/>
              />
              <div className="flex space-x-4">
                <motion.button
                  className="p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                  onClick={handlePrev}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                  onClick={handleNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {visibleTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    className="bg-gray-50 rounded-xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[240px] sm:min-h-[280px] border border-gray-100"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="mb-6">
                      <span className="text-6xl text-blue-600 font-serif leading-none block relative -top-4 -left-2">“</span>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-blue-200 flex-shrink-0">
                          <img src={ReginaMilesImage} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex justify-center md:justify-start">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="bg-blue-600 py-13 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500 rounded-full opacity-30 blur-xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-700 rounded-full opacity-30 blur-xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-pink-400 rounded-full opacity-40 blur-lg"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-purple-400 rounded-full opacity-40 blur-lg"></div>

          <motion.div
            className="relative z-10 flex flex-col items-center text-white text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h3 className="text-3xl sm:text-3xl font-medium mb-4"
              dangerouslySetInnerHTML={{ __html: t('testimonials.appPreview.title') }} // Pour <br/>
            >
            </h3>
            <p className="text-lg mb-10 max-w-2xl">
              {t('testimonials.appPreview.description')}
            </p>
            {/* Conteneur principal pour l'image et les boutons */}
            <motion.div
              className="relative w-full max-w-4xl flex flex-col items-center gap-6 sm:gap-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Image du téléphone (au-dessus des boutons) */}
              <div className="relative z-10 flex-shrink-0">
                <img
                  src={PhoneImage}
                  alt="SuperApp mobile interface"
                  className="w-full max-w-[200px] sm:max-w-[260px] h-auto transform transition-transform hover:scale-105"
                />
              </div>

              {/* Boutons App Store et Play Store sous l'image */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center">
                <a href="#" className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-800 transition-transform transform hover:scale-105 w-full sm:w-auto justify-center">
                  <img src={appleIcon} alt="Apple logo" className="h-7 w-7 text-white" />
                  <div className="text-left">
                    <span className="text-xs block leading-tight">Télécharger sur</span>
                    <span className="text-lg font-semibold block leading-tight">l'App Store</span>
                  </div>
                </a>

                <a href="#" className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-800 transition-transform transform hover:scale-105 w-full sm:w-auto justify-center">
                  <img src={googleIcon} alt="Google Play logo" className="h-7 w-7" />
                  <div className="text-left">
                    <span className="text-xs block leading-tight">DISPONIBLE SUR</span>
                    <span className="text-lg font-semibold block leading-tight">Google Play</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </motion.section>
    </>
  );
};

export default TestimonialsSection;