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
    if (typeof contentJson === 'string') {
      return <p className="font-devanagari text-foreground/80 leading-relaxed whitespace-pre-wrap">{contentJson}</p>;
    }

    if (Array.isArray(contentJson)) {
      return contentJson.map((item, index) => (
        <div key={index} className="mb-6">
          {item.type === 'heading' && (
            <h3 className="text-2xl font-bold font-devanagari text-primary mb-3">{item.text}</h3>
          )}
          {item.type === 'paragraph' && (
            <p className="font-devanagari text-foreground/80 leading-relaxed mb-4">{item.text}</p>
          )}
          {item.type === 'list' && (
            <ul className="space-y-2 mb-4">
              {item.items?.map((listItem: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="font-devanagari text-foreground/80">{listItem}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ));
    }

    return null;
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
