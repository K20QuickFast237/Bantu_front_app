import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight, Calendar, Filter, ChevronLeft } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import HeaderProfil from '@/components/app/HeaderProfil';
import Footer from '@/components/public/Footer';
import { useInView } from 'react-intersection-observer';


// Données fictives pour le tableau. Dans une application réelle, ces données proviendraient d'une API.
const candidaturesData = [
    {
        id: 1,
        nom: 'Tamo Jean',
        offre: 'Web design',
        adresse: 'Douala',
        status: 'Candidat',
        prenom: 'Jean',
        email: 'jean.tamo@example.com',
        dateCandidature: '10/09/2025'
    },
    {
        id: 2,
        nom: 'Frank EDIMO',
        offre: 'Web design',
        adresse: 'Douala',
        status: 'Présélectionné',
        prenom: 'Frank',
        email: 'frank.edimo@example.com',
        dateCandidature: '09/09/2025'
    },
    {
        id: 3,
        nom: 'Kevin kevin',
        offre: 'Web design',
        adresse: 'Douala',
        status: 'Entretien',
        prenom: 'Kevin',
        email: 'kevin.kevin@example.com',
        dateCandidature: '08/09/2025'
    },
    {
        id: 4,
        nom: 'Diffo Diffo',
        offre: 'Web design',
        adresse: 'Douala',
        status: 'Embauché',
        prenom: 'Diffo',
        email: 'diffo.diffo@example.com',
        dateCandidature: '07/09/2025'
    },
    {
        id: 5,
        nom: 'Badboy Badboy',
        offre: 'Web design',
        adresse: 'Douala',
        status: 'Rejeté',
        prenom: 'Badboy',
        email: 'badboy.badboy@example.com',
        dateCandidature: '06/09/2025'
    },
    {
        id: 6,
        nom: 'Le codeur',
        offre: 'Web design',
        adresse: 'Douala',
        status: 'Embauché',
        prenom: 'Le',
        email: 'le.codeur@example.com',
        dateCandidature: '05/09/2025'
    },
];

// Fonction pour déterminer la couleur du statut
const getStatusColor = (status) => {
    switch (status) {
        case 'Candidat':
            return 'bg-gray-800';
        case 'Présélectionné':
            return 'bg-blue-600';
        case 'Entretien':
            return 'bg-orange-500';
        case 'Embauché':
            return 'bg-green-600';
        case 'Rejeté':
            return 'bg-red-600';
        default:
            return 'bg-gray-500';
    }
};




