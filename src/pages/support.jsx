import React, { useRef } from 'react';
import AideHero from "../components/AideHero";
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";
import CategoryCard from "../components/CategoryCard";
import PopularHelpTopics from "../components/TopicCard";
import TestimonialsSection from "../components/TestimonialsSections";
import HelpContactSection from "../components/HelpContactSection";
import Footer from "../components/Footer";

function Support() {
  const categoryRef = useRef(null);
  const topicRef = useRef(null);
  const testimonialRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <>
      <PageWrapper>
        <Header />
        <AideHero 
          categoryRef={categoryRef}
          topicRef={topicRef}
          testimonialRef={testimonialRef}
          contactRef={contactRef}
        />
        <section ref={categoryRef}>
          <CategoryCard />
        </section>
        <section ref={topicRef}>
          <PopularHelpTopics />
        </section>
        <section ref={testimonialRef}>
          <TestimonialsSection />
        </section>
        <section ref={contactRef}>
          <HelpContactSection />
        </section>
        <Footer />
      </PageWrapper>
    </>
  );
}

export default Support;