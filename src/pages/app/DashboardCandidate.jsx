import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Search,
    Bell,
    MessageCircle,
    BellDot,
    Users,
    User,
    FileText,
    Briefcase,
    Settings,
    Edit,
    LogOut,
    ChevronDown,
} from 'lucide-react';
import ProfileConfiguration from './MyProfil';

const DashboardCandidate = () => {

    const profileMenuItems = [
        { to: '', label: "Fil d'actualité", icon: Home, end: true }, // 'end' pour correspondre exactement au chemin parent
        { to: 'applications', label: 'Mes Candidatures', icon: Users },
        { to: 'cvs', label: 'Mes CVs', icon: FileText },
        { to: 'jobs', label: "Offres d'emplois", icon: Briefcase },
        { to: 'settings', label: 'Paramètres', icon: Settings },
    ];

    const sidebarActions = [
        { icon: FileText, label: 'Créer un CV', description: 'Mettez en valeur vos compétences', color: 'bg-blue-100 text-blue-600' },
        { icon: BellDot, label: 'Créer une alerte', description: 'Recevez les offres qui vous correspondent', color: 'bg-orange-100 text-orange-600' },
        { icon: Briefcase, label: 'Creer une offre d\'emploi', description: 'Rechercher des talents en creant une offre d\'emploi', color: 'bg-green-100 text-green-600' },
    ];

    const recommendedJobs = [
        {
            title: 'RESPONSABLE COMMERCIAL ET MARKETING',
            company: 'CHAPCHAPCAR CAMEROUN',
            location: 'Yaoundé, Centre, Cameroun',
            type: 'CDI',
        },
        {
            title: 'OFFRE DE STAGE ÉDITION 2025',
            company: 'Nachtigal Hydro Power Company',
            location: 'Lieu Non spécifié, Cameroun',
            type: 'Stage',
        },
        {
            title: 'AGENT GESTIONNAIRE DE COMPTE',
            company: 'Qazam',
            location: 'Douala, Littoral, Cameroun',
            type: 'CDI',
        }
    ];

    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const userProfileItems = [
        { to: 'profil', label: "Voir le profil", icon: User },
        { to: 'profil', label: "Modifier le profil", icon: Edit }, // MyProfil contient déjà la logique d'édition
        { to: 'settings', label: 'Paramètres', icon: Settings },
    ];

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95 },
    };

    const location = useLocation();
    const isProfilePage = location.pathname.endsWith('/profil');

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-[#0A2342] shadow-md border-b border-white/10 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo et Recherche */}
                        <div className="flex items-center">
                            {isProfilePage ? (
                                <Link to="/dashboard/candidate" className="flex items-center gap-3 text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
                                    <Home className="w-6 h-6" />
                                    <span className="font-semibold">Accueil</span>
                                </Link>
                            ) : (
                                <div className="text-2xl font-bold text-white">BantuHire</div>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-lg mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Recherche de relations, pages, groupes, #hashtags"
                                    className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#009739] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Navigation Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-300 hover:text-white relative transition-colors">
                                <MessageCircle className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-4 h-4 bg-[#009739] text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">3</span>
                            </button>
                            <button className="p-2 text-gray-300 hover:text-white relative transition-colors">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">1</span>
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative" ref={profileMenuRef}>
                                <button
                                    onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-colors group"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-green-200"
                                    />
                                    <span className="text-sm font-medium text-gray-200 hidden sm:block">Jospin Duclair</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isProfileMenuOpen && (
                                        <motion.div
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.15, ease: 'easeOut' }}
                                            className="absolute top-full right-0 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10"
                                        >
                                            <div className="p-2">
                                                {userProfileItems.map((item) => (
                                                    <Link key={item.to} to={item.to} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
                                                        <item.icon className="w-4 h-4 text-gray-500" />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                ))}
                                                <div className="border-t border-gray-200/60 my-1"></div>
                                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Déconnexion</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {isProfilePage ? (
                <ProfileConfiguration />
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Left Sidebar - Profile */}
                        <aside className="col-span-3 sticky top-24 h-fit">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                {/* Profile Header */}
                                <div className="relative">
                                    <div className="h-20 bg-gradient-to-r from-[#009739] to-[#00c54b]"></div>
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                                        />
                                    </div>
                                </div>

                                <div className="pt-10 pb-4 px-4 text-center">
                                    <h3 className="font-semibold text-lg text-gray-900">Jospin Duclair</h3>
                                    <p className="text-gray-600 text-sm">Développeur Full-Stack | React, Node.js</p>
                                    <p className="text-gray-500 text-xs mt-1">@nanfackjospinduclair</p>

                                    <div className="flex justify-around mt-4 text-sm text-gray-600 border-t border-gray-200/80 pt-3">
                                        <div className="text-center"><span className="font-bold block">150</span> Candidatures</div>
                                        <div className="text-center"><span className="font-bold block">25</span> Offres</div>
                                    </div>
                                </div>


                                {/* Profile Menu */}
                                <div className="border-t border-gray-200/80">
                                    <div className="p-2 space-y-1 text-sm">
                                        {profileMenuItems.map((item) => (
                                            <NavLink
                                                key={item.to}
                                                to={item.to}
                                                end={item.end}
                                                className={({ isActive }) => `
                                                    flex items-center p-2.5 rounded-md cursor-pointer transition-all duration-200
                                                    ${isActive
                                                        ? 'bg-green-100 text-[#009739] font-semibold shadow-inner'
                                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                                    }`
                                                }
                                            >
                                                <item.icon className="w-5 h-5 mr-3" />
                                                <span>{item.label}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="col-span-6">
                            <Outlet />
                        </div>

                        {/* Right Sidebar - Job Offers */}
                        <aside className="col-span-3 sticky top-24 h-fit space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <h3 className="font-semibold text-gray-900 mb-4 text-base">Actions rapides</h3>
                                <div className="space-y-3">
                                    {sidebarActions.map((action, index) => (
                                        <div key={index} className="flex items-start gap-3 p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                            <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${action.color}`}>
                                                <action.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{action.label}</p>
                                                <p className="text-xs text-gray-500">{action.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recents Jobs */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <h3 className="font-semibold text-gray-900 mb-4 text-base">Offres d'emploi récentes</h3>
                                <div className="space-y-4">
                                    {recommendedJobs.map((job, index) => (
                                        <div key={index} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                                            <div>
                                                <h4 className="font-semibold text-[#009739] text-sm leading-tight hover:underline">
                                                    {job.title}
                                                </h4>
                                                <p className="text-sm text-gray-800 mt-0.5">{job.company}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{job.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 text-sm font-semibold text-center text-[#009739] hover:bg-green-50 p-2 rounded-md transition-colors">
                                    Voir plus
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardCandidate;