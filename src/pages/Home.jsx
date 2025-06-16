import React from 'react';
import Hero from "../components/Herosection";
import PageWrapper from '../components/PageWrapper';
import StatsSection from '../components/StatsSection';
import FeatureSection from '../components/FeatureSection';

function Home() {
  return (
    <>
      <PageWrapper>
      <Hero />
      <StatsSection />
      <FeatureSection />
      <div className="text-center mt-10 text-xl font-medium">Ma page d'accueil</div>

      </PageWrapper>
    </>
  );
}

export default Home;
