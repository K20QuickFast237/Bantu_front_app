import React, { useEffect } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../../components/app/Header';
import Footer from '../../components/public/Footer';

const DashboardEntreprise = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const cardHover = {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300 }
  };

  return (
    <>
      <Header />
      <div className="font-sans relative overflow-hidden">
        {/* Hero Section */}
        <div className="bg-[#FFF3EB] px-4 sm:px-8 pb-32 pt-20 relative">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[#1D4ED8] text-2xl md:text-3xl font-bold">ATOM TECH</h1>
            <p className="text-sm md:text-base font-semibold mt-1">
              Nous avons les talents dont vous avez besoin : ils sont ici !
            </p>
          </motion.div>

          {/* Floating animated elements */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-[#F97316] rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-24 relative z-10">
          {/* Search Section */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="shadow-xl rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/90"
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-stretch">
              <div className="flex items-center flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                <Search className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Recherchez par poste, mots clés,…"
                  className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent"
                />
              </div>
              <div className="flex items-center flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                <MapPin className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Choisir le pays ou la ville"
                  className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#F97316] hover:bg-[#E16214] text-white px-8 py-4 text-sm md:text-base font-semibold flex-shrink-0 transition-all duration-300"
              >
                Rechercher des profils
              </motion.button>
            </motion.div>

            {/* Stats Section */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-200 bg-white">
              {['2 500', '05', '2 500', '2 500'].map((val, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-6 border-r border-gray-200 last:border-none hover:bg-gray-50 transition-all duration-200"
                >
                  <p className="text-2xl md:text-3xl text-center font-bold ">{val}</p>
                  <p className="text-sm md:text-base text-center font-medium text-gray-600 mt-2">
                    {i === 1 ? 'Vos offres créées' : 'Profils pour vous'}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Cards Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16"
          >
            <motion.div
              whileHover={cardHover}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A]/90 text-white p-8 rounded-xl shadow-2xl cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
              <h2 className="text-2xl md:text-3xl font-bold relative z-10">Créez vos offres d'emploi</h2>
              <p className="text-sm md:text-base text-[#F97316] mt-2 relative z-10">Créez vos offres d'emploi</p>
              <div className="flex justify-end mt-6 relative z-10">
                <ArrowRight className="text-[#F97316] w-6 h-6" />
              </div>
            </motion.div>

            <motion.div
              whileHover={cardHover}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A]/90 text-white p-8 rounded-xl shadow-2xl cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
              <h2 className="text-2xl md:text-3xl font-bold relative z-10">Dashboard</h2>
              <p className="text-sm md:text-base text-[#F97316] mt-2 relative z-10">Accédez et gérez vos données</p>
              <div className="flex justify-end mt-6 relative z-10">
                <ArrowRight className="text-[#F97316] w-6 h-6" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DashboardEntreprise;