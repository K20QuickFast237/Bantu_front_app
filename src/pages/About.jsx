import AboutHero from "../components/AboutHero";
import AboutSection from "../components/AboutSection";
import CoreValuesSection from "../components/CoreValuesSection";
import Footer from "../components/Footer";
import HeaderWhite from "../components/HeaderWhite";
import NotreHistoire from "../components/NotreHistoire";
import PageWrapper from "../components/PageWrapper";
import PartnersSection from "../components/PartnersSection";
import StatsSection from "../components/StatsSection";

function About (){
    return(
        <> 
        <PageWrapper>
            <HeaderWhite />
            <AboutHero />
            <AboutSection />
            <NotreHistoire />
            <PartnersSection />
            <CoreValuesSection />
            <div className="mb-15">
                <StatsSection />
            </div>
            <Footer />
            
        
        </PageWrapper>
        </>
    )
}

export default About