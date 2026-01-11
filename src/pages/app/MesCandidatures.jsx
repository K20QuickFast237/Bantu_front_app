import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import HeaderProfil from '@/components/app/HeaderProfil';
import Footer from '@/components/public/Footer';
import { encodeId } from '@/obfuscate';

const MesCandidatures = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const statusOptions = {
        'candidature': { label: 'Envoyée', color: 'bg-gray-400' },
        'en_revision': { label: 'En révision', color: 'bg-yellow-500' },
        'preselectionne': { label: 'Présélectionné', color: 'bg-blue-500' },
        'invitation_entretien': { label: 'Entretien', color: 'bg-purple-500' },
        'rejete': { label: 'Rejeté', color: 'bg-red-500' },
        'embauche': { label: 'Embauché', color: 'bg-green-500' },
    };

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const response = await api.get('/candidatures/me');
                setApplications(response.data || []);
            } catch (error) {
                toast.error("Erreur lors du chargement de vos candidatures.");
                console.error("Erreur fetch candidatures:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <>
            <HeaderProfil />
            <div className="min-h-full bg-gray-50 p-6">
                <main className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {t('pages.myApplications.title')}
                        </h1>

                        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr className="border-b border-gray-300">
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.myApplications.job')}</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.myApplications.company')}</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.myApplications.date')}</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.myApplications.status')}</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('pages.myApplications.actions')}</th>
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
                                                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">{t('pages.myApplications.empty')}</td>
                                            </tr>
                                        ) : (
                                            applications.map((app, idx) => {
                                                const statusInfo = statusOptions[app.statut] || { label: app.statut, color: 'bg-gray-400' };
                                                return (
                                                    <tr key={app.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                                            {app.offre?.titre_poste || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {app.offre?.employeur?.nom_entreprise || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {app.created_at ? new Date(app.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-3 h-3 rounded-full ${statusInfo.color}`}></div>
                                                                <span className="text-gray-700 capitalize">{statusInfo.label}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button
                                                                onClick={() => navigate(`/jobOffers/${encodeId(app.offre_id)}`)}
                                                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                                                title="Voir l'offre d'emploi"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                                {t('pages.myApplications.view')}
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

export default MesCandidatures;