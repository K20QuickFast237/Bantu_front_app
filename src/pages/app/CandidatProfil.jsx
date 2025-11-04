import { useState } from "react";
import HeaderProfil from "@/components/app/HeaderProfil"
import JobCard from "@/components/app/JobMatchingCard"
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
           <JobCard/>
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