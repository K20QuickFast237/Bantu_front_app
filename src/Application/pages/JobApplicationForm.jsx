import React, { useState } from 'react';

const JobApplicationForm = () => {
  const [applicationMethod, setApplicationMethod] = useState('bantuHire');
  const [coverLetter, setCoverLetter] = useState(
    `Bonjour,

Je me permets de vous solliciter pour le poste de Business Developer CAM – Shopfloor, Belgique (f/x) – FR/NL F/H pour lequel je souhaite vous proposer ma candidature.
Veuillez trouver en pièce jointe mon dossier.
Je me tiens à votre disposition pour toutes questions relatives à mon profil.
Bien cordialement.`
  );
  const maxCharacters = 2000;

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            {/* Logo */}
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

        {/* Sauvegarder Button (Single, as per image 22079b.png context) */}
        <div className="flex justify-start mb-8">
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

        {/* Ma candidature Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <h3 className="text-orange-500 text-xl font-bold mb-4">Ma candidature</h3>
          <div className="space-y-4">
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="applicationMethod"
                value="bantuHire"
                checked={applicationMethod === 'bantuHire'}
                onChange={(e) => setApplicationMethod(e.target.value)}
                className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                style={{ borderColor: applicationMethod === 'bantuHire' ? '#22C55E' : '#9CA3AF', color: applicationMethod === 'bantuHire' ? '#22C55E' : '' }}
              />
              <span className="ml-3">Je postule avec mon profil BantuHire</span>
            </label>
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="applicationMethod"
                value="myCv"
                checked={applicationMethod === 'myCv'}
                onChange={(e) => setApplicationMethod(e.target.value)}
                className="form-radio h-5 w-5 text-gray-600 border-gray-300 focus:ring-gray-500"
                style={{ borderColor: applicationMethod === 'myCv' ? '#D97706' : '#9CA3AF', color: applicationMethod === 'myCv' ? '#D97706' : '' }}
              />
              <span className="ml-3">Je postule avec mon cv</span>
            </label>
          </div>
        </div>

        {/* Lettre de motivation Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <h3 className="text-white text-xl font-bold px-4 py-3 rounded-t-lg" style={{ backgroundColor: '#10B981' }}>
            Lettre de motivation
          </h3>
          <div className="border border-gray-300 rounded-b-lg p-4">
            <textarea
              className="w-full h-48 p-2 text-gray-800 border-none focus:ring-0 focus:outline-none resize-none"
              placeholder="Bonjour,\n\nJe me permets de vous solliciter pour le poste de Business Developer CAM – Shopfloor, Belgique (f/x) – FR/NL F/H pour lequel je souhaite vous proposer ma candidature.\nVeuillez trouver en pièce jointe mon dossier.\nJe me tiens à votre disposition pour toutes questions relatives à mon profil.\nBien cordialement."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              maxLength={maxCharacters}
              rows={10}
            ></textarea>
            <div className="text-right text-gray-500 text-sm mt-2">
              {coverLetter.length}/{maxCharacters} caractères
            </div>
          </div>
        </div>

        {/* Profil recherché Section (from image_220f03.png) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
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

        {/* Bottom Action Buttons (from image_220f03.png) */}
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

        {/* "Envoyer ma candidature" button */}
        <div className="flex justify-center mt-6">
          <button className="px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
            Envoyer ma candidature
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;