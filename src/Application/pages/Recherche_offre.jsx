import JobCard from "../components/JobCard"
import JobSearchDashboard from "../components/JobSearchDashboard"
import JobCarousel from "../components/JobCarousel"
import Header from "../components/Header"
import Footer from "../../components/Footer"

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