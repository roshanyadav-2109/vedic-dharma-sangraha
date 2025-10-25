import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BookOpen } from "lucide-react";

const PDFSection = () => {
  return (
    <section id="pdf" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 temple-shadow bg-card">
            <div className="text-center space-y-6">
              <div className="inline-block p-6 rounded-full sacred-gradient divine-glow">
                <FileText className="w-16 h-16 text-primary-foreground" />
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-gradient">
                  संपूर्ण PDF डाउनलोड करें
                </h2>
                <p className="text-lg font-devanagari text-muted-foreground">
                  132 पृष्ठों की पूर्ण वैदिक हवन पद्धति
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-primary">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-bold text-2xl">132</span>
                    </div>
                    <span className="text-sm font-devanagari text-muted-foreground">पृष्ठ</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="text-2xl">📿</span>
                      <span className="font-bold text-2xl">विस्तृत</span>
                    </div>
                    <span className="text-sm font-devanagari text-muted-foreground">मंत्र संग्रह</span>
                  </div>
                </div>

                <div className="pt-4">
                  <ul className="space-y-2 font-devanagari text-foreground/80 text-left max-w-md mx-auto">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>संपूर्ण हवन विधि विस्तार से</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>सभी महत्वपूर्ण संस्कृत मंत्र</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>चित्रों सहित सचित्र विवरण</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>ऑफलाइन अध्ययन के लिए उपयुक्त</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="sacred-gradient text-primary-foreground font-devanagari text-xl px-12 py-7 divine-glow hover:scale-105 transition-transform"
                  onClick={() => window.open('https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf', '_blank')}
                >
                  <Download className="w-6 h-6 mr-3" />
                  PDF डाउनलोड करें
                </Button>
                <p className="text-sm font-devanagari text-muted-foreground mt-4">
                  क्लिक करके PDF को नई विंडो में खोलें या डाउनलोड करें
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PDFSection;
