import React from "react";

const features = [
  {
    title: "Smart Job Search",
    desc: "Find offers tailored to your profile with our AI-powered matching algorithm that learns your preferences.",
  },
  {
    title: "Real-time chat",
    desc: "Talk to recruiters instantly and get immediate feedback on your applications and interview requests.",
  },
  {
    title: "Video Interviews",
    desc: "Get hired from your couch with seamless video interviews integrated directly into the platform.",
  },
  {
    title: "Skill Certifications",
    desc: "Validate your skills, stand out from the crowd with verified certifications and skill assessments.",
  },
];

const FonctionnalitesCareer = () => {
  return (
    <section className="relative w-full bg-[#EBF4FF] py-14 overflow-hidden">
      {/* Vague top */}
      <div className="absolute top-0 left-0 w-full z-0 py-4 px-10">
        <svg
          className="w-full h-[48px] md:h-[120px]"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            fill="#fff"
          />
        </svg>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-30">
        <div className="flex flex-col items-center mb-8">
          <span className="bg-[#1a2979] text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
            BantuHire
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2979] text-center mb-2">
            Your Career Journey Starts Here
          </h2>
          <p className="text-gray-500 text-center max-w-2xl">
            Connect with opportunities, showcase your skills, and land your dream job with intelligent matching.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-14">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start"
            >
              <div className="w-full mb-4">
                <div className="bg-[#223e88] rounded-xl w-full h-48 flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-semibold text-center">
                    {f.title}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-[#223e88] font-bold mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Vague bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 pt-4 px-10">
        <svg
          className="w-full h-[48px] md:h-[80px]"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z"
            fill="#FFF7ED"
          />
        </svg>
      </div>
    </section>
  );
};

export default FonctionnalitesCareer;