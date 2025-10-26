import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Ritual } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download, Eye, Volume2, VolumeX, Copy, Check } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

// Helper type for a single content item
type ContentItem = {
  type: 'heading' | 'subheading' | 'instruction' | 'mantra' | 'translation';
  content: string;
  title?: string;
  purpose?: string;
};

const RitualPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [speakingMantraIndex, setSpeakingMantraIndex] = useState<number | null>(null);
  const [copiedMantraIndex, setCopiedMantraIndex] = useState<number | null>(null);

  const { data: ritual, isLoading, isError } = useQuery({
    queryKey: ["ritual", slug],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("rituals")
        .select("id, title, content_json, slug")
        .eq("slug", slug)
        .single();

      if (error) {
         console.error("Supabase error fetching ritual:", error);
         throw error;
        }
      if (!data) {
        throw new Error("Ritual not found");
      }
      return data as Ritual;
    },
     retry: 1,
  });

  const handleRecite = (mantraText: string, index: number) => {
    if (speakingMantraIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingMantraIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(mantraText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setSpeakingMantraIndex(index);
      toast.success("मंत्र उच्चारण शुरू");
    };

    utterance.onend = () => {
      setSpeakingMantraIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingMantraIndex(null);
      toast.error("उच्चारण में त्रुटि");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = async (mantraText: string, index: number) => {
    try {
      await navigator.clipboard.writeText(mantraText);
      setCopiedMantraIndex(index);
      toast.success("मंत्र कॉपी हो गया!");
      setTimeout(() => setCopiedMantraIndex(null), 2000);
    } catch (err) {
      toast.error("कॉपी करने में त्रुटि");
    }
  };

  const renderContent = (contentJson: any) => {
    if (!Array.isArray(contentJson)) {
      return <p className="font-devanagari text-destructive text-center">Invalid content format received from backend.</p>;
    }

    let mantraCounter = 0;

    return (
      <div className="space-y-8 prose prose-lg max-w-none">
        {(contentJson as ContentItem[]).map((item, index) => {
          const currentMantraIndex = item.type === 'mantra' ? mantraCounter++ : -1;
          
          return (
            <Fragment key={index}>
              {item.type === 'heading' && (
                <h2 className="text-4xl font-bold font-devanagari text-gradient border-b-2 border-primary/30 pb-4 mb-8 mt-12">
                  {item.content}
                </h2>
              )}
              {item.type === 'subheading' && (
                <h3 className="text-3xl font-semibold font-devanagari text-primary pt-6 mt-8 mb-4">
                  {item.content}
                </h3>
              )}
              {item.type === 'instruction' && (
                <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded-r-lg my-6">
                  <p className="font-devanagari text-foreground/80 italic leading-relaxed text-lg">
                    {item.content}
                  </p>
                </div>
              )}
              {item.type === 'mantra' && (
                <div className="group relative my-8 py-6 px-8 bg-gradient-to-br from-primary/5 to-transparent rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleRecite(item.content, currentMantraIndex)}
                      size="sm"
                      variant="outline"
                      className="font-devanagari hover:bg-primary hover:text-primary-foreground transition-all border-2"
                    >
                      {speakingMantraIndex === currentMantraIndex ? (
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
                      onClick={() => handleCopy(item.content, currentMantraIndex)}
                      size="sm"
                      variant="outline"
                      className="font-devanagari hover:bg-primary hover:text-primary-foreground transition-all border-2"
                    >
                      {copiedMantraIndex === currentMantraIndex ? (
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
                  <p className="font-sanskrit text-3xl leading-loose text-foreground select-all pr-32">
                    {item.content}
                  </p>
                  {item.purpose && (
                    <p className="text-sm font-devanagari text-muted-foreground mt-4 italic">
                      ({item.purpose})
                    </p>
                  )}
                </div>
              )}
              {item.type === 'translation' && (
                <div className="border-l-4 border-muted/50 pl-6 my-6">
                  <p className="font-devanagari text-foreground/70 leading-relaxed italic text-lg">
                    {item.content}
                  </p>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
            <Card className="p-8 space-y-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-16 w-full" />
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or Not Found State
  if (isError || !ritual) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-32 text-center">
           {/* Removed Emoji */}
          <h1 className="text-4xl font-bold font-devanagari text-gradient mb-4">
            अनुष्ठान नहीं मिला
          </h1>
          <p className="font-devanagari text-muted-foreground">
            {isError ? "डेटा लोड करने में त्रुटि हुई।" : "यह अनुष्ठान उपलब्ध नहीं है।"} कृपया होम पेज पर वापस जाएं।
          </p>
           <Button asChild className="mt-6 sacred-gradient text-primary-foreground">
            <a href="/">होम पेज</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <Card className="mb-8 temple-shadow overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
             <CardHeader className="text-center p-6 md:p-10">
                {/* Removed Emoji */}
                <CardTitle className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-2">
                 {ritual.title}
                </CardTitle>
                <p className="text-muted-foreground font-devanagari">एक वैदिक अनुष्ठान</p>
             </CardHeader>
          </Card>

          {/* Content Section */}
          <Card className="p-8 md:p-12 temple-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
             {renderContent(ritual.content_json)}
            </CardContent>
          </Card>

           {/* PDF Buttons Section */}
           <Card className="mt-8 p-6 temple-shadow bg-muted/30">
             <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-devanagari text-gradient">
                    संपूर्ण हवन पद्धति PDF
                </CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                 <Button
                  size="lg"
                  className="sacred-gradient text-primary-foreground font-devanagari text-lg px-8 py-6 divine-glow hover:scale-105 transition-transform w-full sm:w-auto"
                  onClick={() => window.open('https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf', '_blank')}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  PDF देखें
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-devanagari text-lg px-8 py-6 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all w-full sm:w-auto"
                  asChild // Use asChild to make the button act like a link for download
                >
                   <a href="https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf" download="vedic-havan-paddhati.pdf"> {/* Add download attribute */}
                    <Download className="w-5 h-5 mr-2" />
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

export default RitualPage;
