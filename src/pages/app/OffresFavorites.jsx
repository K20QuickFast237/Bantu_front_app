import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Star } from 'lucide-react';
import HeaderProfil from '@/components/app/HeaderProfil';
import Footer from '@/components/public/Footer';

const OffresFavorites = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchFavoriteOffers = async () => {
            setLoading(true);
            try {
                // NOTE: J'utilise la route /favoris pour récupérer les offres favorites.
                const response = await api.get('/favoris');
                // La réponse est une liste de favoris, chaque favori contient une offre.
                setApplications(response.data.data || []);
            } catch (error) {
                toast.error("Erreur lors du chargement de vos candidatures favorites.");
                console.error("Erreur fetch candidatures favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteOffers();
    }, []);

    return (
        <>
            <HeaderProfil />
            <div className="min-h-full bg-gray-50 p-6">
                <main className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Star className="w-8 h-8 text-yellow-500" />
                            <h1 className="text-3xl font-bold text-gray-800">
                                {t('pages.favorites.title')}
                            </h1>
                        </div>

                        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr className="border-b border-gray-300">
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.favorites.job')}</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.favorites.company')}</th>                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.favorites.location')}</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.favorites.actions')}</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                         {loading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-20">
                                                <BantulinkLoader />
                                            </td>
                                        </tr>
                                    ) : (
                                        applications.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">{t('pages.favorites.empty')}</td>
                                            </tr>
                                        ) : (
                                            applications.map((app, idx) => {
                                                const statusInfo = statusOptions[app.statut] || { label: app.statut, color: 'bg-gray-400' };
                                                return (
                                                    <tr key={app.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                                            <Link to={`/jobOffers/${offre.id}`} className="hover:underline">{offre.titre_poste || 'N/A'}</Link>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {offre.employeur?.nom_entreprise || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {offre.ville || 'N/A'}, {offre.pays || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button
                                                                onClick={() => navigate(`/jobOffers/${offre.id}`)}
                                                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                                                title="Voir l'offre d'emploi"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                                {t('pages.favorites.view')}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ))}
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default OffresFavorites;
