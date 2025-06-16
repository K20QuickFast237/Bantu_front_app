import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import SearchIcon from '../assets/Search.png'; 
import AmericaIcon from '../assets/America.png'; 
import ChatIcon from '../assets/Chat.png';                                                                                          
import OnlineStoreIcon from '../assets/Online Store.png'; 
import SecurityLockIcon from '../assets/Security Lock.png'; 
import GraffittiRedIcon from '../assets/Grafitti.png'; 
import GraffittiBlueIcon from '../assets/graphe.png'; 
import imggroupe from '../assets/groupe.png'; 



const FeatureSection = () => {
  return (
    <>
    <section className='bg-gradient-to-br w-full h-auto  from-purple-300 via-white to-white py-16 px-13 font-sans text-gray-800'>
        <h2 className="text-3xl font-bold text-center mb-30 text-gray-900">
            FONCTIONNALITÉS
            <div className="w-10 h-1 bg-blue-500 ml-100 mt-3 rounded"></div> 
        </h2>

        <img src={GraffittiBlueIcon} alt="Decorative lines" className=" h-17 w-16 mt-[-100px] " />

        {/* bantu hire */}
        <div className='flex mx-11 w-full mb-20'>
           <div className='w-1/3 block'>
              <h3 className="text-3xl ml-[-9px] mb-5  md:text-4xl font-bold text-gray-900 leading-tight"> 
              BantuHire — Le <br />Travail Vous Trouve
              </h3>  
              <p className="text-gray-600 font-light max-w-sm ml-[-3px]">
              La plateforme qui connecte talents et <br />recruteurs en un clic.
              </p>         
           </div>


           <div className='w-1/5 '>
                <div className="flex flex-col items-start text-left">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                       <img src={SearchIcon} alt="Search icon" className="" /> 
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">Recherche Simplifiée</h4>
                  <p className="text-gray-600 text-sm font-light">
                  Trouver rapidement un emploi selon vos critères.
                  </p>
            </div>          
           </div>


           <div className='w-1/4 ml-5'>
                <div className="flex flex-col items-start text-left">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                       <img src={AmericaIcon} alt="Search icon" className="" /> 
                  </div>
                  <h4 className="text-lg   font-bold mb-2 text-gray-900">Réseautage & Certifications</h4>
                  <p className="text-gray-600 text-sm font-light">
                  Développez votre réseau et obtenez des badges.
                  </p>
            </div>          
           </div>



           <div className='w-1/5 ml-5'>
                <div className="flex flex-col items-start text-left">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                       <img src={ChatIcon} alt="Search icon" className="" /> 
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">Messagerie Directe</h4>
                  <p className="text-gray-600 font-light">
                  Échangez avec candidats / recruteurs.
                  </p>
            </div>          
           </div>


           
        </div>

 
        <img src={GraffittiRedIcon} alt="Decorative lines" className=" h-17 w-16 mt-[-40px] ml-80" /> 

        {/* bantu market */}
        <div className='flex mx-11 w-full mt-[-10px] '>
           <div className='w-1/3 block'>
              <h3 className="text-3xl ml-[-9px] mb-5  md:text-4xl font-bold text-gray-900 leading-tight"> 
              BantuMarket — Le <br />commerce sans frontières
              </h3>  
              <p className="text-gray-600 font-light max-w-sm ml-[-3px]">
              La plateforme qui connecte talents et <br /> recruteurs en un clic.
              </p>         
           </div>


           <div className='w-1/5 '>
                <div className="flex flex-col items-start text-left">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                       <img src={OnlineStoreIcon} alt="Search icon" className="" /> 
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">Boutique Personnalisée</h4>
                  <p className="text-gray-600 text-sm font-light">
                   Créez et gérez facilement votre propre boutique.
                  </p>
            </div>          
           </div>


           <div className='w-1/4 ml-5'>
                <div className="flex flex-col items-start text-left">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                       <img src={SecurityLockIcon} alt="Search icon" className="" /> 
                  </div>
                  <h4 className="text-lg   font-bold mb-2 text-gray-900">Paiement Sécurisé</h4>
                  <p className="text-gray-600 text-sm font-light">
                  Transactions protégées et livraisons suivies.
                  </p>
            </div>          
           </div>



           <div className='w-1/5 ml-5'>
                <div className="flex flex-col items-start text-left">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                       <img src={ChatIcon} alt="Search icon" className="" /> 
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">Chat Avec Clients</h4>
                  <p className="text-gray-600 font-light">
                  Répondez directement aux questions des acheteurs.
                  </p>
            </div>          
           </div>

      
           
        </div>
    </section>
    <section className="bg-white  px-7 font-sans text-gray-800"> {/* Fond blanc, padding vertical et horizontal */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">

          {/* Colonne de gauche: Image du groupe et du téléphone */}
          <div className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0">
            <img
              src={imggroupe}
              alt="Community services illustration"
              className="w-full max-w-lg h-auto object-contain" // Ajusté la taille pour être fidèle à l'image
            />
          </div>

          {/* Colonne de droite: Texte et bouton */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-16 relative">
            {/* Lignes décoratives oranges */}
            <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 lg:translate-x-0">
              <img src={GraffittiRedIcon} alt="Decorative lines" className="h-10 w-auto rotate-90" /> {/* Rotation pour correspondre à l'image */}
            </div>

            <h2 className="text-4xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
              Les Services Communautaires <br />Appellent, Pas Besoin De Les <br />Retarder
            </h2>
            <p className="text-gray-600 font-light text-lg max-w-lg mb-10">
              Échangez, Apprenez, Grandissez Ensemble. Freelancers, <br />Recruteurs, Vendeurs Et Acheteurs Vous Attendent.
            </p>
            <Link
              to="/rejoindre-communaute" // Ou la route appropriée
              className="inline-block px-10 py-3 bg-gray-800 text-white text-lg font-semibold rounded-full shadow-lg
                         hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Rejoindre La Communauté
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;