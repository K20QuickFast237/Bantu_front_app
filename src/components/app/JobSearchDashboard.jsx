import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// NOTE: Ensure react-router-dom is available in your environment for Link to work
import { Link } from 'react-router-dom';

const JobSearchDashboard = ({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
  selectedContract,
  setSelectedContract,
  selectedEducation,
  setSelectedEducation
}) => {
  const [contractOpen, setContractOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);

  // Options pour dropdowns (ajuste selon tes besoins)
  const contractOptions = ['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance'];
  const educationOptions = ['Bac', 'Bac+2', 'Bac+3', 'Bac+5', 'Doctorat'];

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="bg-[#FFF3EB] pb-12 pt-3 px-4 md:px-10 font-sans relative">
          
          {/* Animated Back Arrow (Blue, No Background, with line/trait) */}
          <Link 
              to={"/CandidatProfil"} 
              className="absolute top-4 left-4 md:left-10 z-10"
              aria-label="Retour au profil candidat"
          >
              <motion.div
                  className="p-2 cursor-pointer transition-colors"
                  whileHover={{ scale: 1.2, x: -5 }} 
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                  <ArrowLeft className="w-8 h-8 text-blue-600 font-extrabold drop-shadow-md" />
              </motion.div>
          </Link>
          
          {/* Title */}
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 pt-8">
            Trouvez une offre d'emploi
          </h2>

          {/* First Row - Search Bar */}
          <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto shadow-md rounded-t-xl overflow-hidden">
            <div className="flex items-center flex-1 min-w-[250px] border-r border-gray-200 bg-white px-4 py-3">
              <Search className="text-gray-400 w-5 h-5 mr-2" />
              <motion.input
                type="text"
                placeholder="Recherchez par titre, compétences, mots clés,…"
                className="w-full outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            </div>
            <div className="flex items-center flex-1 min-w-[250px] border-r border-gray-200 bg-white px-4 py-3">
              <MapPin className="text-gray-400 w-5 h-5 mr-2" />
              <motion.input
                type="text"
                placeholder="choisir le pays ou la ville"
                className="w-full outline-none text-sm"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            </div>
            <button className="bg-[#F97316] text-white px-6 py-3 text-sm font-semibold min-w-[180px] hover:bg-[#E06714] transition-colors">
              Rechercher des profils
            </button>
          </div>

          {/* Second Row - Filters */}
          <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto shadow-md rounded-b-xl overflow-hidden border-t border-gray-200">
            {/* Type de contrat Dropdown */}
            <motion.div
              className="flex items-center justify-between flex-1 max-w-[40.8%] bg-white px-4 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors relative"
              onClick={() => setContractOpen(!contractOpen)}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring" }}
            >
              <span className="text-sm">
                {selectedContract || 'Type de contrat'}
              </span>
              <ChevronDown className={`text-gray-500 w-4 h-4 transition-transform ${contractOpen ? 'rotate-180' : ''}`} />
              <AnimatePresence>
                {contractOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10 mt-1"
                  >
                    {contractOptions.map((option) => (
                      <motion.li
                        key={option}
                        onClick={() => {
                          setSelectedContract(option);
                          setContractOpen(false);
                        }}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring" }}
                      >
                        {option}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Niveau d'étude Dropdown */}
            <motion.div
              className="flex items-center justify-between flex-1 min-w-[250px] bg-white px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors relative"
              onClick={() => setEducationOpen(!educationOpen)}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring" }}
            >
              <span className="text-sm">
                {selectedEducation || 'Niveau d\'étude'}
              </span>
              <ChevronDown className={`text-gray-500 w-4 h-4 transition-transform ${educationOpen ? 'rotate-180' : ''}`} />
              <AnimatePresence>
                {educationOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10 mt-1"
                  >
                    {educationOptions.map((option) => (
                      <motion.li
                        key={option}
                        onClick={() => {
                          setSelectedEducation(option);
                          setEducationOpen(false);
                        }}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring" }}
                      >
                        {option}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default JobSearchDashboard;