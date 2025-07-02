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
import Create_job from "./Application/pages/create_job";
import DashboardRecruteurprofil from "./Application/pages/Dashboard_Recruteurprofil";

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
        <Route path="/dashboardrecruteurprofil" element={<DashboardRecruteurprofil />}/>
        
      </Routes>
    </>
      );
};

export default App;
