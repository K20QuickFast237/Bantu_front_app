import HeaderProfil from "@/components/app/HeaderProfil"
import JobCard from "@/components/app/JobMatchingCard"
import JobSearchHero from "@/components/app/JobSearchHero"
import Footer from "@/components/public/Footer"
import PageWrapper from "@/components/public/PageWrapper"

function CandidatProfil(){
    return(
        <>
        <PageWrapper>
           <HeaderProfil/>
           <JobSearchHero />
           <JobCard/>
           <Footer/>
        </PageWrapper>
        </>
    )
}

export default CandidatProfil