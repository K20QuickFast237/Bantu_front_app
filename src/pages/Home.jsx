import React from 'react';
import Hero from "../components/Herosection";
import PageWrapper from '../components/PageWrapper';
import StatsSection from '../components/StatsSection';
import FeatureSection from '../components/FeatureSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
