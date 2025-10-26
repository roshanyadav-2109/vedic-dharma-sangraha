import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mantra } from "@/types/database";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Volume2, VolumeX, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const MantrasLibrary = () => {
  const { category } = useParams<{ category?: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : undefined;

  const [speakingMantraId, setSpeakingMantraId] = useState<number | null>(null);
  const [copiedMantraId, setCopiedMantraId] = useState<number | null>(null);

  const { data: mantras, isLoading, isError } = useQuery({
    queryKey: ["mantras"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("mantras")
        .select("id, title, content, category")
        .order("id");

      if (error) {
        console.error("Error fetching mantras:", error);
        throw error;
      }
      return data as Mantra[];
    },
     staleTime: 1000 * 60 * 5,
  });

  const filteredMantras = React.useMemo(() => {
    if (!mantras) return [];
    if (decodedCategory) {
      return mantras.filter((m) => m.category === decodedCategory);
    }
    return mantras;
  }, [mantras, decodedCategory]);

  const handleRecite = (mantraText: string, mantraId: number) => {
    if (speakingMantraId === mantraId) {
      window.speechSynthesis.cancel();
      setSpeakingMantraId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(mantraText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setSpeakingMantraId(mantraId);
      toast.success("मंत्र उच्चारण शुरू");
    };

    utterance.onend = () => {
      setSpeakingMantraId(null);
    };

    utterance.onerror = () => {
      setSpeakingMantraId(null);
      toast.error("उच्चारण में त्रुटि");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = async (mantraText: string, mantraId: number) => {
    try {
      await navigator.clipboard.writeText(mantraText);
      setCopiedMantraId(mantraId);
      toast.success("मंत्र कॉपी हो गया!");
      setTimeout(() => setCopiedMantraId(null), 2000);
    } catch (err) {
      toast.error("कॉपी करने में त्रुटि");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-devanagari text-gradient mb-6 leading-tight">
              मंत्र संग्रह
            </h1>
            <div className="inline-block px-8 py-3 mb-6 bg-primary/10 rounded-full border-2 border-primary/30">
              <p className="text-3xl md:text-4xl font-devanagari text-primary font-semibold">
                {decodedCategory ? decodedCategory : "सभी मंत्र"}
              </p>
            </div>
            <p className="text-xl font-devanagari text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              वैदिक परंपरा के अनुसार पवित्र संस्कृत मंत्र। प्रत्येक मंत्र को सुनने या कॉपी करने के लिए बटन का उपयोग करें।
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-5xl mx-auto mb-12 space-y-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
            <div className="text-center text-destructive font-devanagari p-8 mb-12">
                मंत्र लोड करने में त्रुटि हुई।
            </div>
        )}

        {/* Mantra Document Flow */}
        {!isLoading && !isError && filteredMantras.length > 0 && (
          <Card className="max-w-5xl mx-auto mb-16 p-8 md:p-12 temple-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0 space-y-10">
              {filteredMantras.map((mantra) => (
                <div 
                  key={mantra.id} 
                  className="group relative py-8 border-b border-primary/10 last:border-b-0"
                >
                  <div className="absolute top-4 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleRecite(mantra.content || "", mantra.id)}
                      size="sm"
                      variant="outline"
                      className="font-devanagari hover:bg-primary hover:text-primary-foreground transition-all border-2"
                    >
                      {speakingMantraId === mantra.id ? (
                        <>
                          <VolumeX className="w-4 h-4 mr-1" />
                          रोकें
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 mr-1" />
                          सुनें
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleCopy(mantra.content || "", mantra.id)}
                      size="sm"
                      variant="outline"
                      className="font-devanagari hover:bg-primary hover:text-primary-foreground transition-all border-2"
                    >
                      {copiedMantraId === mantra.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          कॉपी हुआ
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          कॉपी
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-devanagari text-primary mb-6">
                    {mantra.title}
                  </h3>
                  
                  <p className="font-sanskrit text-3xl leading-loose text-foreground select-all pr-32">
                    {mantra.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

         {/* No Mantras Found State */}
         {!isLoading && !isError && filteredMantras.length === 0 && (
             <div className="text-center text-muted-foreground font-devanagari p-8 mb-12">
                 {decodedCategory ? `श्रेणी '${decodedCategory}' में कोई मंत्र नहीं मिला।` : "कोई मंत्र उपलब्ध नहीं है।"}
             </div>
         )}


        {/* PDF Buttons Section */}
        <div className="max-w-5xl mx-auto mt-20">
            <Card className="p-8 md:p-12 temple-shadow bg-gradient-to-br from-primary/5 via-card to-secondary/5 border-2 border-primary/20 hover:divine-glow transition-all duration-500">
                <CardHeader className="text-center pb-8">
                  <div className="inline-block mx-auto mb-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-devanagari text-gradient mb-3">
                      संपूर्ण हवन पद्धति PDF
                  </CardTitle>
                  <p className="text-lg font-devanagari text-muted-foreground">
                    पूर्ण वैदिक विधि के साथ मंत्र संग्रह डाउनलोड करें
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button
                        size="lg"
                        className="sacred-gradient text-primary-foreground font-devanagari text-xl px-10 py-7 divine-glow hover:scale-105 transition-all shadow-lg w-full sm:w-auto"
                        onClick={() => window.open('https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf', '_blank')}
                    >
                        <Eye className="w-6 h-6 mr-3" />
                        PDF देखें
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="font-devanagari text-xl px-10 py-7 border-3 border-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 shadow-md w-full sm:w-auto"
                        asChild
                    >
                        <a href="https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf" download="vedic-havan-paddhati.pdf">
                            <Download className="w-6 h-6 mr-3" />
                            PDF डाउनलोड करें
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default MantrasLibrary;
