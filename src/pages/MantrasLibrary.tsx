import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mantra } from "@/types/database";
import { useParams, Link } from "react-router-dom"; // Added Link back
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MantraCard from "@/components/MantraCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Import Badge for category links

const MantrasLibrary = () => {
  const { category } = useParams<{ category?: string }>(); // Made category optional

  // Fetch all mantras
  const { data: mantras, isLoading, isError } = useQuery({
    queryKey: ["mantras"], // Keep fetching all initially
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mantras")
        .select("id, title, content, category") // Make sure category is selected
        .order("id");

      if (error) {
        console.error("Error fetching mantras:", error);
        throw error;
      }
      return data as Mantra[];
    },
     staleTime: 1000 * 60 * 5,
  });

  // --- Re-added Filtering Logic ---
  const filteredMantras = React.useMemo(() => {
    if (!mantras) return [];
    // If a category is specified in the URL, filter by it
    if (category) {
       // Decode URL component in case category names have spaces/special chars
      const decodedCategory = decodeURIComponent(category);
      return mantras.filter((m) => m.category === decodedCategory);
    }
    // Otherwise (if no category in URL, i.e., /mantras), show all
    return mantras;
  }, [mantras, category]);

  // Get unique categories for navigation links
  const categories = React.useMemo(() => {
     if (!mantras) return [];
     // Use Set to get unique category names
     return Array.from(new Set(mantras.map((m) => m.category).filter(Boolean))); // Filter out potential null/empty categories
  }, [mantras]);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
            मंत्र संग्रह
          </h1>
          <p className="text-lg font-devanagari text-muted-foreground max-w-2xl mx-auto">
            वैदिक परंपरा के अनुसार संस्कृत मंत्र। प्रत्येक मंत्र को कॉपी करने या सुनने के लिए बटन का उपयोग करें।
          </p>
        </div>

        {/* Category Navigation Links (Replaces Tabs) */}
        {!isLoading && !isError && categories.length > 0 && (
           <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
              <Link to="/mantras">
                 <Badge
                    variant={!category ? "default" : "secondary"} // Highlight if no category selected
                    className="font-devanagari text-sm cursor-pointer px-4 py-1.5"
                 >
                    सभी
                 </Badge>
              </Link>
              {categories.map((cat) => (
                // Encode category for URL safety
                <Link key={cat} to={`/mantras/${encodeURIComponent(cat)}`}>
                  <Badge
                     variant={category === cat ? "default" : "secondary"} // Highlight if current category
                     className="font-devanagari text-sm cursor-pointer px-4 py-1.5"
                  >
                     {cat}
                  </Badge>
                </Link>
              ))}
           </div>
        )}


        {/* Dynamic Title based on Category */}
        <h2 className="text-2xl md:text-3xl font-bold font-devanagari text-center mb-8 text-primary">
           {category ? decodeURIComponent(category) : "सभी मंत्र"}
        </h2>


        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
            <div className="text-center text-destructive font-devanagari p-8 mb-12">
                मंत्र लोड करने में त्रुटि हुई।
            </div>
        )}

        {/* Mantra Grid - Now displays filteredMantras */}
        {!isLoading && !isError && filteredMantras.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {filteredMantras.map((mantra) => (
              <MantraCard
                key={mantra.id}
                title={mantra.title}
                mantra={mantra.content || ""}
              />
            ))}
          </div>
        )}

         {/* No Mantras Found State */}
         {!isLoading && !isError && filteredMantras.length === 0 && (
             <div className="text-center text-muted-foreground font-devanagari p-8 mb-12">
                 {category ? `श्रेणी '${decodeURIComponent(category)}' में कोई मंत्र नहीं मिला।` : "कोई मंत्र उपलब्ध नहीं है।"}
             </div>
         )}


        {/* PDF Buttons Section */}
        <div className="max-w-4xl mx-auto mt-16">
            <Card className="p-6 temple-shadow bg-muted/30">
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
                        asChild
                    >
                        <a href="/vedic-text.pdf" download="vedic-havan-paddhati.pdf">
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

export default MantrasLibrary;
