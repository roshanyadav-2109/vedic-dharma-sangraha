import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AryaSamajLogoSection from "@/components/AryaSamajLogoSection";
import AboutAryaSamaj from "@/components/AboutAryaSamaj";
import FounderBiography from "@/components/FounderBiography";
import DisciplesSection from "@/components/DisciplesSection";
import CoreTenets from "@/components/CoreTenets";
import SocialHumanitarianEfforts from "@/components/SocialHumanitarianEfforts";
import EventsNews from "@/components/EventsNews";
import PhotoVideoGallery from "@/components/ui/PhotoVideoGallery";
import GlobalPresence from "@/components/GlobalPresence";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AryaSamajLogoSection />
        <AboutAryaSamaj />
        <FounderBiography />
        <DisciplesSection />
        <CoreTenets />
        <SocialHumanitarianEfforts />
        <EventsNews />
        <PhotoVideoGallery />
        <GlobalPresence />
        {/* Removed old sections: Hero, MantrasSection, HavanSection, AboutSection (old), PDFSection */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
