import JobCard from "../components/JobCard"
import JobSearchDashboard from "../components/JobSearchDashboard"
import JobCarousel from "../components/JobCarousel"

function Recherche_offre(){
    return (
        <>
        <JobSearchDashboard />
        <JobCard />
        
       <JobCarousel />
   
        </>
    )
}

export default Recherche_offre