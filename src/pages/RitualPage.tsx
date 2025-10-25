import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Ritual } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added CardHeader, CardTitle, CardContent
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Added Button import
import { Download, Eye } from "lucide-react"; // Added icons
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

  const { data: ritual, isLoading, isError } = useQuery({ // Added isError
    queryKey: ["ritual", slug],
    queryFn: async () => {
      // Fetching data from Supabase rituals table
      const { data, error } = await (supabase as any)
        .from("rituals")
        .select("id, title, content_json, slug") // Ensure necessary fields are selected
        .eq("slug", slug)
        .single();

      if (error) {
         console.error("Supabase error fetching ritual:", error);
         throw error; // Let react-query handle the error state
        }
      if (!data) {
        throw new Error("Ritual not found"); // Handle case where data is null but no error
      }
      return data as Ritual;
    },
     retry: 1, // Retry once on error
  });

  // Updated render function with improved styling
  const renderContent = (contentJson: any) => {
    // Check if the content is a valid array
    if (!Array.isArray(contentJson)) {
      return <p className="font-devanagari text-destructive text-center">Invalid content format received from backend.</p>;
    }

    return (
      <div className="space-y-6">
        {(contentJson as ContentItem[]).map((item, index) => (
          <Fragment key={index}>
            {item.type === 'heading' && (
              <h2 className="text-3xl font-bold font-devanagari text-gradient border-b-2 border-primary/20 pb-2 mb-6">
                {item.content}
              </h2>
            )}
            {item.type === 'subheading' && (
              <h3 className="text-2xl font-semibold font-devanagari text-primary pt-4 mt-4"> {/* Adjusted font weight */}
                {item.content}
              </h3>
            )}
            {item.type === 'instruction' && (
              <p className="font-devanagari text-muted-foreground italic bg-muted/30 p-4 rounded-md border-l-4 border-secondary my-4"> {/* Adjusted styling */}
                {item.content}
              </p>
            )}
            {item.type === 'mantra' && (
              <div className="font-sanskrit text-xl md:text-2xl leading-relaxed whitespace-pre-wrap my-4 p-4 bg-background rounded"> {/* Adjusted font size and added background */}
                <p className="select-all">{item.content}</p>
                {item.purpose && (
                  <p className="text-sm font-devanagari text-muted-foreground mt-2">
                    ({item.purpose})
                  </p>
                )}
              </div>
            )}
             {item.type === 'translation' && (
                <div className="border-l-4 border-muted pl-4 my-4">
                    <p className="font-devanagari text-foreground/80 leading-relaxed whitespace-pre-wrap italic">
                        {item.content}
                    </p>
                </div>
            )}
          </Fragment>
        ))}
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
          <Card className="p-6 md:p-10 temple-shadow">
            <CardContent>
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
                  onClick={() => window.open('/vedic-text.pdf', '_blank')}
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
                   <a href="/vedic-text.pdf" download="vedic-havan-paddhati.pdf"> {/* Add download attribute */}
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
