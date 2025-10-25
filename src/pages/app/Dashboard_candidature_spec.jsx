import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
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
                setCandidates(data);
                setFilteredCandidates(data);
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
        setFilteredCandidates(filtered);
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setFilteredCandidates(candidates);
    };

    const handleViewCandidate = (candidate) => {
        const realId = candidate.id || candidate.candidature_id || 'unknown';
        // Correction du chemin pour correspondre à la route définie dans App.jsx
        navigate(`/job-application/${realId}`, { 
            state: { 
                candidate, 
                offreId: id 
            } 
        });
    };
    
    return (
        <div className="min-h-full bg-gray-50 p-6">
            <main className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Candidatures pour l'offre : {loading ? 'Chargement...' : (filteredCandidates[0]?.offre?.titre_poste || 'Inconnue')}
                    </h1>

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
                                <Search className="w-4 h-4 ml-2" />
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
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Aucune candidature trouvée</td>
                                    </tr>
                                ) : (
                                    filteredCandidates.map((candidate, idx) => {
                                        const realId = candidate.id || candidate.candidature_id || idx; // Fallback ID pour key/log
                                        const candidateStatut = candidate.statut || 'candidature';
                                        const circleColor = candidateStatut === 'preselectionne' ? 'bg-orange-500' : candidateStatut === 'rejete' ? 'bg-red-500' : 'bg-gray-800';
                                        return (
                                            <tr key={realId} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 text-gray-700 font-medium">{idx + 1}</td>
                                                <td className="px-6 py-4 text-green-600 font-medium">
                                                    {candidate.particulier?.nom}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {candidate.offre?.titre_poste || ''}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {candidate.particulier?.pays}, {candidate.particulier?.ville}, {candidate.particulier?.adresse}
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
        </div>
    );
}