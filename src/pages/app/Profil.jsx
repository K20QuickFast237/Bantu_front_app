import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/public/Footer";
import AutresRessources from "../../components/app/AutresRessources";
import Competences from "../../components/app/Competences";
import DiplomesFormations from "../../components/app/DiplomesFormations";
import Experiences from "../../components/app/Experiences";
import HeaderProfil from "../../components/app/HeaderProfil"
import Infopersonelles from "../../components/app/infopersonelles"
import PostesRecherches from "../../components/app/PostesRecherches";
import PageWrapper from "../../components/public/PageWrapper";

function Profil() {
    return (
        <>
            <PageWrapper>
                <HeaderProfil />
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