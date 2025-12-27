import React, { useState } from 'react';
import { Check, Users, Briefcase, ShoppingBag, UserCircle, TrendingUp, Zap, Rocket, BarChart3, Crown, Star, Plus } from 'lucide-react';
// import { Rocket, BarChart3, Crown, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PlansTarifs = () => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState('jobseeker'); // jobseeker, seller, freelancer, employer
  const [billingPeriod, setBillingPeriod] = useState('annual'); // monthly, quarterly, annual
  const [visibilityBillingPeriod, setVisibilityBillingPeriod] = useState('3days'); // 3days, weekly, monthly

  // Données de tarification complètes
  const pricingData = {
    jobseeker: {
      icon: UserCircle,
      periods: ['quarterly', 'annual'],
      plans: [
        {
          id: "basic", // AJOUTÉ : Doit matcher la clé dans fr.json
          price: { quarterly: 0, annual: 0 },
          popular: false,
          color: "orange",
        },
        {
          id: "standard", // AJOUTÉ
          price: { quarterly: 2950, annual: 8850 },
          popular: true,
          color: "blue",
        },
        {
          id: "premium", // AJOUTÉ
          price: { quarterly: 4950, annual: 16850 },
          popular: false,
          color: "purple",
        }
      ],
      addons: [
        { id: "cv_letter", price: 1000 },
        { id: "translation", price: 1000 }
      ]
    },
    seller: {
      icon: ShoppingBag,
      periods: ['monthly', 'quarterly', 'annual'],
      plans: [
        {
          id: "shop", // AJOUTÉ
          price: { monthly: 2000, quarterly: 5000, annual: 19250 },
          popular: true,
          color: "green",
        }
      ],
      // Même logique pour visibility
      visibility: [
        { id: "starter", price: { '3days': 500, weekly: 1000, monthly: 3750 } },
        { id: "pro", price: { '3days': 1000, weekly: 2000, monthly: 7750 } },
        { id: "business", price: { '3days': 2000, weekly: 4000, monthly: 15500 } }
      ]
    },
    freelancer: {
      icon: Briefcase,
      periods: ['monthly', 'quarterly', 'annual'],
      plans: [
        { id: "basic", price: { monthly: 1000, quarterly: 2850, annual: 10000 }, color: "orange" },
        { id: "growth", price: { monthly: 3000, quarterly: 8750, annual: 32500 }, popular: true, color: "blue" },
        { id: "elite", price: { monthly: 5000, quarterly: 14850, annual: 50500 }, color: "purple" }
      ]
    },
    employer: {
      icon: Users,
      periods: ['monthly', 'annual'],
      plans: [
        { id: "lite", price: { monthly: 3000, annual: 30000 }, color: "orange" },
        { id: "pro", price: { monthly: 5000, annual: 50000 }, popular: true, color: "blue" },
        { id: "enterprise", price: { monthly: "Sur mesure", annual: "Sur mesure" }, color: "purple" }
      ]
    }
  };

  const userTypes = [
    { id: 'jobseeker', label: 'Demandeurs d\'Emploi', icon: UserCircle },
    { id: 'seller', label: 'Vendeurs', icon: ShoppingBag },
    { id: 'freelancer', label: 'Freelances', icon: Briefcase },
    { id: 'employer', label: 'Recruteurs', icon: Users }
  ];

  const currentData = pricingData[userType];

  const getPeriodLabel = (period) => {
    const labels = {
      monthly: 'Mensuel',
      quarterly: 'Trimestriel',
      annual: 'Annuel',
      '3days': '3 Jours',
      weekly: 'Semaine'
    };
    return labels[period] || period;
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return price === 0 ? 'Gratuit' : `${price.toLocaleString('fr-FR')} XAF`;
  };

  const getColorClasses = (color, type = 'button') => {
    const colors = {
      orange: {
        button: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500',
        border: 'border-orange-500',
        badge: 'bg-orange-500'
      },
      blue: {
        button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600',
        border: 'border-blue-500',
        badge: 'bg-blue-500'
      },
      purple: {
        button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-600',
        border: 'border-purple-500',
        badge: 'bg-purple-500'
      },
      green: {
        button: 'bg-green-600 hover:bg-green-700 focus:ring-green-600',
        border: 'border-green-500',
        badge: 'bg-green-500'
      }
    };
    return colors[color]?.[type] || colors.blue[type];
  };

  return (
    <div id="pricing-plans" className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
       {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Sélecteur de type d'utilisateur */}
        <div className="mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setUserType(type.id);
                    setBillingPeriod(pricingData[type.id].periods[0]);
                    if (type.id === 'seller') setVisibilityBillingPeriod('3days');
                  }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    userType === type.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${
                    userType === type.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <p className={`font-semibold text-sm ${
                    userType === type.id ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    {/* Traduction dynamique du label de catégorie */}
                    {t(`pricing.${type.id}.title`)}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sélecteur de période */}
        {currentData.periods.length > 1 && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {currentData.periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    billingPeriod === period
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {/* Traduction de la période (Mensuel, Annuel, etc.) */}
                  {t(`pricing.billing.${period}`)}
                  
                  {period === 'annual' && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {t('pricing.billing.save')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

      

      {/* Plans principaux */}
      <AnimatePresence mode="wait">
        <motion.div
          key={userType + billingPeriod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {currentData.plans.map((plan, index) => {
            // 1. On construit la clé de traduction en s'assurant que plan.id existe
            const translationPath = `pricing.${userType}.plans.${plan.id}`;
            const planContent = t(translationPath, { returnObjects: true });

            // Sécurité si la traduction échoue
            const hasContent = planContent && typeof planContent === 'object';

            return (
              <motion.div
                key={plan.id || index} // Correction de l'erreur "unique key prop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col relative ${
                  plan.popular 
                    ? `border-2 ${getColorClasses(plan.color, 'border')} transform scale-105` 
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${getColorClasses(plan.color, 'badge')} text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-md flex items-center gap-1`}>
                    <Star className="w-3 h-3" />
                    {t('pricing.labels.popular')}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {hasContent ? planContent.name : `Plan ${plan.id}`}
                  </h3>
                  
                  <div className="mb-3">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {formatPrice(plan.price[billingPeriod])}
                    </span>
                    {typeof plan.price[billingPeriod] === 'number' && plan.price[billingPeriod] > 0 && (
                      <span className="text-gray-500 text-sm ml-2">
                        / {t(`pricing.billing.${billingPeriod}`)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    {hasContent ? planContent.tagline : ""}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {hasContent && Array.isArray(planContent.features) ? (
                    planContent.features.map((feature, idx) => (
                      <li key={`${plan.id}-feat-${idx}`} className="flex items-start">
                        <Check className="text-green-500 w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-red-400 text-xs italic">
                      Données de fonctionnalités introuvables pour {translationPath}
                    </li>
                  )}
                </ul>

                <button className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getColorClasses(plan.color, 'button')}`}>
                  {plan.price[billingPeriod] === 0 
                    ? t('pricing.labels.ctaFree') 
                    : typeof plan.price[billingPeriod] === 'string' 
                      ? t('pricing.labels.ctaContact') 
                      : t('pricing.labels.ctaSelect')}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
        
        {/* Section Visibilité & Marketing pour les Vendeurs */}
        {userType === 'seller' && (
          <div className="mt-24 bg-gray-50/50 rounded-3xl p-8 lg:p-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
                <Zap className="w-4 h-4" />
                {t('pricing.labels.visibilityTitle')}
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
                {/* Boostez votre boutique */}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('pricing.labels.visibilitySub')}
              </p>

              {/* Sélecteur de période stylisé */}
              <div className="flex justify-center mt-8">
                <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm">
                  {['3days', 'weekly', 'monthly'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setVisibilityBillingPeriod(period)}
                      className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                        visibilityBillingPeriod === period
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {t(`pricing.billing.${period}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingData.seller.visibility.map((item, index) => {
                const visContent = t(`pricing.seller.visibility.${item.id}`, { returnObjects: true });
                
                // Attribution des icônes selon l'ID
                const Icon = item.id === 'starter' ? Rocket : item.id === 'pro' ? BarChart3 : Crown;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                  >
                    {/* Header de la carte avec Icône */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                      item.id === 'business' ? 'bg-indigo-600 text-white' : 'bg-green-100 text-green-600'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {visContent?.name || item.id}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      {visContent?.desc || visContent?.description}
                    </p>

                    {/* Section Prix */}
                    <div className="mb-8 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-900">
                        {formatPrice(item.price[visibilityBillingPeriod])}
                      </span>
                      <span className="text-gray-400 font-medium">
                        / {t(`pricing.billing.${visibilityBillingPeriod}`).toLowerCase()}
                      </span>
                    </div>

                    {/* Features avec puces personnalisées */}
                    <ul className="space-y-4 mb-10 flex-grow">
                      {Array.isArray(visContent?.features) && visContent.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 font-medium">
                          <div className="mr-3 mt-1 bg-green-50 rounded-full p-0.5">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Bouton d'action */}
                    <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-lg ${
                      item.id === 'business' 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' 
                        : 'bg-green-600 text-white hover:bg-green-700 shadow-green-100'
                    }`}>
                      {t('pricing.labels.ctaSponsor')}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section Services Supplémentaires */}
        {userType === 'jobseeker' && currentData.addons && (
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('pricing.jobseeker.addons_title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentData.addons.map((addon) => {
                // Récupération de la traduction via l'ID
                const addonContent = t(`pricing.jobseeker.addons.${addon.id}`, { returnObjects: true });

                return (
                  <div 
                    key={addon.id}
                    className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <Plus className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {addonContent?.name || addon.id}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Optionnel
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-black text-gray-900">
                        {formatPrice(addon.price)}
                      </div>
                      <div className="text-xs text-gray-400">
                        / {addonContent?.period || 'mois'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlansTarifs;