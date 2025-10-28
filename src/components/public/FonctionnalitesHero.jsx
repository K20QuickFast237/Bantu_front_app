import React from "react";

const FonctionnalitesHero = () => {
  return (
    <section className="relative w-full py-18 bg-[#f4f7fb] overflow-hidden">
      {/* Rectangle vert avec texte centré */}
      <div className="flex justify-center pt-12 relative z-10">
        <div
          className="rounded-2xl shadow-2xl w-[90vw] max-w-[420px] h-[160px] md:h-[220px] flex items-center justify-center bg-[#19b885]"
        >
          <span className="text-white text-2xl md:text-3xl font-bold select-none">
            App Mockup
          </span>
        </div>
      </div>
      {/* Double vague SVG en arrière-plan */}
      <div className="absolute left-0 right-0 bottom-0 z-0 w-full pointer-events-none">
        {/* Vague du bas (vert) */}
        <svg
          className="w-full h-[320px] md:h-[500px] absolute bottom-0 left-0"
          viewBox="0 0 1440 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,200 480,20 720,120 C960,220 1200,40 1440,120 L1440,420 L0,420 Z"
            fill="#19b885"
            opacity="0.07"
          />
        </svg>
        {/* Vague du haut (bleu) */}
        <svg
          className="w-full h-[320px] md:h-[400px] absolute bottom-0 left-0"
          viewBox="0 0 1440 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,140 C240,240 480,80 720,180 C960,280 1200,100 1440,200 L1440,420 L0,420 Z"
            fill="#0c1f69"
            opacity="0.07"
          />
        </svg>
      </div>
      {/* Texte et boutons */}
      <div className="relative z-20 flex flex-col items-center mt-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-2 text-gray-900">
          All-in-One Power.
        </h1>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          <span className="text-[#19b885]">Two Worlds.</span>
          <span className="text-[#0c1f69]">One App.</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8">
          From finding jobs to launching your business,<br />
          BantuLink is your launchpad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center gap-2 px-7 py-3 bg-[#1a2979] text-white font-semibold rounded-xl shadow hover:bg-[#16205c] transition">
            {/* Briefcase icon with white border */}
            <span className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                <rect x="6" y="7" width="12" height="10" rx="2" stroke="#fff" strokeWidth="2" fill="none"/>
                <path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="#fff" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            Try BantuHire
          </button>
          <button className="flex items-center gap-2 px-7 py-3 bg-[#ffb400] text-white font-semibold rounded-xl shadow hover:bg-[#e09e00] transition">
            {/* Market/cart icon with white border */}
            <span className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                <circle cx="9" cy="20" r="1" fill="#fff" />
                <circle cx="17" cy="20" r="1" fill="#fff" />
                <path d="M5 6h2l1 7h8l1-7h2" stroke="#fff" strokeWidth="2" fill="none"/>
                <rect x="7" y="6" width="10" height="7" rx="2" stroke="#fff" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            Explore BantuMarket
          </button>
        </div>
      </div>
    </section>
  );
};

export default FonctionnalitesHero;