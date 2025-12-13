import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import logo from '@/assets/logobantulink.png';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation(); // Ajout
  const { token, user } = useAuth();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section CTA (si non connecté) */}
        {!token && !user && (
          <div className="bg-blue-600 rounded-2xl p-8 sm:p-12 mb-16 text-center shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t('footer.ecosystemTitle')}
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-8">
              Accédez à un monde d'opportunités professionnelles et commerciales.
            </p>
            <button onClick={() => navigate('/register')} className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              {t('footer.createAccount')}
            </button>
          </div>
        )}

        {/* Contenu principal du footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo et description */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="BantuLink Logo" className="h-7" />
            </div>
            <p className="text-gray-600 text-sm max-w-full sm:max-w-xs">
              La super-application pour l'emploi et le commerce en Afrique.
            </p>
          </div>

          {/* Colonnes de liens */}
          <FooterColumn title={t('footer.columns.product.title')} items={t('footer.columns.product.items', { returnObjects: true })} />
          <FooterColumn title={t('footer.columns.useCases.title')} items={t('footer.columns.useCases.items', { returnObjects: true })} />
          <FooterColumn title={t('footer.columns.resources.title')} items={t('footer.columns.resources.items', { returnObjects: true })} />
          <FooterColumn title={t('footer.columns.company.title')} items={t('footer.columns.company.items', { returnObjects: true })} />
        </div>

        {/* Ligne de séparation, copyright et réseaux sociaux */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-4">
            {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sous-composant pour simplifier les colonnes
const FooterColumn = ({ title, items }) => (
  <div>
    <h3 className="text-gray-900 font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i}>
          <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">{item}</a>
        </li>
      ))}
    </ul>
  </div>
  
);

export default Footer;