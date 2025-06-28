import React from 'react';

const TarifHero = () => {
  return (
    <section className="flex justify-center items-center pt-30  sm:px-6 ">
      <div className="relative bg-[#36D18C] rounded-3xl w-full max-w-6xl h-[620px] sm:h-[650px] flex flex-col justify-between items-center text-white overflow-hidden shadow-xl">
        {/* Main content - Centered text and button */}
        <div className="flex flex-col items-center justify-center flex-grow text-center  mb-16 px-4 sm:px-8 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-10">
            Choisissez la solution qui va accompagner votre croissance
          </h1>
          <button className="bg-black text-white text-base font-semibold py-3.5 px-9 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            voir nos plans
          </button>
        </div>

        {/* Gradient Overlay at the bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/3" // Adjust height as needed for the visible gradient portion
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
          }}
        ></div>

        {/* Stats section at the bottom - positioned relative to the parent for z-index above gradient */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-20 w-full px-4 sm:px-8 lg:px-12 pb-10">
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-light mb-1">10K+</span>
            <span className="text-sm sm:text-base font-normal opacity-90">Utilisateurs Actifs</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-light mb-1">2K+</span>
            <span className="text-sm sm:text-base font-normal opacity-90">Prestataires certifiés</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-light mb-1">1.5K+</span>
            <span className="text-sm sm:text-base font-normal opacity-90">Entreprise Inscrites</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl sm:text-4xl font-light mb-1">4.0</span>
            <span className="text-sm sm:text-base font-normal opacity-90">De satisfaction client</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TarifHero;