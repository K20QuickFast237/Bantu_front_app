import FonctionnalitesHero from "@/components/public/FonctionnalitesHero";
import FonctionnalitesCareer from "@/components/public/FonctionnalitesCareer";
import FonctionnalitesBusiness from "@/components/public/FonctionnalitesBusiness";
import Header from "../../components/public/Header";
import Footer from '../../components/public/Footer';
import PageWrapper from "../../components/public/PageWrapper";

function Fonctionnalites(){
    return (
        <>
         <PageWrapper>
            <Header />
            <FonctionnalitesHero/>
            <FonctionnalitesCareer/>
            <FonctionnalitesBusiness/>
            <Footer />
          </PageWrapper> 
        </>
    )
}

export default Fonctionnalites