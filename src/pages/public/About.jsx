import AboutHero from "../../components/public/AboutHero";
import AboutSection from "../../components/public/AboutSection";
import CoreValuesSection from "../../components/public/CoreValuesSection";
import Footer from "../../components/public/Footer";
import HeaderWhite from "../../components/public/HeaderWhite";
import NotreHistoire from "../../components/public/NotreHistoire";
import PageWrapper from "../../components/public/PageWrapper";
import PartnersSection from "../../components/public/PartnersSection";
import StatsSection from "../../components/public/StatsSection";

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