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
import PageHeader from "@/components/PageHeader";

// Helper type for a single content item
type ContentItem = {
  type: "heading" | "subheading" | "instruction" | "mantra" | "translation";
  content: string;
  title?: string;
  purpose?: string;
};

const RitualPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [speakingMantraIndex, setSpeakingMantraIndex] = useState<number | null>(
    null
  );
  const [copiedMantraIndex, setCopiedMantraIndex] = useState<number | null>(
    null
  );

  const {
    data: ritual,
    isLoading,
    isError,
  } = useQuery({
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

  // ... (handleRecite, handleCopy, renderContent functions remain the same) ...

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

  if (isError || !ritual) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold font-devanagari text-gradient mb-4">
            अनुष्ठान नहीं मिला
          </h1>
          <p className="font-devanagari text-muted-foreground">
            {isError
              ? "डेटा लोड करने में त्रुटि हुई।"
              : "यह अनुष्ठान उपलब्ध नहीं है।"}{" "}
            कृपया होम पेज पर वापस जाएं।
          </p>
          <Button asChild className="mt-6 sacred-gradient text-primary-foreground">
            <a href="/">होम पेज</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHeader title={ritual.title} subtitle="एक वैदिक अनुष्ठान" />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 temple-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              {renderContent(ritual.content_json)}
            </CardContent>
          </Card>

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
                onClick={() =>
                  window.open(
                    "https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf",
                    "_blank"
                  )
                }
              >
                <Eye className="w-5 h-5 mr-2" />
                PDF देखें
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-devanagari text-lg px-8 py-6 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf"
                  download="vedic-havan-paddhati.pdf"
                >
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
