import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import logo from '@/assets/logobantulink.png';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation(); // Ajout
  const { token, user } = useAuth();
  const navigate = useNavigate();

  // Définir les items avec clés de traduction + liens
  const productItems = [
    { key: 'footer.columns.product.items.0', to: '/home' },
    { key: 'footer.columns.product.items.1', to: '/mk' },
    { key: 'footer.columns.product.items.2', to: '/formations' },
    { key: 'footer.columns.product.items.3', to: '/pricing' },
    { key: 'footer.columns.product.items.4', to: '/mobile' },
  ];

  const useCasesItems = [
    { key: 'footer.columns.useCases.items.0', to: '/profil' },
    { key: 'footer.columns.useCases.items.1', to: '/dashboard' },
    { key: 'footer.columns.useCases.items.2', to: '/sellers' },
    { key: 'footer.columns.useCases.items.3', to: '/buyers' },
    { key: 'footer.columns.useCases.items.4', to: '/freelancers' },
  ];

  const resourcesItems = [
    { key: 'footer.columns.resources.items.0', to: '/help' },
    { key: 'footer.columns.resources.items.1', to: '/faq' },
    { key: 'footer.columns.resources.items.2', to: '/tutorials' },
    { key: 'footer.columns.resources.items.3', to: '/blog' },
    { key: 'footer.columns.resources.items.4', to: '/support' },
  ];

  const companyItems = [
    { key: 'footer.columns.company.items.0', to: '/about' },
    { key: 'footer.columns.company.items.1', to: '/team' },
    { key: 'footer.columns.company.items.2', to: '/terms' },
    { key: 'footer.columns.company.items.3', to: '/privacy' },
    { key: 'footer.columns.company.items.4', to: '/contact' },
  ];

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
          <FooterColumn title={t('footer.columns.product.title')} items={productItems} />
          <FooterColumn title={t('footer.columns.useCases.title')} items={useCasesItems} />
          <FooterColumn title={t('footer.columns.resources.title')} items={resourcesItems} />
          <FooterColumn title={t('footer.columns.company.title')} items={companyItems} />
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
const FooterColumn = ({ title, items = [] }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-gray-900 font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => {
          // item can be a string or an object { key, label, to } or { key, label, href }
          const isString = typeof item === 'string';
          const label = isString ? item : (item.label ? item.label : (item.key ? t(item.key) : ''));
          const href = isString ? null : (item.to || item.href || item.link);

          return (
            <li key={i}>
              {href ? (
                href.startsWith('/') ? (
                  <Link to={href} className="text-gray-600 text-sm hover:text-gray-900 transition-colors">{label}</Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">{label}</a>
                )
              ) : (
                <span className="text-gray-600 text-sm">{label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Footer;