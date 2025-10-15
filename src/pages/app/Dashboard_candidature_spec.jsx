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
    const [loading, setLoading] = useState(true);

    // Fonction pour filtrer les candidatures >24h
    const filterOldCandidatures = (data) => {
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return data.filter(c => {
            if (!c.created_at) {
                console.warn('Candidature sans created_at:', c.id);
                return false;
            }
            const createdDate = new Date(c.created_at);
            if (isNaN(createdDate.getTime())) {
                console.warn('Date invalide pour candidature:', c.id, c.created_at);
                return false;
            }
            return createdDate >= twentyFourHoursAgo;
        });
    };

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }
        console.log('Fetch candidatures pour offre ID:', id);
        setLoading(true);
        api.get(`/offres/${id}/candidatures`)
            .then(response => {
                console.log('Réponse brute candidatures:', response.data); // Debug
                const data = response.data || [];
                const filteredOld = filterOldCandidatures(data);
                console.log('Candidatures filtrées (24h):', filteredOld);
                setCandidates(filteredOld);
                setFilteredCandidates(filteredOld);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur fetch candidatures:', error);
                setCandidates([]);
                setFilteredCandidates([]);
                setLoading(false);
            });
    }, [id]);

    const handleFilter = () => {
        let filtered = candidates;
        if (fromDate) {
            filtered = filtered.filter(c => c.created_at && c.created_at.slice(0, 10) >= fromDate);
        }
        if (toDate) {
            filtered = filtered.filter(c => c.created_at && c.created_at.slice(0, 10) <= toDate);
        }
        filtered = filterOldCandidatures(filtered);
        setFilteredCandidates(filtered);
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');
        const filteredOld = filterOldCandidatures(candidates);
        setFilteredCandidates(filteredOld);
    };

    const handleViewCandidate = (candidate) => {
        const realId = candidate.id || candidate.candidature_id || 'unknown';
        navigate(`/candidature_detail/${realId}`, { 
            state: { 
                candidate, 
                offreId: id 
            } 
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <HeaderProfil />
                <div className="text-gray-500">Chargement des candidatures...</div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <HeaderProfil />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-green-600 mb-6">Candidature</h1>

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

                    <div className="flex gap-4 mb-6">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                            Configurer l'envoi des mails
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-auto">
                            Exporter les données
                        </button>
                    </div>

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
                                        const realId = candidate.id || candidate.candidature_id || idx; // Fallback ID pour key/log
                                        const candidateStatut = candidate.statut || 'candidature';
                                        const circleColor = candidateStatut === 'preselectionne' ? 'bg-orange-500' : candidateStatut === 'rejete' ? 'bg-red-500' : 'bg-gray-800';
                                        // Extraction robuste comme CandidatureDetails (multi-fallback pour nom)
                                        const nomCandidat = candidate.particulier?.nom || candidate.cv_genere?.informations?.nom || candidate.nom || '';
                                        // Extraction adresse (simple, comme original)
                                        const adresseCandidat = candidate.particulier?.adresse || '';
                                        // Debug pour premier candidat
                                        if (idx === 0) {
                                            console.log('Full structure premier candidat ID ' + realId + ':', candidate);
                                            console.log('Particulier du premier candidat:', candidate.particulier);
                                            console.log('Nom extractions: particulier.nom="' + (candidate.particulier?.nom || 'null') + '", cv_genere.nom="' + (candidate.cv_genere?.informations?.nom || 'null') + '", candidate.nom="' + (candidate.nom || 'null') + '"');
                                        }
                                        console.log('Nom candidat affiché:', nomCandidat, 'Adresse:', adresseCandidat, 'pour ID:', realId);
                                        return (
                                            <tr key={realId} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 text-gray-700 font-medium">{idx + 1}</td>
                                                <td className="px-6 py-4 text-green-600 font-medium">
                                                    {nomCandidat}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {candidate.offre?.titre_poste || ''}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {adresseCandidat}
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