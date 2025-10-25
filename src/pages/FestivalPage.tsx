import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Festival } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FestivalPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: festival, isLoading } = useQuery({
    queryKey: ["festival", slug],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("festivals")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as Festival;
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

  if (!festival) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold font-devanagari text-gradient mb-4">
            पृष्ठ नहीं मिला
          </h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Removed Emoji Span */}
            <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
              {festival.title}
            </h1>
            {festival.page_number && (
              <p className="text-sm font-devanagari text-muted-foreground">
                पृष्ठ {festival.page_number}
              </p>
            )}
          </div>

          <Card className="p-8 temple-shadow">
            <div className="prose prose-lg max-w-none font-devanagari text-foreground/90 leading-relaxed">
              <div className="whitespace-pre-wrap">{festival.content}</div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FestivalPage;
