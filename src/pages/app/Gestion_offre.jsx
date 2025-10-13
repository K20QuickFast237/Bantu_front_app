import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';

export default function Gestion_offre() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <HeaderProfil />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Title Section */}
                <div className="bg-orange-50 p-8 rounded-lg mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-green-600">Mes offres d'emploi</h1>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded">
                        Créer une offre d'emploi
                    </button>
                </div>

                {/* Job Card */}
                <div className="border border-gray-300 rounded-lg p-8 bg-white">

                    {/* Job Title and Status */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl font-bold text-green-600">Web designer</h2>
                            <div className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700 font-medium">Active</span>
                            </div>
                            <span className="bg-green-500 text-white px-3 py-1 rounded font-bold">Publiée</span>
                        </div>
                        <p className="text-gray-700">Publié il y a 05 jours | Délais de candidature : 15/10/2025</p>
                    </div>

                    {/* Candidates Section */}
                    <div className="bg-gray-200 p-4 rounded mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-800">05 candidatures</span>
                            <a href="#" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                                Consulter les candidature
                                <ChevronRight size={18} />
                            </a>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
                                Modifier
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded">
                                Supprimer
                            </button>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-6">

                        {/* Contexte de l'offre */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Contexte de l'offre</h3>
                            <div className="text-gray-700 space-y-1">
                                <p><span className="font-semibold">Titre : </span>Web designer</p>
                                <p><span className="font-semibold">Deadline : </span>15/10/2025</p>
                                <p><span className="font-semibold">Fonction du poste : </span>responsable technique design</p>
                                <p><span className="font-semibold">Type de contrat : </span>Freelance</p>
                            </div>
                        </div>

                        {/* Description de l'offre */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Description de l'offre</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.
                            </p>
                        </div>

                        {/* Responsabilités */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Responsabilités/Fonctions/Missions du poste</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.
                            </p>
                        </div>

                        {/* Exigences */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Exigences du poste</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.
                            </p>
                        </div>

                        {/* Lieu de travail */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Lieu de travail</h3>
                            <p className="text-gray-700">Douala, Cameroun</p>
                        </div>

                    </div>

                    {/* Bottom Buttons */}
                    <div className="flex gap-3 mt-8">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
                            Modifier
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded">
                            Supprimer
                        </button>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}