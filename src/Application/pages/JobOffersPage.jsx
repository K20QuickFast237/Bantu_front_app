import React from 'react';
import Header from "../components/Header"

const JobOfferPage = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen mt-20 bg-gray-100 font-sans relative">
      {/* Fixed Footer for mobile/scroll */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg lg:hidden z-50">
        <div className="flex justify-center gap-4">
          <button className="flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.75V21H3.75V14.75A2.25 2.25 0 016 12.5h12a2.25 2.25 0 012.25 2.25zM12 9.5a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
            Postuler
          </button>
          <button className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white  rounded-lg my-8 p-6 lg:p-8">

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Job Details & Description */}
          <div className="lg:w-2/3 ">
           {/* Header */} 
           <div className="flex justify-between items-center mb-6  pb-4">
          <div className="flex items-center ">
            <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center mr-3 text-sm font-semibold text-gray-800 rounded">
              Logo
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ATOM TECH</h1>
          </div>
          <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
            Partager
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186A.75.75 0 017.5 12V6a2.25 2.25 0 013-2.186m-3 2.186a2.25 2.25 0 00-3 2.186m3-2.186V12m0 0a2.25 2.25 0 003 2.186m-3-2.186A.75.75 0 0116.5 12V6a2.25 2.25 0 00-3-2.186m3 2.186a2.25 2.25 0 013 2.186m-3-2.186V12m0 0a2.25 2.25 0 013 2.186m-3-2.186A.75.75 0 007.5 12h9"
              />
            </svg>
          </button>
        </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Graphic designer</h2>

            {/* Publication Dates */}
            <div className="text-gray-600 text-sm mb-6">
              <p>Date de publication : 10/07/2025</p>
              <p>Dernière modification : 10/07/2025</p>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700 mb-8">
              <div>
                <p className="font-semibold text-gray-800">Type de contrat</p>
                <p>CDI</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Lieu</p>
                <p>Douala, akwa</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Salaire</p>
                <p>RAS</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Télétravail</p>
                <p>Non autorisé</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Expérience</p>
                <p>&gt; 2 ans</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Niveau d'études</p>
                <p>Licence</p>
              </div>
            </div>

            {/* Action Buttons for Desktop */}
            <div className="hidden lg:flex gap-4 mb-10">
              <button className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.75V21H3.75V14.75A2.25 2.25 0 016 12.5h12a2.25 2.25 0 012.25 2.25zM12 9.5a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
                Postuler
              </button>
              <button className="flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                Sauvegarder
              </button>
            </div>

            {/* Description de l'offre */}
            <div className="mb-8">
              <h3 className="text-orange-500 text-xl font-bold mb-4">Description de l'offre</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous recherchons un(e) UI/UX Designer expérimenté(e) pour prendre en main la conception de nos interfaces Web et Mobile et devenir la référence design au sein de notre équipe. Vous jouerez un rôle central dans la création d'expériences utilisateurs fluides, intuitives et esthétiques, sur des projets à fort enjeu métier.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Votre mission principale : transformer des interfaces complexes en expériences simples, efficaces et agréables.
              </p>
            </div>

            {/* Vos missions */}
            <div className="mb-8">
              <h3 className="text-orange-500 text-xl font-bold mb-4">Vos missions</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Recueillir les besoins et les usages des utilisateurs afin de concevoir des fonctionnelles et des parcours utilisateurs à fort impact.</li>
                <li>Assurer une veille active sur les nouvelles technologies IHM, les tendances UX et les exigences légales.</li>
                <li>Être force de proposition sur l'amélioration continue de l'expérience utilisateur.</li>
                <li>Concevoir des interfaces web et mobiles pour des logiciels back office, front office et des sites web destinés aux clients finaux.</li>
                <li>Transformer des interfaces de paramétrage complexes en expériences simples et agréables.</li>
                <li>Être garant(e) de la cohérence visuelle et fonctionnelle des parcours utilisateurs.</li>
                <li>UI Design.</li>
                <li>Concevoir le design de nos applications web et mobiles, fonctionnelles et (fiables), en respectant les contraintes techniques et les besoins métiers.</li>
                <li>Contribuer à chaque projet pour réaliser des maquettes fonctionnelles et esthétiques.</li>
                <li>Veiller à la bonne intégration des maquettes dans les développements, en assurant la fidélité entre le design et le rendu final.</li>
                <li>Établir et maintenir rigoureusement le design system des produits de l'entreprise.</li>
                <li>Autres responsabilités.</li>
                <li>Participer à l'étroite collaboration avec l'équipe projet et l'équipe de développement pour garantir la cohérence globale des logiciels et la pertinence des parcours utilisateurs.</li>
                <li>Évaluer et optimiser l'expérience design et adaptabilité de nos outils en fonction de la cible.</li>
                <li>Proposer une contribution sur les fonctionnalités existantes et contribuer à la réflexion autour de solutions nouvelles et innovantes.</li>
                <li>Participer à la création de supports de communication internes et externes (présentations, visuel pour les réseaux sociaux, guides, vidéos...).</li>
                <li>Montrer un plus grâce à des compétences en graphisme (mise en page de documents, création de logos, supports visuels variés).</li>
                <li>Vous pourrez si vous le souhaitez réaliser des observations terrain auprès des équipes support technique, des retours d'expérience concrets et améliorer continuellement nos applications.</li>
              </ul>
            </div>

            {/* Profil recherché */}
            <div>
              <h3 className="text-orange-500 text-xl font-bold mb-4">Profil recherché</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>5 ans d'expérience minimum en design d'interfaces et d'expériences utilisateurs.</li>
                <li>Maîtrise des outils de design (Figma, Adobe XD, Sketch...).</li>
                <li>Maîtrise confirmée dans la conception de logiciels métiers complexes.</li>
                <li>Capacité à simplifier des interfaces riches sans perdre en efficacité.</li>
                <li>Sens du détail, créativité, autonomie et esprit d'équipe.</li>
                <li>Aisance dans la présentation de vos idées et livrables.</li>
                <li>Une sensibilité graphique pour les supports de communication est un plus.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: A propos de l'entreprise */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-8"> {/* Sticky for scrolling */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">A propos de l'entreprise</h3>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white border border-gray-300 flex items-center justify-center mr-2 text-xs font-semibold text-gray-800 rounded">
                  Logo
                </div>
                <span className="text-lg font-bold text-gray-900">ATOM TECH</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                ATOM TECH est une entreprise qui développe des applications Web et Mobile, principalement pour la distribution automobile et les assurances.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                La société née en 2012 a depuis déployé ses solutions dans plus de 35 pays et continue sur sa lancée en améliorant sans cesse ses produits pour de nouveaux clients.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                En plus de proposer ses logiciels, Syartec accompagne ses clients dans toutes les étapes des déploiements et assure leur formation et support.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Nous concevons des solutions métiers innovantes, robustes et centrées sur l'utilisateur. Nous concevons des solutions métiers innovantes, robustes et centrées sur l'utilisateur.
              </p>
              <div className="flex items-center text-gray-700 text-sm mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672L13.684 19.03a3.375 3.375 0 011.04-3.843 3.375 3.375 0 014.246 0 3.375 3.375 0 011.04 3.843l-1.358 2.642m1.358-2.642C20.67 15.715 17.514 12 15 12s-5.67 3.715-6.042 9.672M18 12v-5.25m0 0a6 6 0 00-12 0v5.25"
                  />
                </svg>
                <span className="font-semibold">Localisation</span>
                <span className="ml-2">Douala, Akwa</span>
              </div>
            </div>
          </div>
        </div>
        {/* Additional Action Buttons at the very end */}
        <div className="flex justify-center gap-4 mt-8 py-4 border-t border-gray-200">
          <button className="flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.75V21H3.75V14.75A2.25 2.25 0 016 12.5h12a2.25 2.25 0 012.25 2.25zM12 9.5a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
            Postuler
          </button>
          <button className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default JobOfferPage;