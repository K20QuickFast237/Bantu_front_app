import CTATarif from "../../components/public/CTATarif"
import FaqTarif from "../../components/public/FaqTarif"
import Footer from "../../components/public/Footer"
import Header from "../../components/public/Header";
import PageWrapper from "../../components/public/PageWrapper"
import PlansTarifs from "../../components/public/PlansTarifs"
import TarifHero from "../../components/public/TarifHero"

function Pricing(){
    return (
        <>
            <PageWrapper>
               <Header /> 
               <TarifHero />
               <PlansTarifs/>
               <FaqTarif />              
               <CTATarif />
               <Footer />
            </PageWrapper>      
        </>
    )
}

export default Pricing