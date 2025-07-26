// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assurez-vous d'avoir react-router-dom installé

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Fait défiler la fenêtre vers le haut
    window.scrollTo(0, 0);
    // Ou pour un défilement plus doux:
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]); // Exécute cet effet chaque fois que le chemin de l'URL change

  return null; // Ce composant ne rend rien visuellement
}

export default ScrollToTop;