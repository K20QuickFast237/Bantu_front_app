import Footer from "../../components/Footer";
import AutresRessources from "../components/AutresRessources";
import Competences from "../components/Competences";
import DiplomesFormations from "../components/DiplomesFormations";
import Experiences from "../components/Experiences";
import Header from "../components/Header"
import Infopersonelles from "../components/infopersonelles"
import PostesRecherches from "../components/PostesRecherches";
import PageWrapper from "../../components/PageWrapper";

function Profil (){
    return(
        <>
        <PageWrapper>   
            <Header />
            <Infopersonelles />
            <PostesRecherches />
            <Experiences />
            <Competences />
            <DiplomesFormations />
            <AutresRessources />
            <Footer />
        </PageWrapper>
        </>
    )
};

export default Profil;