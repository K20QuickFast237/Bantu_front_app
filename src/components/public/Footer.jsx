import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next'; // Ajout

const Footer = () => {
  const { t } = useTranslation(); // Ajout
  const { token, user } = useAuth();

  return (
    <>
      {/* Section Rejoignez l’écosystème (au-dessus du footer) */}
      {token && user ? <></> : (
        <div className="relative z-20 -mb-15">
          <div className="bg-gradient-to-r mx-10 rounded-lg from-emerald-500  to-red-500 px-6 py-8 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                <h2 className="text-white text-lg lg:text-xl font-semibold">
                  {t('footer.ecosystemTitle')}
                </h2>
              </div>
              <button className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors mt-3 whitespace-nowrap">
                → {t('footer.createAccount')}
              </button>
            </div>

            {/* Tags */}
            <div className="flex  flex-wrap items-center gap-4 lg:gap-6 text-white text-sm mt-4">
              {t('footer.tags', { returnObjects: true }).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔵 Footer principal */}
      <footer className="w-full bg-blue-800 pt-20">
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">

            {/* Logo */}
            <div className="mb-12">
              <img 
                src="src/assets/logobantulink.png" 
                alt="Logo Bantuhire" 
                className="h-10 w-auto object-contain"
              />
            </div>


            {/* Grille des colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              {/* Produit */}
              <FooterColumn title={t('footer.columns.product.title')} items={t('footer.columns.product.items', { returnObjects: true })} />
              {/* Cas d’usage */}
              <FooterColumn title={t('footer.columns.useCases.title')} items={t('footer.columns.useCases.items', { returnObjects: true })} />
              {/* Ressources */}
              <FooterColumn title={t('footer.columns.resources.title')} items={t('footer.columns.resources.items', { returnObjects: true })} />
              {/* Entreprise */}
              <FooterColumn title={t('footer.columns.company.title')} items={t('footer.columns.company.items', { returnObjects: true })} />

              {/* Réseaux sociaux */}
              {/* <div>
                <h3 className="text-white font-semibold text-lg mb-6">{t('footer.columns.social.title')}</h3>
                <div className="flex gap-3">
                  {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div> */}

              <div className="flex items-center gap-3 mt-6">
                {[
                  {
                    Icon: Facebook,
                    url: "https://www.facebook.com/share/1AhPm1QpV7/?mibextid=wwXIfr", // ton lien Facebook
                    label: "Facebook",
                  },
                  {
                    Icon: Linkedin,
                    url: "https://www.linkedin.com/company/bantulink", // ton lien LinkedIn
                    label: "LinkedIn",
                  },
                  {
                    Icon: Twitter,
                    url: "https://x.com/TNK_SYNERGIES", // ton lien X/Twitter
                    label: "Twitter",
                  },
                  {
                    Icon: Instagram,
                    url: "https://www.instagram.com/tnk_synergies?igsh=dDkzd2t2NjdlN3Jt", // ton lien Instagram
                    label: "Instagram",
                  },
                ].map(({ Icon, url, label }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>

            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-white">
              <p className="text-gray-400 text-sm text-center">
                {t('footer.copyright')}
              </p>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
};

// Sous-composant pour simplifier les colonnes
const FooterColumn = ({ title, items }) => (
  <div>
    <h3 className="text-white font-semibold text-lg mb-6">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i}>
          <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">{item}</a>
        </li>
      ))}
    </ul>
  </div>
  
);

export default Footer;