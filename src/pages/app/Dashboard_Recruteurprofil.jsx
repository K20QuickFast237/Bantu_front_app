import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Eye,
  Users,
  Calendar,
  Plus,
  User,
  Search,
  Bell,
  ArrowLeftRight,
} from 'lucide-react';
import Footer from '../../components/public/Footer';
import DashboardSection from './DashboardSection';
import JobPostsSection from './JobPostsSection';
import ApplicationsSection from './ApplicationsSection';
import MessagesSection from './MessagesSection';
import AnalyticsSection from './AnalyticsSection';
import SettingsSection from './SettingsSection';

// Composants UI réutilisables
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      default: 'bg-[#009739] text-white hover:bg-[#007a2f] focus:ring-green-500',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
    };

  const sizes = {
    default: 'h-9 px-3 text-sm', // Réduit la taille du bouton
    sm: 'h-7 px-2 text-xs',
    lg: 'h-11 px-7'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1 p-5 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = '', ...props }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`} {...props}>
    {children}
  </span>
);

const Avatar = ({ children, className = '', ...props }) => (
  <div className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = '', ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full font-medium ${className}`} {...props}>
    {children}
  </div>
);

// Composant Sidebar
const SlidebarDashRecru = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'job-posts', label: 'My Job Posts', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText, badge: 3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-60 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="p-5 border-b border-gray-200 h-14 flex items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#0A2342]">BantuHire</span>
        </div>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-[#0A2342] text-white text-base">JM</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Jean Mba</p>
            <p className="text-xs text-gray-600">Recruiter</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center text-xs">
          <div className="text-center p-2 rounded-md border border-gray-200 flex-1 mx-1">
            <p className="font-bold text-gray-900 text-base">8</p>
            <span className="text-gray-600 text-xs">Job Posts</span>
          </div>
          <div className="text-center p-2 rounded-md border border-gray-200 flex-1 mx-1">
            <p className="font-bold text-green-600 text-base">47</p>
            <span className="text-gray-600 text-xs">Applicants</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 transform ${
                isActive
                  ? 'bg-green-100 text-[#009739] font-semibold shadow-inner'
                  : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] justify-center items-center">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Composant Header
const HeaderDashRecru = () => {
  return (
    <header className="bg-[#0A2342] shadow-md border-b border-white/10 sticky top-0 z-30">
      <div className="max-w-full mx-auto px-5">
        <div className="flex justify-end items-center h-14">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-300 hover:text-white relative transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#009739] text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white">5</span>
            </button>
            <button className="p-2 text-gray-300 hover:text-white relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white">2</span>
            </button>
            <Avatar className="hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-green-400">
              <AvatarFallback className="text-white bg-[#0A2342] text-sm">JM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

// Composant principal DashboardRecruteurprofil
const DashboardRecruteurprofil = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection animateCards={animateCards} />;
      case 'job-posts':
        return <JobPostsSection />;
      case 'applications':
        return <ApplicationsSection />;
      case 'messages':
        return <MessagesSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardSection animateCards={animateCards} />;
    }
  };

  return (
    <>
      <div className="bg-gray-50 flex min-h-screen">
        <SlidebarDashRecru
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1 flex flex-col w-0">
          <HeaderDashRecru />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-1"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default DashboardRecruteurprofil;