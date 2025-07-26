import JobCard from "../../components/app/JobCard"
import JobSearchDashboard from "../../components/app/JobSearchDashboard"
import JobCarousel from "../../components/app/JobCarousel"
import Header from "../../components/app/Header"
import Footer from "../../components/public/Footer"

function Recherche_offre(){
    return (
        <>
        <Header />
        <JobSearchDashboard />
        <JobCard />
        
       <JobCarousel />
       <Footer />
        </>
    )
}

export default Recherche_offre