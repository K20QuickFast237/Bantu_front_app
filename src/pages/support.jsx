import AideHero from "../components/AideHero"
import Header from "../components/Header"
import PageWrapper from "../components/PageWrapper"
import CategoryCard from "../components/CategoryCard"
import PopularHelpTopics from "../components/TopicCard"
import TestimonialsSection from "../components/TestimonialsSections"
import HelpContactSection from "../components/HelpContactSection"
import Footer from "../components/Footer"

function Support(){
    return(
        <>
            <PageWrapper>
                <Header />
                <AideHero />
                <CategoryCard/>
                <PopularHelpTopics />
                <TestimonialsSection />
                <HelpContactSection />
                <Footer />
            </PageWrapper>
        </>
    )
}

export default Support