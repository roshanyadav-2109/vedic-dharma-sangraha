import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Ritual } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

// Helper type for a single content item
type ContentItem = {
  type: 'heading' | 'subheading' | 'instruction' | 'mantra' | 'translation';
  content: string;
  title?: string;
  purpose?: string;
};

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

  // **UPDATED RENDER FUNCTION**
  const renderContent = (contentJson: any) => {
    // Check if the content is a valid array
    if (!Array.isArray(contentJson)) {
      return <p className="font-devanagari text-destructive">Invalid content format.</p>;
    }

    return (
      <div className="space-y-6">
        {(contentJson as ContentItem[]).map((item, index) => (
          <Fragment key={index}>
            {item.type === 'heading' && (
              <h2 className="text-3xl font-bold font-devanagari text-gradient border-b-2 border-primary/20 pb-2">
                {item.content}
              </h2>
            )}
            {item.type === 'subheading' && (
              <h3 className="text-2xl font-bold font-devanagari text-primary pt-4">
                {item.content}
              </h3>
            )}
            {item.type === 'instruction' && (
              <p className="font-devanagari text-muted-foreground italic bg-muted/50 p-3 rounded-md border-l-4 border-primary/50">
                {item.content}
              </p>
            )}
            {item.type === 'mantra' && (
              <div className="font-sanskrit text-xl leading-relaxed whitespace-pre-wrap">
                <p>{item.content}</p>
                {item.purpose && (
                  <p className="text-sm font-devanagari text-muted-foreground mt-1">
                    ({item.purpose})
                  </p>
                )}
              </div>
            )}
             {item.type === 'translation' && (
                <div className="border-l-4 border-secondary/50 pl-4">
                    <p className="font-devanagari text-foreground/80 leading-relaxed whitespace-pre-wrap">
                        {item.content}
                    </p>
                </div>
            )}
          </Fragment>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Card className="p-8 space-y-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </Card>
          </div>
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
