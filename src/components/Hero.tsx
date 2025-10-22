import heroImage from "@/assets/hero-temple.jpg";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Om Symbol */}
          <div className="inline-block">
            <div className="w-24 h-24 mx-auto rounded-full sacred-gradient flex items-center justify-center divine-glow animate-pulse">
              <span className="text-5xl font-bold text-primary-foreground">ॐ</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold font-devanagari text-gradient leading-tight">
              वैदिक हवन पद्धति
            </h1>
            <p className="text-2xl md:text-3xl font-devanagari text-foreground/80 font-medium">
              सनातन धर्म का पवित्र ज्ञान
            </p>
          </div>

          {/* Sanskrit Shloka */}
          <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 temple-shadow max-w-2xl mx-auto">
            <p className="text-2xl font-sanskrit leading-relaxed text-foreground/90">
              ॐ भूर्भुवः स्वः ।<br />
              तत्सवितुर्वरेण्यं ।<br />
              भर्गो देवस्य धीमहि ।<br />
              धियो यो नः प्रचोदयात् ॥
            </p>
            <p className="mt-4 text-sm font-devanagari text-muted-foreground italic">
              गायत्री मंत्र - प्रकाश और ज्ञान की प्रार्थना
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="sacred-gradient text-primary-foreground font-devanagari text-lg px-8 py-6 divine-glow hover:scale-105 transition-transform"
              onClick={() => document.getElementById('mantras')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              मंत्र देखें
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="font-devanagari text-lg px-8 py-6 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => window.open('/vedic-text.pdf', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              PDF डाउनलोड करें
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
