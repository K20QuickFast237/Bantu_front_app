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
import Postuler from "./Application/pages/Postuler";
import Recruter from "./Application/pages/Recruter";
import Acheter from "./Application/pages/Acheter";
import Vendre from "./Application/pages/Vendre";

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
        <Route path="/postuler" element={<Postuler/>}/>
        <Route path="/recruter" element={<Recruter/>}/>
        <Route path="/acheter" element={<Acheter/>}/>
        <Route path="/vendre" element={<Vendre/>}/>
      </Routes>
    </>
  );
};

export default App;