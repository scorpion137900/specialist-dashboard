import AccordionSection from "../components/Main/AccordionSection";
import Blog from "../components/Main/Blog/Blog";
import Features from "../components/Main/Features/Features";
import FeaturesList from "../components/Main/Features/FeaturesList";
import Header from "../components/Main/Header";
import Points from "../components/Main/Point/Points";
import SpecialistsList from "../components/Main/SpecialistsList";
import SplideCarousel from "../components/Main/SplideCarousel/SplideCarousel";
import { images } from "../utils/helper";
const Main = () => {
  return (
    <>
      <Header />
      <Features />
      <FeaturesList />
      <SpecialistsList />
      <SplideCarousel images={images} text="المختصين" />
      <Points />
      <Blog />
      <AccordionSection />
    </>
  );
};

export default Main;
