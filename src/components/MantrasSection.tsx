import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mantra } from "@/types/database";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Volume2, VolumeX, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const MantrasSection = () => {
  const [speakingMantraId, setSpeakingMantraId] = useState<number | null>(null);
  const [copiedMantraId, setCopiedMantraId] = useState<number | null>(null);

  const { data: mantras, isLoading } = useQuery({
    queryKey: ["mantras-home"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("mantras")
        .select("*")
        .limit(6)
        .order("id");

      if (error) throw error;
      return data as Mantra[];
    },
  });

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
    <section id="mantras" className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold font-devanagari text-gradient">
            पवित्र मंत्र संग्रह
          </h2>
          <p className="text-xl font-devanagari text-muted-foreground max-w-2xl mx-auto">
            वैदिक परंपरा के अनुसार संस्कृत मंत्र। प्रत्येक मंत्र को सुनने या कॉपी करने के लिए बटन का उपयोग करें।
          </p>
        </div>

        {isLoading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <Card className="max-w-4xl mx-auto temple-shadow bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12 space-y-10">
              {mantras?.map((mantra) => (
                <div 
                  key={mantra.id} 
                  className="group relative py-6 border-b border-primary/10 last:border-b-0"
                >
                  <div className="absolute top-2 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                  
                  <h3 className="text-xl font-bold font-devanagari text-primary mb-4">
                    {mantra.title}
                  </h3>
                  
                  <p className="font-sanskrit text-2xl md:text-3xl leading-loose text-foreground select-all pr-32">
                    {mantra.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default MantrasSection;
