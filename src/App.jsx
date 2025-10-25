import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
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
import EmailVerification from "./pages/app/EmailVerification";
import LinkedInCallback from "./pages/app/LinkedInCallback";



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
import JobApplicationForm from "./pages/app/JobApplicationForm";
import CandidatProfil from "./pages/app/CandidatProfil";
import CompletionProfessionnel from "./pages/app/InscriptionEntreprise";
import Test from "./components/app/Test";
import Dashboard_gestion_offres from "./pages/app/Dashboard_gestion_offres";
import Dashboardcandidature from "./pages/app/Dashboardcandidature";
import DashboardCandidature from "./pages/app/Dashboard_candidature";
import DashboardCandidatureSpec from "./pages/app/Dashboard_candidature_spec";
import CandidatureDetail from "./pages/app/CandidatureDetails";
import Gestion_offre from "./pages/app/Gestion_offre";
import ProfilCandidatByRecruteur from "./pages/app/ProfilCandidatByRecruteur";

import DashboardLayout from "./components/app/Dash/Layout";
import Dashboard from "./components/app/Dash/Dashboard";
import JobApplicationManagement from "./components/app/Dash/JobApplicationManagement";
import JobPostManagement from "./components/app/Dash/JobPostManagement";
import Chat from "./components/app/Dash/Chat";
import Analytics from "./components/app/Dash/Analytics";
import Setting from "./components/app/Dash/Settings";
import JobApplicationDetail from "./pages/app/CandidatureDetails";

const App = () => {
  return (
    <>
    <Toaster position="top-right" richColors />
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
          <Route path="/test" element={<Test/>}/>
          <Route path="/EmailVerification" element={<EmailVerification/>}/>
          <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
          <Route path="/forgotpassword1" element={<ForgotPasswordForm/>}/>
          <Route path="/forgotpasswordconfirmation" element={<ForgotPasswordConfirmation />}/>
          <Route path="/reset-password" element={<ResetPasswordForm/>}/>
        </Route>


        {/* Routes protégées */}
        <Route element={<PrivateRoutes />}>
          <Route path="/WhatDoYouWantToDo" element={<WhatDoYouWantToDo/>}/>
          <Route path="/Dashboard_gestion_offres" element={<Dashboard_gestion_offres/>}/>
          <Route path="/dashboard_candidature" element={<DashboardCandidature />} />
          {/* <Route path="/candidature_detail/:id" element={<CandidatureDetail />} /> */}
          <Route path="/gestion_offre" element={<Gestion_offre />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/inscriptionEntreprise" element={<CompletionProfessionnel/>}/>
          <Route path="/dashboardEntreprise" element={<DashboardEntreprise/>}/>
          <Route path="/rechercheOffre" element={<Recherche_offre/>}/>
          <Route path="/dashboardrecruteurprofil" element={<DashboardRecruteurprofil />}/>
          <Route path="/jobOffers/:id" element={<JobOffersPage/>}/>
          <Route path="/jobApplicationform/:id" element={<JobApplicationForm/>}/>
          <Route path="/candidatProfil" element={<CandidatProfil/>}/>
          <Route path="/Dashboardcandidature" element={<Dashboardcandidature/>}/>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job-application" element={<JobApplicationManagement />} />
            <Route path="/job-application/:id" element={<JobApplicationDetail />} />
            <Route path="/profil_candidat_by_recruteur/:id" element={<ProfilCandidatByRecruteur />} />
            <Route path="/dashboard_candidature_spec/:id" element={<DashboardCandidatureSpec />} />
            <Route path="/job-post" element={<JobPostManagement />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/createJob" element={<Create_job/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
