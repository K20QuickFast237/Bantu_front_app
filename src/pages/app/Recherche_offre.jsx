import JobCard from "../../components/app/JobCard"
import JobSearchDashboard from "../../components/app/JobSearchDashboard"
import JobCarousel from "../../components/app/JobCarousel"
import HeaderProfil from "../../components/app/HeaderProfil"
import Footer from "../../components/public/Footer"

function Recherche_offre(){
    return (
        <>
        <HeaderProfil />
        <JobSearchDashboard />
        <JobCard />
        
       <JobCarousel />
       <Footer />
        </>
    )
}

export default Recherche_offre