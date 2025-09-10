import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Fonctionnalites from "./pages/public/Fonctionnalites";
import ScrollToTop from "./components/public/ScrollToTop";
import Pricing from "./pages/public/Pricing";
import Support from "./pages/public/support";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";



import WhatDoYouWantToDo from "./pages/app/WhatDoYouWantToDo";
import Profil from "./pages/app/Profil";
import DashboardEntreprise from "./pages/app/DashboardEntreprise";
import Recherche_offre from "./pages/app/Recherche_offre";
import Create_job from "./pages/app/Create_job";
import DashboardRecruteurprofil from "./pages/app/Dashboard_Recruteurprofil";
import ForgotPasswordForm from "./pages/app/ForgotPasswordForm";
import ForgotPasswordConfirmation from "./pages/app/ForgotPasswordConfirmation";
import ResetPasswordForm from "./pages/app/ResetPasswordForm";
import JobOffersPage from "./pages/app/JobOffersPage";
import BantuLinkHome from "./pages/app/BantuLinkHome";
import BantuHireHome from "./pages/app/BantuHireHome";
import DashboardCandidate from "./pages/app/DashboardCandidate";
import CompletionProfessionnel from "./pages/app/InscriptionEntreprise";
import CandidateFeed from "./pages/app/CandidateFeed";
import CandidateApplications from "./pages/app/CandidateApplications";
import CandidateCvs from "./pages/app/CandidateCvs";
import CandidateJobs from "./pages/app/CandidateJobs";
import CandidateSettings from "./pages/app/CandidateSettings";
import MyProfil from "./pages/app/MyProfil";


const App = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <ScrollToTop />
      <Routes>
        {/* Routes publiques */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Fonctionnalites />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/support" element={<Support />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>


        {/* Routes protégées */}
        <Route element={<PrivateRoutes />}>
          <Route path="/WhatDoYouWantToDo" element={<WhatDoYouWantToDo/>}/>
          <Route path="/profil" element={<Profil />} />
          <Route path="/dashboardEntreprise" element={<DashboardEntreprise/>}/>
          <Route path="/rechercheOffre" element={<Recherche_offre/>}/>
          <Route path="/createJob" element={<Create_job/>}/>
          <Route path="/dashboardrecruteurprofil" element={<DashboardRecruteurprofil />}/>
          <Route path="/forgotpassword1" element={<ForgotPasswordForm/>}/>
          <Route path="/forgotpasswordconfirmation" element={<ForgotPasswordConfirmation />}/>
          <Route path="/reset-password" element={<ResetPasswordForm/>}/>
          <Route path="/jobOffers" element={<JobOffersPage/>}/>
          <Route path="/homepage" element={<BantuLinkHome />} />
          <Route path="/hirehome" element={<BantuHireHome />} />
          <Route path="/markethome" element={<BantuHireHome />} />
          <Route path="/inscriptionentreprise" element={<CompletionProfessionnel />} />
          
          {/* Route Layout pour le Dashboard Candidat */}
          <Route path="/dashboard/candidate" element={<DashboardCandidate />}>
            <Route index element={<CandidateFeed />} />
            <Route path="applications" element={<CandidateApplications />} />
            <Route path="cvs" element={<CandidateCvs />} />
            <Route path="jobs" element={<CandidateJobs />} />
            <Route path="settings" element={<CandidateSettings />} />
            <Route path="profil" element={<MyProfil />} />
          </Route>
          
        </Route>
      </Routes>
    </>
  );
};

export default App;
