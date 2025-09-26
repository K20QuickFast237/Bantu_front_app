import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';

const Dashboard_gestion_offres= () => {
  const navigate = useNavigate(); // Initialisez le hook de navigation
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

  // Fonctions de navigation
  const handleCreateJobClick = () => {
    navigate('/createJob');
  };

  const handleDashboardClick = () => {
    navigate('/dashboardrecruteurprofil');
  };

  return (
    <>
     <HeaderProfil/> 
      <div className="font-sans relative overflow-hidden">
        {/* Hero Section */}
        <div className="bg-[#FFF3EB] px-4 sm:px-8 pb-32 pt-20 relative">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[#10B981] text-2xl md:text-3xl font-bold">Mes offres d'emploi</h1>
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
                  placeholder="Filtrez par status,…"
                  className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent"
                />
              </div>
              <div className="flex items-center flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                <MapPin className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Date xx/xx/xxxx"
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
              {['15', '05', '02', '00'].map((val, i) => (
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
          >
            <div class="p-4 sm:p-6 bg-white shadow-md my-10 rounded-lg w-full mx-auto">
    <div class="flex justify-end mb-4">
        <button class="px-6 py-2 text-white font-medium text-sm rounded-md bg-orange-500 hover:bg-orange-600 transition duration-150 ease-in-out shadow-lg">
            Créer une offre d'emploi
        </button>
    </div>

    <div class="overflow-x-auto border border-gray-300 rounded-lg">
        <table class="table-auto w-full border-collapse">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                        </th>
                    <th scope="col" class="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                        Titre de l'offre
                    </th>
                    <th scope="col" class="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                        Date de creation
                    </th>
                    <th scope="col" class="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                        Adresse
                    </th>
                    <th scope="col" class="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                        Status
                    </th>
                    <th scope="col" class="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                        Candidatures
                    </th>
                    <th scope="col" class="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
                
                <tr class="odd:bg-gray-100 even:bg-white">
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">01</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">Graphic designer</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">25/05/2025</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">Douala</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm">
                        <span class="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span class="text-gray-900">Actif</span>
                    </td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-blue-600 underline cursor-pointer">05 candidatures</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-2">Modifier</a>
                        <a href="#" class="text-blue-600 hover:text-blue-900">Voir</a>
                    </td>
                </tr>

                <tr class="odd:bg-gray-100 even:bg-white">
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">02</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">Data analyste</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">25/05/2025</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">Douala</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm">
                        <span class="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span class="text-gray-900">Actif</span>
                    </td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-blue-600 underline cursor-pointer">10 candidatures</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-2">Modifier</a>
                        <a href="#" class="text-blue-600 hover:text-blue-900">Voir</a>
                    </td>
                </tr>
                
                <tr class="odd:bg-gray-100 even:bg-white">
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">03</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">Développeur web</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">25/05/2025</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">Douala</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm">
                        <span class="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        <span class="text-gray-900">Inactif</span>
                    </td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-500 cursor-default">00 candidatures</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-2">Modifier</a>
                        <a href="#" class="text-blue-600 hover:text-blue-900">Voir</a>
                    </td>
                </tr>
                
                <tr class="odd:bg-gray-100 even:bg-white">
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">04</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">Graphic designer</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">25/05/2025</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">Douala</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm">
                        <span class="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span class="text-gray-900">Actif</span>
                    </td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-blue-600 underline cursor-pointer">01 candidatures</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-2">Modifier</a>
                        <a href="#" class="text-blue-600 hover:text-blue-900">Voir</a>
                    </td>
                </tr>

                <tr class="odd:bg-gray-100 even:bg-white">
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">05</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">Mécanicien</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">25/05/2025</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">Douala</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm">
                        <span class="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        <span class="text-gray-900">Inactif</span>
                    </td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-500 cursor-default">05 candidatures</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-2">Modifier</a>
                        <a href="#" class="text-blue-600 hover:text-blue-900">Voir</a>
                    </td>
                </tr>

                <tr class="odd:bg-gray-100 even:bg-white">
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">06</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">Graphic designer</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">25/05/2025</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">Douala</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm">
                        <span class="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span class="text-gray-900">Actif</span>
                    </td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-blue-600 underline cursor-pointer">05 candidatures</td>
                    <td class="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-2">Modifier</a>
                        <a href="#" class="text-blue-600 hover:text-blue-900">Voir</a>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</div>
 
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard_gestion_offres;