import React, { useState, useEffect } from 'react';
import { ChevronDown, Download, Eye } from 'lucide-react';
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';
import api from '@/services/api';
import { Link } from 'react-router-dom';

export default function DashboardCandidature() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [offerFilter, setOfferFilter] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [offersList, setOffersList] = useState([]);

    useEffect(() => {
        api.get('/candidatures')
            .then(response => {
                const data = response.data || [];
                setCandidates(data);
                setFilteredCandidates(data);
            })
            .catch(() => {
                setCandidates([]);
                setFilteredCandidates([]);
            });

        // Récupérer les offres via la route des offres
        api.get('/mesoffres')
            .then(response => {
                const data = response.data?.data || [];
                setOffersList(data.map(o => ({
                    id: o.id,
                    titre_poste: o.titre_poste
                })));
            })
            .catch(() => setOffersList([]));
    }, []);

    const handleFilter = () => {
        let filtered = candidates;

        if (offerFilter) {
            filtered = filtered.filter(c => c.offre && String(c.offre.id) === offerFilter);
        }
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
        setOfferFilter('');
        setFilteredCandidates(candidates);
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
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Offres</label>
                                <select
                                    value={offerFilter}
                                    onChange={(e) => setOfferFilter(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 appearance-none bg-white cursor-pointer"
                                >
                                    <option value="">Toutes les offres</option>
                                    {offersList.map(offer => (
                                        <option key={offer.id} value={offer.id}>{offer.titre_poste}</option>
                                    ))}
                                </select>
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

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-300 rounded">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700 w-16"></th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Nom de candidat</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Offre d'emploi</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Addresse</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCandidates.map((candidate, idx) => (
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
                                                <div className={`w-3 h-3 rounded-full bg-gray-300`}></div>
                                                <span className="text-gray-700">{candidate.statut || ''}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/candidature_detail/${candidate.id}`}>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">Afficher</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}