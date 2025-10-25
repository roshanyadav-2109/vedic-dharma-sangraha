// src/pages/BhajanDetail.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bhajan } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const BhajanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const bhajanId = parseInt(id || "0", 10);
  const [copied, setCopied] = useState(false);

  // --- Fetch details query remains the same ---
  const { data: bhajan, isLoading, isError } = useQuery({
    queryKey: ["bhajanDetail", bhajanId],
    queryFn: async (): Promise<Bhajan | null> => {
      // ... fetch logic ...
       if (!bhajanId) return null;
       const { data, error } = await supabase
         .from("bhajans")
         .select("id, title, lyrics")
         .eq("id", bhajanId)
         .single();
       if (error) {
         console.error("Error fetching bhajan detail:", error);
         toast.error(`Failed to load Bhajan: ${error.message}`);
         throw new Error("Could not fetch bhajan details");
       }
       return data || null;
    },
    enabled: !!bhajanId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  // --- Handle Copy remains the same ---
   const handleCopy = async () => {
      if (bhajan?.lyrics) {
         try {
            await navigator.clipboard.writeText(bhajan.lyrics);
            setCopied(true);
            toast.success("भजन कॉपी हो गया!");
            setTimeout(() => setCopied(false), 2000);
         } catch (err) {
            toast.error("कॉपी करने में त्रुटि");
         }
      }
   };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
           {/* Back Button */}
           <Button variant="outline" asChild className="mb-6 font-devanagari">
              <Link to="/bhajans">
                 <ChevronLeft className="w-4 h-4 mr-2" />
                 भजन सूची पर वापस जाएं
              </Link>
           </Button>

          {/* Loading State */}
          {isLoading && (
            <Card className="p-8 temple-shadow min-h-[400px]">
              <div className="flex justify-center mb-8">
                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
              <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
              <div className="space-y-3">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-4/6" />
              </div>
            </Card>
          )}

          {/* Error or Not Found State */}
           {(isError || (!isLoading && !bhajan)) && (
               <Card className="p-8 temple-shadow text-center min-h-[400px] flex flex-col justify-center items-center">
                   <CardTitle className="text-2xl font-bold font-devanagari text-destructive mb-4">
                       त्रुटि
                   </CardTitle>
                   <p className="font-devanagari text-muted-foreground">
                       {isError ? "यह भजन लोड करने में त्रुटि हुई।" : "यह भजन नहीं मिला।"}
                   </p>
               </Card>
           )}

          {/* Success State */}
          {!isLoading && !isError && bhajan && (
            <Card className="temple-shadow overflow-hidden"> {/* Added overflow-hidden to card */}
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-3xl md:text-4xl font-bold font-devanagari text-gradient mb-1">
                    {bhajan.title}
                  </CardTitle>
                </div>
                <Button
                  onClick={handleCopy}
                  size="sm"
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground shrink-0 ml-4"
                  disabled={!bhajan?.lyrics}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="sr-only">Copy Lyrics</span>
                </Button>
              </CardHeader>
              {/* Removed prose container, apply styles directly to pre or CardContent */}
              <CardContent>
                {/* Removed bg-transparent, added overflow-x-auto */}
                <pre className="text-xl font-sanskrit text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans p-0 border-none overflow-x-auto">
                  {bhajan.lyrics || "No lyrics available."}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BhajanDetail;
