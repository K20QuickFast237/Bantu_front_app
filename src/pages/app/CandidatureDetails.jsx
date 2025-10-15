import React, { useState, useEffect } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';
import api from '@/services/api';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import BantulinkLoader from '@/components/ui/BantulinkLoader';

export default function CandidatureDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [candidature, setCandidature] = useState(location.state?.candidate || null);
    const [offreId, setOffreId] = useState(location.state?.offreId || null);
    const [loadingP, setLoadingP] = useState(false);
    const [loading, setLoading] = useState(false);

    // Si state vide, fallback (ex. : refresh page), toast et redirect
    useEffect(() => {
        if (!candidature && id) {
            toast.error("Données de candidature manquantes. Retour à la liste.");
            navigate(`/dashboard_candidature_spec/${offreId || ''}`);
        }
    }, [candidature, id, offreId, navigate]);

    // Debug temporaire : Log structure des infos
    useEffect(() => {
        if (candidature) {
            console.log('Structure candidature pour debug:', {
                particulier: candidature.particulier,
                cv_genere: candidature.cv_genere,
                raw: candidature
            });
        }
    }, [candidature]);

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
                // Retour à liste pour refetch et appliquer filtre 24h
                navigate(`/dashboard_candidature_spec/${offreId}`);
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
                // Retour à liste pour refetch et appliquer filtre 24h
                navigate(`/dashboard_candidature_spec/${offreId}`);
            }catch (error){
                toast.error(error?.message || "Erreur lors de la mise à jour du statut.");
            }finally {
                setLoading(false);
            }
            return;
        }
        toast.error("Statut non pris en charge.");
    };

    if (!candidature) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <HeaderProfil />
                <BantulinkLoader />
                <Footer />
            </div>
        );
    }

    const { type, statut = 'candidature', particulier, offre, motivation_text, cv_url, certificats, cv_genere } = candidature;
    
    // Extraction robuste : Priorise particulier, fallback cv_genere ou champs plats ; prenom null si vide
    const infos = {
        nom: particulier?.nom || cv_genere?.informations?.nom || candidature.nom || 'N/A',
        prenom: particulier?.prenom || cv_genere?.informations?.prenom || candidature.prenom || null, // null si vide (pas 'N/A')
        email: particulier?.email || cv_genere?.informations?.email || candidature.email || 'N/A',
        telephone: particulier?.telephone || cv_genere?.informations?.telephone || candidature.telephone || 'N/A',
        adresse: particulier?.adresse || cv_genere?.informations?.adresse || candidature.adresse || 'N/A',
        date_naissance: particulier?.date_naissance || cv_genere?.informations?.date_naissance || candidature.date_naissance || 'N/A',
        titre_professionnel: particulier?.titre_professionnel || cv_genere?.informations?.titre_professionnel || candidature.titre_professionnel || 'N/A',
        resume_profil: particulier?.resume_profil || cv_genere?.informations?.resume_profil || candidature.resume_profil || 'N/A'
    };

    // Nom complet sans N/A : Juste nom si pas prénom
    const nomComplet = infos.prenom ? `${infos.nom} ${infos.prenom}` : infos.nom;

    // Cercle couleur pour statut
    const circleColor = statut === 'preselectionne' ? 'bg-orange-500' : statut === 'rejete' ? 'bg-red-500' : 'bg-gray-800';

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <HeaderProfil />
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Header Section – Modifié : Juste "Nom | Offre", flèche retour */}
                <div className="bg-orange-50 p-6 mb-8">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {/* Flèche retour */}
                            <button
                                onClick={() => navigate(`/dashboard_candidature_spec/${offreId}`)}
                                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                                aria-label="Retour à la liste"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-green-600 mb-2">
                                    Candidature | {offre?.titre_poste || ''} | {nomComplet}
                                </h1>
                                <p className="text-gray-700">
                                    Date de candidature : {candidature.created_at ? candidature.created_at.slice(0, 10).split('-').reverse().join('/') : ''}
                                </p>
                            </div>
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
                            <span className="text-gray-700">{infos.nom}</span>
                        </div>
                        {/* Condition : N'affiche que si non vide/null/'N/A' */}
                        {infos.prenom && infos.prenom !== 'N/A' && (
                            <div>
                                <span className="font-bold text-gray-900">Prénom : </span>
                                <span className="text-gray-700">{infos.prenom}</span>
                            </div>
                        )}
                        <div>
                            <span className="font-bold text-gray-900">Adresse : </span>
                            <span className="text-gray-700">{infos.adresse}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Email : </span>
                            <span className="text-gray-700">{infos.email}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Téléphone : </span>
                            <span className="text-gray-700">{infos.telephone}</span>
                        </div>
                    </div>
                </div>

                {/* Profil candidat Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-6 mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Profil candidat (Profil BantuLink)</h2>
                    <div className="flex gap-8">
                        <Link to={`/profil_candidat_by_recruteur/${candidature.particulier_id || candidature.candidat_id}`} className="text-green-600 hover:text-green-700 font-medium underline">
                            Voir le profil du candidat
                        </Link>
                        <a href={cv_url || '#'} className="text-green-600 hover:text-green-700 font-medium underline flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            Télécharger le cv BantuLink
                        </a>
                    </div>
                </div>

                {/* Contenu conditionnel */}
                {type === 'profil' ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Lettre de motivation</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">{motivation_text || 'Aucune lettre fournie'}</p>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Infos personnelles complètes</h3>
                        <ul className="text-gray-700 space-y-1 list-disc pl-4">
                            <li><strong>Date de naissance :</strong> {infos.date_naissance}</li>
                            <li><strong>Titre professionnel :</strong> {infos.titre_professionnel}</li>
                            <li><strong>Résumé :</strong> {infos.resume_profil}</li>
                        </ul>
                    </div>
                ) : (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Documents joints</h2>
                        {cv_url && (
                            <div className="mb-4 p-3 bg-white rounded border">
                                <p className="font-medium">CV :</p>
                                <a href={cv_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Télécharger CV</a>
                            </div>
                        )}
                        {certificats && certificats.length > 0 && (
                            <div>
                                <p className="font-medium mb-2">Certificats :</p>
                                <ul className="space-y-2">
                                    {certificats.map((cert, i) => (
                                        <li key={i} className="p-3 bg-white rounded border">
                                            <a href={cert.url || cert} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                Certificat {i + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Statut – Cercle mis à jour avec backend */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Statut</h2>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${circleColor}`}></div>
                        <span className="text-gray-700 capitalize">{statut}</span>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}