import React, { useRef } from 'react';
import AideHero from "../../components/public/AideHero";
import Header from "../../components/public/Header";
import PageWrapper from "../../components/public/PageWrapper";
import CategoryCard from "../../components/public/CategoryCard";
import PopularHelpTopics from "../../components/public/TopicCard";
import TestimonialsSection from "../../components/public/TestimonialsSections";
import HelpContactSection from "../../components/public/HelpContactSection";
import Footer from "../../components/public/Footer";

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