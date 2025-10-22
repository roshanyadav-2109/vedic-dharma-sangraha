import { Card } from "@/components/ui/card";
import { Flame, Sparkles, BookOpen } from "lucide-react";
import deityImage from "@/assets/deity.jpg";

const HavanSection = () => {
  const steps = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "तैयारी",
      description: "हवन कुण्ड की स्थापना और पवित्रता की व्यवस्था करें। समिधा, घृत और हवन सामग्री एकत्र करें।"
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: "अग्नि प्रज्वलन",
      description: "वैदिक मंत्रों के साथ पवित्र अग्नि को प्रज्वलित करें। अग्नि देवता का आह्वान करें।"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "मंत्रोच्चारण",
      description: "निर्धारित क्रम में वैदिक मंत्रों का उच्चारण करते हुए हवन सामग्री अर्पित करें।"
    }
  ];

  return (
    <section id="havan" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-6xl">🔥</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient">
            हवन विधि
          </h2>
          <p className="text-lg font-devanagari text-muted-foreground max-w-2xl mx-auto">
            वैदिक परंपरा के अनुसार हवन करने की विधि
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-16">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden temple-shadow">
              <img 
                src={deityImage} 
                alt="ब्रह्मन् यज्ञः"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="order-1 md:order-2 space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 temple-shadow hover:divine-glow transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full sacred-gradient flex items-center justify-center text-primary-foreground">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-devanagari text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="font-devanagari text-foreground/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <Card className="max-w-4xl mx-auto p-8 bg-accent/5 border-2 border-accent/20">
          <h3 className="text-2xl font-bold font-devanagari text-accent mb-4 text-center">
            महत्वपूर्ण निर्देश
          </h3>
          <ul className="space-y-3 font-devanagari text-foreground/80">
            <li className="flex items-start">
              <span className="text-accent mr-3 text-xl">•</span>
              <span>हवन करते समय पूर्व या उत्तर दिशा की ओर मुख करके बैठें।</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 text-xl">•</span>
              <span>मंत्रों का शुद्ध उच्चारण करें और श्रद्धा भाव से आहुति दें।</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 text-xl">•</span>
              <span>हवन सामग्री में घी, समिधा, तिल, जौ, और अन्य शुभ सामग्री का उपयोग करें।</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 text-xl">•</span>
              <span>प्रत्येक मंत्र के अंत में 'स्वाहा' कहकर आहुति दें।</span>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default HavanSection;
