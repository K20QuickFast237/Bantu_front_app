import CTATarif from "../components/CTATarif"
import FaqTarif from "../components/FaqTarif"
import Footer from "../components/Footer"
import HeaderWhite from "../components/HeaderWhite"
import PageWrapper from "../components/PageWrapper"
import PlansTarifs from "../components/PlansTarifs"
import TarifHero from "../components/TarifHero"

function Pricing(){
    return (
        <>
            <PageWrapper>
               <HeaderWhite /> 
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