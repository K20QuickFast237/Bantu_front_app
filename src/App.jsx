import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Fonctionnalites from "./pages/Fonctionnalites";
import ScrollToTop from "./components/ScrollToTop";
import Pricing from "./pages/Pricing";
import Support from "./pages/support";
import Register from "./pages/Register";
import Login from "./pages/Login";


import EmailVerification from "./Application/pages/EmailVerification";
import WhatDoYouWantToDo from "./Application/pages/WhatDoYouWantToDo";
import Profil from "./Application/pages/Profil";
import InscriptionEntreprise from "./Application/pages/InscriptionEntreprise";
import DashboardEntreprise from "./Application/pages/DashboardEntreprise";
import Recherche_offre from "./Application/pages/Recherche_offre";
import Create_job from "./Application/pages/Create_job";
import DashboardRecruteurprofil from "./Application/pages/Dashboard_Recruteurprofil";
import ForgotPasswordForm from "./Application/pages/ForgotPasswordForm";
import ForgotPasswordConfirmation from "./Application/pages/ForgotPasswordConfirmation";
import ResetPasswordForm from "./Application/pages/ResetPasswordForm";
import OffreRecruteur from "./Application/pages/OffreRecruteur";
import CandidateProfile from "./Application/pages/OffreRecruteur"
import RecruiterProfile from "./Application/pages/RecruiterProfile";
import JobOffersPage from "./Application/pages/JobOffersPage";
import JobApplicationForm from "./Application/pages/JobApplicationForm";
import JobApplicationPage2 from "./Application/pages/JobApplicationPage2";

const App = () => {
  return (
    <>
    
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Fonctionnalites />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route path="/emailVerification" element={<EmailVerification/>}/>
        <Route path="/WhatDoYouWantToDo" element={<WhatDoYouWantToDo/>}/>
        <Route path="/profil" element={<Profil />} />
        <Route path="/inscriptionEntreprise" element={<InscriptionEntreprise/>}/>
        <Route path="/dashboardEntreprise" element={<DashboardEntreprise/>}/>
        <Route path="/rechercheOffre" element={<Recherche_offre/>}/>
        <Route path="/createJob" element={<Create_job/>}/>
        <Route path="offreRecruteur" element={<OffreRecruteur/>}/>
        <Route path="/dashboardrecruteurprofil" element={<DashboardRecruteurprofil />}/>
        <Route path="/forgotpassword1" element={<ForgotPasswordForm/>}/>
        <Route path="/forgotpasswordconfirmation" element={<ForgotPasswordConfirmation />}/>
        <Route path="/reset-password" element={<ResetPasswordForm/>}/>
        <Route path="/profilCandidat" element={<CandidateProfile/>}/>
        <Route path="/recruteurprofile" element={<RecruiterProfile/>}/>
        <Route path="/jobOffers" element={<JobOffersPage/>}/>
        <Route path="/jobApplicationform" element={<JobApplicationForm/>}/>
        <Route path="/jobApplicationPage2" element={<JobApplicationPage2/>}/>
        
      </Routes>
    </>
      );
};

export default App;
