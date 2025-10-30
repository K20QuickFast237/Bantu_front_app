import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

// Icône pour les étoiles
const StarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.25l-6.18 3.25L7 14.14l-5-4.87 8.91-1.01L12 2z" />
  </svg>
);

// Sous-composant pour chaque carte de témoignage
const TestimonialCard = ({ initials, initialBgColor, name, role, reviewText }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-start text-left 
                  shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md h-full">
      <div className="flex items-center mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mr-4 flex-shrink-0"
          style={{ backgroundColor: initialBgColor }}
        >
          {initials}
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-gray-600">
            {role}
          </p>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
        {reviewText}
      </p>

      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useTranslation(); // Hook i18n
  const testimonials = t('help.testimonials.users', { returnObjects: true });

  return (
    <motion.section
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
    <section 
      className="py-16 sm:py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(to right, #E0E7FF 0%, #F5F7FA 50%, #FFF5ED 100%)' 
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {t('help.testimonials.title')}
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          {t('help.testimonials.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initials={testimonial.initials}
              initialBgColor={index === 0 ? '#4A90E2' : index === 1 ? '#F5A623' : '#7ED321'}
              name={testimonial.name}
              role={testimonial.role}
              reviewText={testimonial.review}
            />
          ))}
        </div>
      </div>
    </section>
    </motion.section>
  );
};

export default TestimonialsSection;