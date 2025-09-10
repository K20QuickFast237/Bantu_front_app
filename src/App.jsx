import { Routes, Route } from "react-router-dom";
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
import InscriptionEntreprise from "./pages/app/InscriptionEntreprise";
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
import Dashboard from "./pages/app/DashboardCandidate";

const App = () => {
  return (
    <>
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
          <Route path="/inscriptionEntreprise" element={<InscriptionEntreprise/>}/>
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      
    </>
  );
};

export default App;
