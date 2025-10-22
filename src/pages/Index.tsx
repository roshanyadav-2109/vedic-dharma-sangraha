import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MantrasSection from "@/components/MantrasSection";
import HavanSection from "@/components/HavanSection";
import AboutSection from "@/components/AboutSection";
import PDFSection from "@/components/PDFSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MantrasSection />
      <HavanSection />
      <AboutSection />
      <PDFSection />
      <Footer />
    </div>
  );
};

export default Index;
