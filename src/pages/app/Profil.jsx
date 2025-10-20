import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/public/Footer";
import AutresRessources from "../../components/app/AutresRessources";
import Competences from "../../components/app/Competences";
import DiplomesFormations from "../../components/app/DiplomesFormations";
import Experiences from "../../components/app/Experiences";
import HeaderProfil from "../../components/app/HeaderProfil"
import Infopersonelles from "../../components/app/infopersonelles"
import PostesRecherches from "../../components/app/PostesRecherches";
import PageWrapper from "../../components/public/PageWrapper";
import ProfileCompletionModal from '@/components/app/ProfileCompletionModal';

function Profil() {
    const { particulier } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onComplete, setOnComplete] = useState(null);

    // Ouvre la modale automatiquement si le profil est incomplet à l'arrivée sur la page
    useEffect(() => {
        if (!particulier || Object.keys(particulier).length === 0) {
            setIsModalOpen(true);
        }
    }, [particulier]);

    const openProfileModal = (onCompleteCallback) => {
        if (!particulier || Object.keys(particulier).length === 0) {
            if (onCompleteCallback) {
                setOnComplete(() => onCompleteCallback);
            }
            setIsModalOpen(true);
        } else if (onCompleteCallback) {
            onCompleteCallback();
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setOnComplete(null);
    };

    return (
        <>
            <PageWrapper>
                <HeaderProfil onOpenProfileModal={openProfileModal} />
                <Infopersonelles onEditClick={() => setIsModalOpen(true)} />
                <ProfileCompletionModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onComplete={onComplete}
                />
                <PostesRecherches />
                <Experiences />
                <Competences />
                <DiplomesFormations />
                <AutresRessources />
                <Footer />
            </PageWrapper>
        </>
    )
};

export default Profil;