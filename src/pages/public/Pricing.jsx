import CTATarif from "../../components/public/CTATarif"
import FaqTarif from "../../components/public/FaqTarif"
import Footer from "../../components/public/Footer"
import HeaderWhite from "../../components/public/HeaderWhite"
import PageWrapper from "../../components/public/PageWrapper"
import PlansTarifs from "../../components/public/PlansTarifs"
import TarifHero from "../../components/public/TarifHero"

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