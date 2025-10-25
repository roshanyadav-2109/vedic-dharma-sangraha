import React from "react"; // Removed useState, useEffect
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mantra } from "@/types/database";
import { useParams } from "react-router-dom"; // Keep useParams if category filtering might be added back later, but it's unused now
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MantraCard from "@/components/MantraCard";
// Removed Tabs imports
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Added Card components
import { Button } from "@/components/ui/button"; // Added Button
import { Download, Eye } from "lucide-react"; // Added icons

const MantrasLibrary = () => {
  // Category logic removed, but kept hook for potential future use
  const { category } = useParams<{ category: string }>();

  // Fetch all mantras
  const { data: mantras, isLoading, isError } = useQuery({ // Added isError
    queryKey: ["mantras"], // Simplified key as category is not used for filtering here
    queryFn: async () => {
      // Fetch all mantras ordered by ID
      const { data, error } = await supabase
        .from("mantras")
        .select("id, title, content, category") // Select necessary fields
        .order("id");

      if (error) {
        console.error("Error fetching mantras:", error);
        throw error;
      }
      return data as Mantra[];
    },
     staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // No filtering needed anymore, directly use fetched mantras
  // const filteredMantras = mantras; // Or just use 'mantras' directly in the map

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-32"> {/* Adjusted padding */}
        <div className="text-center mb-12">
          {/* Emoji removed */}
          <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
            मंत्र संग्रह
          </h1>
          <p className="text-lg font-devanagari text-muted-foreground max-w-2xl mx-auto">
            वैदिक परंपरा के अनुसार संस्कृत मंत्र। प्रत्येक मंत्र को कॉपी करने या सुनने के लिए बटन का उपयोग करें।
          </p>
        </div>

        {/* Removed Tabs component */}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {[...Array(6)].map((_, i) => ( // Show more skeletons
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

        {/* Mantra Grid - Display all mantras */}
        {!isLoading && !isError && mantras && mantras.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {mantras.map((mantra) => (
              <MantraCard
                key={mantra.id}
                title={mantra.title}
                mantra={mantra.content || ""}
                // meaning={mantra.meaning} // Pass meaning if it exists in your data
              />
            ))}
          </div>
        )}

         {/* No Mantras Found State */}
         {!isLoading && !isError && (!mantras || mantras.length === 0) && (
             <div className="text-center text-muted-foreground font-devanagari p-8 mb-12">
                 कोई मंत्र नहीं मिला।
             </div>
         )}


        {/* PDF Buttons Section - Added at the end of main content */}
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
