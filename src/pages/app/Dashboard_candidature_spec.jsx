import React, { useState, useEffect } from 'react';
import { ChevronDown, Download, Eye } from 'lucide-react';
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';
import api from '@/services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function DashboardCandidatureSpec() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);

    // Nouvelle fonction pour filtrer les candidatures >24h
    const filterOldCandidatures = (data) => {
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24h avant
        return data.filter(c => {
            if (!c.created_at) return false;
            const createdDate = new Date(c.created_at);
            return createdDate >= twentyFourHoursAgo; // Garde si <24h
        });
    };

    useEffect(() => {
        if (!id) return;
        api.get(`/offres/${id}/candidatures`)
            .then(response => {
                const data = response.data || [];
                const filteredOld = filterOldCandidatures(data); // Applique filtre 24h
                setCandidates(filteredOld);
                setFilteredCandidates(filteredOld);
            })
            .catch(() => {
                setCandidates([]);
                setFilteredCandidates([]);
            });
    }, [id]); // Refetch si id change (ex. : retour de détail)

    const handleFilter = () => {
        let filtered = candidates;

        if (fromDate) {
            filtered = filtered.filter(c => c.created_at && c.created_at.slice(0, 10) >= fromDate);
        }
        if (toDate) {
            filtered = filtered.filter(c => c.created_at && c.created_at.slice(0, 10) <= toDate);
        }
        // Réapplique filtre 24h après filtre date
        filtered = filterOldCandidatures(filtered);
        setFilteredCandidates(filtered);
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');
        const filteredOld = filterOldCandidatures(candidates);
        setFilteredCandidates(filteredOld);
    };

    // Nouvelle fonction pour cliquer "Afficher"
    const handleViewCandidate = (candidate) => {
        navigate(`/candidature_detail/${candidate.id}`, { 
            state: { 
                candidate, 
                offreId: id // Pour retour
            } 
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <HeaderProfil />
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Candidature Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-green-600 mb-6">Candidature</h1>

                    {/* Filter Section */}
                    <div className="bg-orange-50 p-6 rounded-lg mb-8">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Du</label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Au</label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <button
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded flex items-center gap-2"
                                onClick={handleFilter}
                                type="button"
                            >
                                Filtrer
                                <span>🔍</span>
                            </button>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded ml-2"
                                onClick={handleReset}
                                type="button"
                            >
                                Tout afficher
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-6">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                            Configurer l'envoi des mails
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-auto">
                            Exporter les données
                        </button>
                    </div>

                    {/* Table – Cercle statut cohérent */}
                    <div className="overflow-x-auto border border-gray-300 rounded">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700 w-16"></th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Nom de candidat</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Offre d'emploi</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Adresse</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Statut</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCandidates.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Aucune candidature trouvée (ou expirée >24h)</td>
                                    </tr>
                                ) : (
                                    filteredCandidates.map((candidate, idx) => {
                                        const candidateStatut = candidate.statut || 'candidature';
                                        const circleColor = candidateStatut === 'preselectionne' ? 'bg-orange-500' : candidateStatut === 'rejete' ? 'bg-red-500' : 'bg-gray-800';
                                        return (
                                            <tr key={candidate.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 text-gray-700 font-medium">{idx + 1}</td>
                                                <td className="px-6 py-4 text-green-600 font-medium">
                                                    {candidate.particulier?.nom || ''}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {candidate.offre?.titre_poste || ''}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {candidate.particulier?.adresse || ''}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-3 h-3 rounded-full ${circleColor}`}></div>
                                                        <span className="text-gray-700 capitalize">{candidateStatut}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button 
                                                        onClick={() => handleViewCandidate(candidate)}
                                                        className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                                                    >
                                                        Afficher
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}