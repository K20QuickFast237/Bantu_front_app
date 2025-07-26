import React from 'react';
import Hero from "../../components/public/Herosection";
import PageWrapper from '../../components/public/PageWrapper';
import StatsSection from '../../components/public/StatsSection';
import FeatureSection from '../../components/public/FeatureSection';
import TestimonialsSection from '../../components/public/TestimonialsSection';
import FAQ from '../../components/public/FAQ';
import Footer from '../../components/public/Footer';
import Header from '../../components/public/Header';

function Home() {
  return (
    <>
      <PageWrapper>
        <Header />
          <Hero />
          <StatsSection />
          <FeatureSection />
          <TestimonialsSection />
          <FAQ />
          <Footer />
      </PageWrapper>
    </>
  );
}

export default Home;
