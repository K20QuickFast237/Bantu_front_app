import { useState } from "react";
import HeaderProfil from "@/components/app/HeaderProfil"
import JobMatchingCard from "@/components/app/JobMatchingCard"
import JobSearchHero from "@/components/app/JobSearchHero"
import Footer from "@/components/public/Footer"
import PageWrapper from "@/components/public/PageWrapper"
import ProfileCompletionModal from "@/components/app/ProfileCompletionModal";

function CandidatProfil(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return(
        <>
            <PageWrapper>
                <HeaderProfil/>
                <JobSearchHero onOpenProfileModal={() => setIsModalOpen(true)} />
                <JobMatchingCard/>
                <Footer/>
            </PageWrapper>
            <ProfileCompletionModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </>
    )
}

export default CandidatProfil