const Dashboardcandidature = () => {
    const [candidatures, setCandidatures] = useState(candidaturesData);
    const [view, setView] = useState('list'); // 'list' ou 'detail'
    const [selectedCandidate, setSelectedCandidate] = useState(null);
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

    const handleShowDetails = (candidat) => {
        setSelectedCandidate(candidat);
        setView('detail');
    };

    const handleBackToList = () => {
        setView('list');
        setSelectedCandidate(null);
    };

    const renderListView = () => (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-24 relative z-10">
                {/* Section de filtre - Version étirée */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="shadow-xl rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm mb-6"
                >
                    {/* Labels dans la div rose */}
                    <div className="flex flex-col md:flex-row items-stretch border-b border-gray-200">
                        <div className="flex-1 min-w-0  border-gray-200  py-3">
                            <p className="text-gray-600 font-medium text-sm">Du</p>
                        </div>
                        <div className="flex-1 min-w-0  border-gray-200  py-3">
                            <p className="text-gray-600 font-medium text-sm">Au</p>
                        </div>
                        <div className="flex-1 min-w-0  border-gray-200  py-3">
                            <p className="text-gray-600 font-medium text-sm">Offres</p>
                        </div>
                        <div className="flex-shrink-0 px-6 py-3">
                            <p className="text-gray-600 font-medium text-sm opacity-0">Filtrer</p>
                        </div>
                    </div>

                    {/* Champs dans la div blanche */}
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-stretch">
                        {/* Date de début */}
                        <div className="flex flex-col flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                            <input
                                type="date"
                                className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent"
                                defaultValue="2025-09-25"
                            />
                        </div>
                        
                        {/* Date de fin */}
                        <div className="flex flex-col flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                            <input
                                type="date"
                                className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent"
                                defaultValue="2025-09-25"
                            />
                        </div>
                        
                        {/* Sélection des offres */}
                        <div className="flex flex-col flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                            <div className="relative">
                                <select className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent">
                                    <option>Web designer - 12-09-2025 | Freelance</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Bouton Filtrer */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#F97316] hover:bg-[#E16214] text-white px-8 py-4 text-sm md:text-base font-semibold flex-shrink-0 transition-all duration-300"
                        >
                            Filtrer
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Section des boutons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <button className="w-full sm:w-auto px-6 py-3 text-white font-medium  rounded-md bg-orange-500 hover:bg-orange-600 transition duration-150 ease-in-out shadow-lg">
                        Configurer l'envoi des mails
                    </button>
                    <button className="w-full sm:w-auto px-6 py-3 text-white font-medium  rounded-md bg-[#10B981] hover:bg-green-600 transition duration-150 ease-in-out shadow-lg">
                        Exporter les données
                    </button>
                </motion.div>

                {/* Section du tableau */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="p-4 sm:p-6 bg-white shadow-md my-6 rounded-lg w-full mx-auto"
                >
                    <div className="overflow-x-auto border border-gray-300 rounded-lg">
                        <table className="table-auto w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                                        
                                    </th>
                                    <th scope="col" className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                                        Nom de candidat
                                    </th>
                                    <th scope="col" className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                                        Offre d'emploi
                                    </th>
                                    <th scope="col" className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                                        Adresse
                                    </th>
                                    <th scope="col" className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                                        Statut
                                    </th>
                                    <th scope="col" className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {candidatures.map((candidat, index) => (
                                    <tr key={candidat.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                        <td className="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{candidat.nom}</td>
                                        <td className="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">{candidat.offre}</td>
                                        <td className="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm text-gray-900">{candidat.adresse}</td>
                                        <td className="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-block h-2 w-2 rounded-full ${getStatusColor(candidat.status)} mr-2`}></span>
                                            <span className="text-gray-900">{candidat.status}</span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleShowDetails(candidat); }} className="text-blue-600 hover:text-blue-900">Afficher</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </>
    );

    const renderDetailView = () => (
        <div className="max-w-full mx-auto px-4 sm:px-8 -mt-24 mb-10 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-xl rounded-xl p-6 md:p-8"
            >
                <button
                    onClick={handleBackToList}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
                >
                    <ChevronLeft size={20} className="mr-2" /> Retour
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-200 pb-4">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#10B981]">
                           <span className="text-[#10B981]">{selectedCandidate.offre}</span> | <span className="text-[#10B981]">{selectedCandidate.nom} {selectedCandidate.prenom}</span>
                        </h1>
                        <p className="text-sm text-gray-950 mt-1">
                            Date de candidature : {selectedCandidate.dateCandidature}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold text-sm transition-colors duration-300"
                        >
                            Présélectionner
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold text-sm transition-colors duration-300"
                        >
                            Rejeter
                        </motion.button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Carte des informations personnelles */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="border border-gray-200 rounded-lg p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-800  border-gray-300 pb-2 mb-4">
                            Information personnelles
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <p><strong>Nom :</strong> {selectedCandidate.nom}</p>
                            <p><strong>Prénom :</strong> {selectedCandidate.prenom}</p>
                            <p><strong>Adresse :</strong> {selectedCandidate.adresse}</p>
                            <p><strong>Email :</strong> {selectedCandidate.email}</p>
                        </div>
                    </motion.div>

                    {/* Carte du profil candidat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className=" border border-gray-200 rounded-lg p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 border-gray-300 pb-2 mb-4">
                            Profil candidat (Profil BantuLink)
                        </h3>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <a href="#" className="text-[#10B981] font-bold hover:underline">
                                Voir le profil du candidat
                            </a>
                            <span className="hidden sm:inline">|</span>
                            <a href="#" className="text-[#10B981] font-bold hover:underline">
                                Télécharger le cv BantuLink
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );

    return (
        <>
            <HeaderProfil />
            <div className="font-sans ">
                {/* Section Hero */}
                <div className="bg-[#FFF3EB] px-4 sm:px-8 pb-26 pt-7 ">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[#10B981] text-2xl md:text-3xl font-bold">Candidature</h1>
                    </motion.div>

                    {/* Éléments animés flottants */}
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

                {/* Contenu principal */}
                {view === 'list' ? renderListView() : renderDetailView()}
            </div>
            <Footer />
        </>
    );
};

export default Dashboardcandidature;
