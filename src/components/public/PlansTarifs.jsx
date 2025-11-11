import React, { useState } from 'react';
import { Check, Users, Briefcase, ShoppingBag, UserCircle, TrendingUp, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PlansTarifs = () => {
  const [userType, setUserType] = useState('jobseeker'); // jobseeker, seller, freelancer, employer
  const [billingPeriod, setBillingPeriod] = useState('annual'); // monthly, quarterly, annual
  const [visibilityBillingPeriod, setVisibilityBillingPeriod] = useState('3days'); // 3days, weekly, monthly

  // Données de tarification complètes
  const pricingData = {
    jobseeker: {
      title: "Demandeurs d'Emploi",
      icon: UserCircle,
      description: "Trouvez l'emploi de vos rêves",
      periods: ['quarterly', 'annual'],
      plans: [
        {
          name: "Basique",
          price: { quarterly: 0, annual: 0 },
          popular: false,
          color: "orange",
          description: "Parfait pour commencer votre recherche",
          features: [
            "Inscription et profil complet",
            "Téléchargement de CV",
            "Postuler à 3 emplois par mois",
            "Accès aux offres publiques",
            "Support communautaire"
          ]
        },
        {
          name: "Standard",
          price: { quarterly: 2950, annual: 8850 },
          popular: true,
          color: "blue",
          description: "Optimisez vos candidatures",
          features: [
            "Mise en forme CV professionnel",
            "Lettre de motivation professionnelle",
            "Mise en avant du CV",
            "Score Matching",
            "Probabilité d'obtenir un entretien",
            "Candidatures illimitées",
            "Badge de compétence",
            "Alertes emploi"
          ]
        },
        {
          name: "Premium",
          price: { quarterly: 4950, annual: 16850 },
          popular: false,
          color: "purple",
          description: "Accès VIP aux meilleures opportunités",
          features: [
            "Tout du plan Standard",
            "Boost CV prioritaire",
            "IA de mise en relation",
            "Offres cachées en avant-première",
            "1 session coaching RH/trimestre",
            "Certification de compétences",
            "Rapport mensuel personnalisé",
            "Support dédié"
          ]
        }
      ],
      addons: [
        { name: "CV + Lettre de motivation pro", price: 1000, period: "mois" },
        { name: "Traduction EN/FR", price: 1000, period: "mois" }
      ]
    },
    seller: {
      title: "Vendeurs de Produits",
      icon: ShoppingBag,
      description: "Créez votre boutique en ligne",
      periods: ['monthly', 'quarterly', 'annual'],
      plans: [
        {
          name: "Boutique en Ligne",
          price: { monthly: 2000, quarterly: 5000, annual: 19250 },
          popular: true,
          color: "green",
          description: "Votre e-commerce clé en main",
          features: [
            "Catalogue produits illimité",
            "Panier et paiement sécurisé",
            "Gestion des commandes",
            "Espace client",
            "Outils marketing de base",
            "Support client 24/7"
          ]
        }
      ],
      visibility: [
        {
          name: "Starter",
          description: "Visibilité naturelle",
          price: { '3days': 500, weekly: 1000, monthly: 3750 },
          features: ["SEO référencement naturel"]
        },
        {
          name: "Pro",
          description: "Boostez vos ventes",
          price: { '3days': 1000, weekly: 2000, monthly: 7750 },
          features: [
            "Tableau de bord analytique",
            "Support marketing",
            "SEO + Publicité Facebook/Instagram"
          ]
        },
        {
          name: "Business+",
          description: "Dominez votre marché",
          price: { '3days': 2000, weekly: 4000, monthly: 15500 },
          features: [
            "Image de marque complète",
            "Priorité maximale",
            "SEO + Facebook/Instagram + Google Ads"
          ]
        }
      ]
    },
    freelancer: {
      title: "Prestataires de Services",
      icon: Briefcase,
      description: "Développez votre activité freelance",
      periods: ['monthly', 'quarterly', 'annual'],
      plans: [
        {
          name: "Basique",
          price: { monthly: 1000, quarterly: 2850, annual: 10000 },
          popular: false,
          color: "orange",
          description: "Démarrez votre activité",
          features: [
            "Listage de services",
            "Jusqu'à 3 propositions/mois",
            "Profil professionnel",
            "Mention vérifiée"
          ]
        },
        {
          name: "Croissance",
          price: { monthly: 3000, quarterly: 8750, annual: 32500 },
          popular: true,
          color: "blue",
          description: "Accélérez votre croissance",
          features: [
            "Propositions illimitées",
            "Portfolio professionnel",
            "Analyse de performance",
            "Support prioritaire",
            "Badge vérifié premium"
          ]
        },
        {
          name: "Élite",
          price: { monthly: 5000, quarterly: 14850, annual: 50500 },
          popular: false,
          color: "purple",
          description: "Statut premium maximum",
          features: [
            "Tout du plan Croissance",
            "Publicités ciblées",
            "Page de marque personnalisée",
            "Visibilité premium maximale",
            "Manager de compte dédié"
          ]
        }
      ]
    },
    employer: {
      title: "Employeurs / Recruteurs",
      icon: Users,
      description: "Recrutez les meilleurs talents",
      periods: ['monthly', 'annual'],
      plans: [
        {
          name: "Lite",
          price: { monthly: 3000, annual: 30000 },
          popular: false,
          color: "orange",
          description: "Pour les petites équipes",
          features: [
            "3 offres d'emploi/mois",
            "Accès base demandeurs d'emploi",
            "Gestion des candidatures",
            "Support standard"
          ]
        },
        {
          name: "Pro Recruteur",
          price: { monthly: 5000, annual: 50000 },
          popular: true,
          color: "blue",
          description: "Solution complète RH",
          features: [
            "Offres d'emploi illimitées",
            "Recherche avancée CV",
            "Page entreprise personnalisée",
            "Entretiens en ligne",
            "Analyse des candidatures",
            "Support prioritaire"
          ]
        },
        {
          name: "Entreprise",
          price: { monthly: "Sur mesure", annual: "Sur mesure" },
          popular: false,
          color: "purple",
          description: "Solution personnalisée",
          features: [
            "Tout du plan Pro",
            "Tableaux de bord personnalisés",
            "Intégration système RH",
            "API d'accès",
            "Manager de compte dédié",
            "Formation équipe RH"
          ]
        }
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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Tarifs BantuLink
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions abordables et évolutives pour tous vos besoins professionnels
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
                    {type.label}
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
                  {getPeriodLabel(period)}
                  {period === 'annual' && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Économisez jusqu'à 30%
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
            {currentData.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col relative ${
                  plan.popular ? `border-2 ${getColorClasses(plan.color, 'border')} transform scale-105` : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${getColorClasses(plan.color, 'badge')} text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-md flex items-center gap-1`}>
                    <Star className="w-3 h-3" />
                    Le plus populaire
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {formatPrice(plan.price[billingPeriod])}
                    </span>
                    {typeof plan.price[billingPeriod] === 'number' && plan.price[billingPeriod] > 0 && (
                      <span className="text-gray-500 text-sm ml-2">
                        / {getPeriodLabel(billingPeriod)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-green-500 w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getColorClasses(plan.color, 'button')}`}>
                  {plan.price[billingPeriod] === 0 ? 'Commencer gratuitement' : 
                   typeof plan.price[billingPeriod] === 'string' ? 'Nous contacter' : 'Choisir ce plan'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Plans de visibilité pour vendeurs */}
        {userType === 'seller' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Plans de Visibilité & Marketing
              </h2>
              <p className="text-gray-600">Boostez votre boutique avec nos options de sponsoring</p>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                {['3days', 'weekly', 'monthly'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setVisibilityBillingPeriod(period)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      billingPeriod === period
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {getPeriodLabel(period)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentData.visibility.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(plan.price[visibilityBillingPeriod])}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Zap className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Sponsoriser
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Add-ons pour demandeurs d'emploi */}
        {userType === 'jobseeker' && currentData.addons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Services Supplémentaires
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {currentData.addons.map((addon, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <h4 className="font-semibold text-gray-900 mb-2">{addon.name}</h4>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {formatPrice(addon.price)} <span className="text-sm text-gray-500">/ {addon.period}</span>
                  </p>
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Ajouter
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA final */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Prêt à commencer votre aventure sur BantuLink ?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui font confiance à notre plateforme
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-lg">
              Commencer gratuitement
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition">
              Nous contacter
            </button>
          </div>
        </motion.div> */}

      </div>
    </div>
  );
};

export default PlansTarifs;