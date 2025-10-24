import { Card } from "@/components/ui/card";
import omMandala from "@/assets/om-mandala.jpg";
import { Button } from "./ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="text-6xl mb-4 block">📿</span>
                <h2 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
                  सनातन धर्म की परंपरा
                </h2>
              </div>

              <Card className="p-6 bg-card/50 border-2 border-primary/10">
                <p className="text-lg font-devanagari text-foreground/80 leading-relaxed">
                  यह संग्रह वैदिक परंपरा के अनुसार संकलित किया गया है। इसमें दैनिक पूजा, हवन और संध्या के लिए आवश्यक मंत्र संस्कृत भाषा में प्रस्तुत किए गए हैं।
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-2 border-secondary/20">
                <h3 className="text-xl font-bold font-devanagari text-secondary mb-3">
                  विशेष सुविधाएँ
                </h3>
                <ul className="space-y-2 font-devanagari text-foreground/80">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>प्रत्येक मंत्र का सरल अर्थ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>एक क्लिक में मंत्र कॉपी करें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>संपूर्ण PDF डाउनलोड विकल्प</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>सुंदर और पढ़ने में आसान</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-accent/5 border-2 border-accent/20">
                <p className="font-devanagari text-foreground/80 leading-relaxed italic">
                  "वेदो अखिलो धर्ममूलम्" - समस्त धर्म का मूल वेद है। ये मंत्र हमारी प्राचीन वैदिक परंपरा की अमूल्य धरोहर हैं।
                </p>
              </Card>
              <div className="relative justify-center">
                <Button variant="interactive">Explore</Button>
              </div>
            </div>

            {/* Image */}
            <div className="order-first md:order-last">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden temple-shadow divine-glow">
                  <img
                    src={omMandala}
                    alt="ॐ मण्डल"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
