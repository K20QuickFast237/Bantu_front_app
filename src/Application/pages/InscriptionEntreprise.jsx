// CreationCompte.jsx
import React from 'react';
import Welcome1 from '../../assets/assets_application/Welcome1.png'; // Import de l'image spécifiée
import Header from '../components/Header';
import Footer from '../../components/Footer';

const InscriptionEntreprise = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen flex">
      {/* Left Section - Gradient Background and Image */}
      <div className="w-1/2 bg-gradient-to-b from-blue-900 to-emerald-700 flex flex-col justify-center items-center p-12 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center leading-tight">
          Augmentez Votre Attractivité Et Recrutez Facilement Dès Aujourd'hui
        </h1>
        <p className="text-sm text-center mb-12 opacity-90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel pharetra urna.
          Ornare iaculis mauris, Cras facilisis dictum feugiat. Nam et placerat arcu.
          Fusce non pulvinar sapien. Ut maximus ex felis, nec pharetra sapien aliquet.
          Curabitur tincidunt risus, Nec tempor augue ante id orci. Ut semper elit et amet vulputate,
          eget tristique nunc. Ut laoreet, sapien et cursus luctus, velit dolor ornare sem,
          Convallis blandit ipsum. Ut varius luctus ligula. Ac molestie dolor fringilla vel.
          Maecenas luctus magna at tortor pretium et id ante. Sed non auctor quam.
          Morbi a enim purus. Nulla in vulpu
        </p>
        <div className="w-full flex justify-center">
          <img src={Welcome1} alt="Welcome Illustration" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 bg-white p-12 overflow-y-auto"> {/* Ajout de overflow-y-auto pour le défilement */}
        <h2 className="text-orange-500 text-2xl font-bold mb-8 text-center">Création De Compte</h2>

        {/* Vos informations Personnelles */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Vos informations Personnelles</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="nom"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="prenom"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sexe<span className="text-red-500">*</span></label>
            <div className="flex items-center space-x-6 mt-1">
              <label className="flex items-center">
                <input type="radio" name="sexe" value="homme" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                <span className="ml-2 text-gray-700">Homme</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="sexe" value="femme" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                <span className="ml-2 text-gray-700">Femme</span>
              </label>
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="adresseEmail" className="block text-sm font-medium text-gray-700 mb-1">Adresse Email<span className="text-red-500">*</span></label>
            <input
              type="email"
              id="adresseEmail"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone<span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="telephone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="intitulePoste" className="block text-sm font-medium text-gray-700 mb-1">Intitulé De Votre Poste<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="intitulePoste"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="fonctionEntreprise" className="block text-sm font-medium text-gray-700 mb-1">Votre Fonction Dans L'Entreprise<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="fonctionEntreprise"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Informations De L'entreprise */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations De L'entreprise</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
          <div className="col-span-2">
            <label htmlFor="nomEntreprise" className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="nomEntreprise"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="niu" className="block text-sm font-medium text-gray-700 mb-1">NIU<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="niu"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="pays" className="block text-sm font-medium text-gray-700 mb-1">Pays<span className="text-red-500">*</span></label>
            <select
              id="pays"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            >
              <option value="">Choisir votre pays</option>
              {/* Ajoutez plus d'options ici */}
              <option value="Cameroun">Cameroun</option>
              <option value="France">France</option>
            </select>
          </div>

          <div className="col-span-2">
            <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">Ville<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="ville"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700 mb-1">Code postal<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="codePostal"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">Adresse<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="adresse"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-10">
          <button className="text-orange-500 hover:underline text-sm font-medium">
            Annuler la création de compte
          </button>
          <button className="px-6 py-3 rounded-md bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-colors duration-200">
            Créer votre compte recruteur
          </button>
        </div>
      </div>
    </div>
    <Footer />
    
    </>
  );
};

export default InscriptionEntreprise;