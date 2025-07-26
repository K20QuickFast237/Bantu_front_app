import React from 'react';

const JobApplicationPage2 = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              {/* Placeholder for company logo */}
              <img src="/path/to/atom-tech-logo.png" alt="ATOM TECH Logo" className="h-full w-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">ATOM TECH</h1>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">Graphic Designer</h2>
            </div>
          </div>
          <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.882 13.064 9 12.71 9 12c0-.71-.118-1.064-.316-1.342m0 2.684L12 17l-4-4zm-4 0c-.278-.278-.492-.618-.616-1M15.316 13.342C15.118 13.064 15 12.71 15 12c0-.71.118-1.064.316-1.342m0 2.684L12 17l4-4zm-4 0c.278-.278.492-.618.616-1" />
            </svg>
            Partager
          </button>
        </div>

        {/* Job Details Section */}
        <div className="p-6 border-b border-gray-200 grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm">Date de publication : 10/07/2025</p>
            <p className="text-sm">Dernière modification : 10/07/2025</p>
          </div>
          <div></div> {/* Empty div for alignment */}
          <div>
            <p className="font-medium">Type de contrat</p>
            <p>CDI</p>
          </div>
          <div>
            <p className="font-medium">Lieu</p>
            <p>Douala, Akwa</p>
          </div>
          <div>
            <p className="font-medium">Salaire</p>
            <p>RAS</p>
          </div>
          <div>
            <p className="font-medium">Télétravail</p>
            <p>Non autorisé</p>
          </div>
          <div>
            <p className="font-medium">Expérience</p>
            <p>{`> 2 ans`}</p>
          </div>
          <div>
            <p className="font-medium">Niveau d'études</p>
            <p>Licence</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-6 border-b border-gray-200">
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium flex items-center hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0l-1.5 2.5a.5.5 0 00.417.75h5.166a.5.5 0 00.417-.75L12 17m-7 0v-4" />
            </svg>
            Sauvegarder
          </button>
        </div>

        {/* My Application Section */}
        <div className="p-6 bg-white border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ma candidature</h3>
          <div className="space-y-4">
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input type="radio" name="application_method" className="form-radio h-4 w-4 text-orange-500" checked readOnly />
              <span className="ml-2">Je postule avec mon profil BantuHire</span>
            </label>
            <label className="flex items-start text-gray-700 cursor-pointer">
              <input type="radio" name="application_method" className="form-radio h-4 w-4 text-orange-500 mt-1" />
              <div className="ml-2">
                <span>Je postule avec mon cv</span>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>mon_cv.pdf</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <button className="text-blue-600 hover:underline">Importer un autre CV</button>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Choisir Un Fichier
                  </button>
                  <button className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Motivation Letter Section */}
        <div className="p-6 bg-white">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Lettre de motivation</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-gray-700 text-sm relative">
            <p>Bonjour,</p>
            <p className="mt-2">Je me permets de vous solliciter pour le poste de Business Developer CAM - Shopfloor, Belgique (IX) - FR/NL F/H pour lequel je souhaite vous proposer ma candidature.</p>
            <p className="mt-2">Veuillez trouver en pièce jointe mon dossier.</p>
            <p className="mt-2">Je me tiens à votre disposition pour toutes questions relatives à mon profil.</p>
            <p className="mt-2">Bien cordialement.</p>
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              500 / 2000 caractères
            </div>
          </div>
        </div>

        {/* Send Application Button */}
        <div className="p-6 flex justify-center bg-gray-50">
          <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors">
            Envoyer ma candidature
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage2;