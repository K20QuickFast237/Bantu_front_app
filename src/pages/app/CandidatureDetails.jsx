import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';
import api from '@/services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function CandidatureDetail() {
    const { id } = useParams();
    const [candidature, setCandidature] = useState(null);
    const [loadingP, setLoadingP] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        api.put(`/candidatures/${id}`)
            .then(response => {
                setCandidature(response.data || null);
            })
            .catch(error => {
                toast.error(error?.message || "Erreur lors du chargement de la candidature.");
                setCandidature(null);
            });
    }, [id]);

    const handleStatusChange = async (statut) => {
        if (!candidature) return;
        if (statut === 'preselectionne'){
            setLoadingP(true);
            try{
                await api.put(`/candidatures/${id}/status`, {
                    statut,
                    note_ia: candidature.note_ia
                });
                toast.success("Candidature présélectionnée avec succès.");
                setCandidature({ ...candidature, statut });
            }catch (error){
                toast.error(error?.message || "Erreur lors de la mise à jour du statut.");
            }finally {
                setLoadingP(false);
            }
            return;
        }else if (statut === 'rejete'){
            setLoading(true);
            try{
                await api.put(`/candidatures/${id}/status`, {
                    statut,
                    note_ia: candidature.note_ia
                });
                toast.success("Candidature rejetée avec succès.");
                setCandidature({ ...candidature, statut });
            }catch (error){
                toast.error(error?.message || "Erreur lors de la mise à jour du statut.");
            }finally {
                setLoading(false);
            }
            return;
        }
        toast.error("Statut non pris en charge.");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <HeaderProfil />
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Header Section */}
                <div className="bg-orange-50 p-6 mb-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-green-600 mb-2">
                                Candidature | {candidature?.offre?.titre_poste || ''} | {candidature?.cv_genere?.informations?.nom || ''}
                            </h1>
                            <p className="text-gray-700">
                                Date de candidature : {candidature?.created_at ? candidature.created_at.slice(0, 10).split('-').reverse().join('/') : ''}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
                                onClick={() => handleStatusChange("preselectionne")}
                                disabled={loadingP}
                            >
                                {loadingP ? 'Chargement...' : 'Présélectionner'}
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
                                onClick={() => handleStatusChange("rejete")}
                                disabled={loading}
                            >
                                {loading ? 'Chargement...' : 'Rejeter'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Information personnelles Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Information personnelles</h2>
                    <div className="space-y-4">
                        <div>
                            <span className="font-bold text-gray-900">Nom : </span>
                            <span className="text-gray-700">{candidature?.cv_genere?.informations?.nom || ''}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Prénom : </span>
                            <span className="text-gray-700">{candidature?.cv_genere?.informations?.prenom || ''}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Adresse : </span>
                            <span className="text-gray-700">{candidature?.cv_genere?.informations?.adresse || ''}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Email : </span>
                            <span className="text-gray-700">{candidature?.cv_genere?.informations?.email || ''}</span>
                        </div>
                    </div>
                </div>

                {/* Profil candidat Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-6 mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Profil candidat (Profil BantuLink)</h2>
                    <div className="flex gap-8">
                        <a href="#" className="text-green-600 hover:text-green-700 font-medium underline">
                            Voir le profil du candidat
                        </a>
                        <a href="#" className="text-green-600 hover:text-green-700 font-medium underline">
                            Télécharger le cv BantuLink
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}