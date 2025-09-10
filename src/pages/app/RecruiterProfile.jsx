import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  PlusCircle,
  BarChart2,
  Bell,
  Settings,
  User,
  Briefcase,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/public/Footer';

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('general');
  const userData = { nom: 'Kana', prenom: 'Alma', email: 'kanaalma249@gmail.com' };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
    tap: { scale: 0.95 },
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'general', label: 'Général', icon: <Home className="w-5 h-5" /> },
    { id: 'create-offer', label: 'Créer une offre', icon: <PlusCircle className="w-5 h-5" /> },
    { id: 'statistics', label: 'Statistiques', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> },
  ];

  // Sample content for each section
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl p-6 shadow-lg">
              <motion.h2
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Bienvenue, {userData.nom} {userData.prenom}
              </motion.h2>
              <p className="text-gray-200">Gérez vos offres d'emploi et trouvez les meilleurs talents depuis votre tableau de bord.</p>
              <motion.div
                className="mt-4 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-green-400 text-white px-4 py-2 rounded-lg font-semibold"
                  onClick={() => setActiveSection('create-offer')}
                >
                  Nouvelle offre
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-blue-50 text-blue-900 px-4 py-2 rounded-lg font-semibold"
                >
                  Voir les candidats
                </motion.button>
              </motion.div>
            </div>
            {/* Recent Offers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-400" />
                Offres récentes
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Développeur Full-Stack', date: '10 sept. 2025', status: 'active', applications: 8 },
                  { title: 'Designer UX/UI', date: '9 sept. 2025', status: 'pending', applications: 3 },
                ].map((offer, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <p className="font-medium text-gray-800">{offer.title}</p>
                      <p className="text-sm text-gray-500">Publiée le {offer.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          offer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {offer.status === 'active' ? 'Active' : 'En attente'}
                      </span>
                      <span className="text-sm text-gray-600">{offer.applications} candidatures</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'create-offer':
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-green-400" />
                Créer une nouvelle offre
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Titre du poste</label>
                  <motion.input
                    type="text"
                    placeholder="Ex: Développeur React Senior"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Localisation</label>
                  <motion.input
                    type="text"
                    placeholder="Ex: Douala, Cameroun"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-900 mb-2">Description</label>
                  <motion.textarea
                    placeholder="Décrivez les responsabilités et les exigences du poste..."
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900 h-40"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Type de contrat</label>
                  <motion.select
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <option value="">Sélectionner</option>
                    <option value="cdi">CDI</option>
                    <option value="freelance">Freelance</option>
                    <option value="cdd">CDD</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Salaire (optionnel)</label>
                  <motion.input
                    type="text"
                    placeholder="Ex: 40k€ - 50k€"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mt-6 bg-green-400 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Publier l'offre
              </motion.button>
            </div>
          </motion.div>
        );
      case 'statistics':
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-green-400" />
                Statistiques
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Offres publiées', value: 15, color: 'bg-blue-100 text-blue-900' },
                  { label: 'Candidatures reçues', value: 62, color: 'bg-green-100 text-green-600' },
                  { label: 'Vues des offres', value: 1890, color: 'bg-red-100 text-red-600' },
                  { label: 'Taux de réponse', value: '82%', color: 'bg-gray-100 text-gray-600' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg ${stat.color} text-center`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 150 }}
                  >
                    <p className="text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="text-md font-semibold text-blue-900 mb-4">Tendances récentes</h4>
              <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Graphique des candidatures (à venir)</p>
              </div>
            </div>
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-green-400" />
                Notifications
              </h3>
              <div className="space-y-4">
                {[
                  {
                    message: 'Nouvelle candidature pour Développeur Full-Stack',
                    time: 'Il y a 1 heure',
                    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
                  },
                  {
                    message: 'Votre offre Designer UX/UI a été consultée 20 fois',
                    time: 'Il y a 3 heures',
                    icon: <AlertCircle className="w-5 h-5 text-blue-400" />,
                  },
                  {
                    message: 'Rappel : Mettez à jour votre profil entreprise',
                    time: 'Il y a 1 jour',
                    icon: <Settings className="w-5 h-5 text-red-400" />,
                  },
                ].map((notification, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {notification.icon}
                    <div>
                      <p className="font-medium text-gray-800">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mt-6 w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Marquer tout comme lu
              </motion.button>
            </div>
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-400" />
                Paramètres
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Nom de l'entreprise</label>
                  <motion.input
                    type="text"
                    placeholder="Nom de l'entreprise"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Email de contact</label>
                  <motion.input
                    type="email"
                    value={userData.email}
                    disabled
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg bg-blue-50/50 text-blue-900 opacity-60 cursor-not-allowed"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Mot de passe</label>
                  <motion.input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Notifications par email</label>
                  <motion.select
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-blue-50/50 text-blue-900"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <option value="all">Toutes les notifications</option>
                    <option value="important">Uniquement importantes</option>
                    <option value="none">Aucune</option>
                  </motion.select>
                </div>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-green-400 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Enregistrer
                </motion.button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans">
      {/* Header from BantuHireHome */}
      <motion.header
        className="sticky top-0 z-50 bg-blue-900 text-white py-4 border-b border-gray-200/10 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-8 text-sm font-medium">
              <motion.div
                className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BantuHire
              </motion.div>
              <motion.div
                className="flex items-center gap-2 text-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <User className="w-5 h-5 text-green-400" />
                <span className="font-semibold">{userData.nom} {userData.prenom}</span>
              </motion.div>
            </div>
            <nav className="flex items-center gap-8 text-sm font-medium">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-green-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-500"
                onClick={() => setActiveSection('create-offer')}
              >
                Publier une offre
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sidebar */}
        <motion.div
          className="lg:w-64 bg-blue-900 text-white rounded-xl p-6 shadow-lg"
          variants={sidebarVariants}
        >
          <div className="space-y-3">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'bg-green-400 text-white shadow-md'
                    : 'text-gray-200 hover:bg-blue-800 hover:text-white'
                }`}
                onClick={() => setActiveSection(item.id)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Section */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-[60vh]"
            >
              {renderSectionContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default RecruiterProfile;