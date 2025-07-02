import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Composants des pages
function Home() {
  return (
    <div className="page">
      <h1>Accueil</h1>
      <p>Bienvenue sur notre site</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>À Propos</h1>
      <p>Découvrez notre histoire et notre équipe</p>
    </div>
  );
}

function Services() {
  return (
    <div className="page">
      <h1>Nos Services</h1>
      <p>Découvrez nos différents services</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h1>Contact</h1>
      <p>Contactez-nous pour plus d'informations</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page">
      <h1>404 - Page Non Trouvée</h1>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/about">À Propos</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 