import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Fonctionnalites from "./pages/Fonctionnalites"
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      
      <Routes>
        {/* <ScrollToTop > */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/features" element={<Fonctionnalites/>} />
        {/* <Route path="/pricing" element={<Pricing/>} /> */}
        {/* </ScrollToTop> */}
      </Routes>
    </>
  );
};

export default App;
