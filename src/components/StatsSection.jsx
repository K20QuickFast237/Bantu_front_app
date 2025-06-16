import React from 'react';

const StatsSection = () => {
  return (
    <section className="bg-[#2196F3] py-12 px-11  font-sans text-white"> 
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"> 

        
        <div className="flex  items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold mb-1">10K+</span>
          <span className="text-lg text-left ml-1 font-light">Utilisateurs Actifs</span>
        </div>

        
        <div className="flex  items-center justify-center border-l border-white border-opacity-30">
          <span className="text-4xl ml-2 md:text-5xl font-bold mb-1">2K+</span>
          <span className="text-lg text-left ml-2 font-light">Prestataires Certifiés</span>
        </div>

        
        <div className="flex  items-center justify-center border-l border-white border-opacity-30"> 
          <span className="text-4xl ml-2 md:text-5xl font-bold mb-1">1,5K+</span>
          <span className="text-lg text-left ml-1 font-light">Entreprises Inscrites</span>
        </div>

       
        <div className="flex  items-center justify-center border-l border-white border-opacity-30">
          <span className="text-4xl ml-2 md:text-5xl font-bold mb-1">98%</span>
          <span className="text-lg text-left ml-1 font-light">De Satisfaction Client</span>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;