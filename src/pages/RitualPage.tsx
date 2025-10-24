import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Ritual } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RitualPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: ritual, isLoading } = useQuery({
    queryKey: ["ritual", slug],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("rituals")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as Ritual;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32">
          <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-64 w-full max-w-4xl mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!ritual) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold font-devanagari text-gradient mb-4">
            पृष्ठ नहीं मिला
          </h1>
          <p className="font-devanagari text-muted-foreground">
            यह अनुष्ठान उपलब्ध नहीं है।
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const renderContent = (contentJson: any) => {
    if (contentJson && contentJson.steps) {
      return (
        <div>
          {contentJson.introduction && (
            <p className="font-devanagari text-foreground/80 leading-relaxed mb-6">
              {contentJson.introduction}
            </p>
          )}
          {contentJson.steps.map((step: any, index: number) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-bold font-devanagari text-primary mb-3">
                {step.title}
              </h3>
              <p className="font-devanagari text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {step.mantra}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return <p>Invalid content format.</p>;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-6xl mb-4 block">🕉️</span>
            <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
              {ritual.title}
            </h1>
          </div>

          <Card className="p-8 temple-shadow">
            {renderContent(ritual.content_json)}
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RitualPage;
