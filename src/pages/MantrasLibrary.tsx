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
      const { data, error } = await supabase
        .from("mantras")
        .select("id, title, content, category") // Ensure category is selected
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
        <div className="text-center mb-12">
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
             मंत्र संग्रह
          </h1>
           {/* Dynamic Subtitle based on Category */}
           <p className="text-2xl md:text-3xl font-devanagari text-primary mt-2">
             {decodedCategory ? decodedCategory : "सभी मंत्र"} {/* Show category name or 'All Mantras' */}
           </p>
          <p className="text-lg font-devanagari text-muted-foreground max-w-2xl mx-auto mt-4">
            वैदिक परंपरा के अनुसार संस्कृत मंत्र। प्रत्येक मंत्र को कॉपी करने या सुनने के लिए बटन का उपयोग करें।
          </p>
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
                 {decodedCategory ? `श्रेणी '${decodedCategory}' में कोई मंत्र नहीं मिला।` : "कोई मंत्र उपलब्ध नहीं है।"}
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
                        onClick={() => window.open('https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf', '_blank')}
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
                        <a href="https://uhskuqmwuvpcgqljcdct.supabase.co/storage/v1/object/public/public_files/Arya%20Samaj%20Vidhi.pdf" download="vedic-havan-paddhati.pdf">
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
