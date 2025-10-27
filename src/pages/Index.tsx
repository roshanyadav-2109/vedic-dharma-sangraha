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
import AryaSandeshTV from "@/components/AryaSandeshTV";

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
        <AryaSandeshTV />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
