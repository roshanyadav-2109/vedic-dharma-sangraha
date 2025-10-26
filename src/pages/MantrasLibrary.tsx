import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mantra } from "@/types/database";
import { useParams } from "react-router-dom"; // Keep useParams to read the category
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MantraCard from "@/components/MantraCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
// Removed Badge and Link imports as category selection is no longer on this page

const MantrasLibrary = () => {
  // Get the category from the URL, if present
  const { category } = useParams<{ category?: string }>();
  // Decode the category name from the URL
  const decodedCategory = category ? decodeURIComponent(category) : undefined;

  // Fetch all mantras (filtering happens client-side after fetch)
  const { data: mantras, isLoading, isError } = useQuery({
    queryKey: ["mantras"], // Fetch all mantras
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

  // --- Filter Mantras based on URL Category ---
  const filteredMantras = React.useMemo(() => {
    if (!mantras) return [];
    // If a category is specified in the URL, filter by it
    if (decodedCategory) {
      return mantras.filter((m) => m.category === decodedCategory);
    }
    // Otherwise (if no category in URL, i.e., direct navigation to /mantras) show all
    // Or you might want to redirect to a default category or show a message
    return mantras; // Currently shows all if no category is specified
  }, [mantras, decodedCategory]);

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

        {/* Removed Category Navigation Links (Badges) */}

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

        {/* Mantra Grid - Displays filteredMantras */}
        {!isLoading && !isError && filteredMantras.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
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
