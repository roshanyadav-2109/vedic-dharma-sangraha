// src/pages/BhajansIndex.tsx
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bhajan } from "@/types/database";
import { Navbar } from "@/components/Navbar"; // Assuming Navbar export is default or named
import Footer from "@/components/Footer"; // Correct: Default import (no curly braces) // Assuming Footer export is default or named
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Music2, Loader2, Copy, Check } from "lucide-react"; // Added icons
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar, SidebarBody, SidebarItem } from "@/components/ui/LayoutSidebar"; // Import Sidebar components
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea
import { useDebounce } from "@/hooks/use-debounce"; // Import debounce hook
import { Button } from "@/components/ui/button"; // Import Button
import { toast } from "sonner"; // Import toast

// Type for Bhajan list items
type BhajanListItem = Pick<Bhajan, 'id' | 'title'>;

const BhajansIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBhajanId, setSelectedBhajanId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // --- Query 1: Fetch all Bhajan titles for the sidebar ---
  const { data: allBhajans, isLoading: isLoadingList } = useQuery({
    queryKey: ["bhajansList"],
    queryFn: async (): Promise<BhajanListItem[]> => {
      const { data, error } = await supabase
        .from("bhajans")
        .select("id, title")
        .order("id"); // Order by ID or title as preferred

      if (error) {
         console.error("Error fetching bhajan list:", error);
         throw new Error("Could not fetch bhajan list");
      }
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // --- Query 2: Fetch details of the selected Bhajan ---
  const { data: selectedBhajan, isLoading: isLoadingDetail, isFetching: isFetchingDetail } = useQuery({
    queryKey: ["bhajanDetail", selectedBhajanId],
    queryFn: async (): Promise<Bhajan | null> => {
      if (!selectedBhajanId) return null; // Don't fetch if no ID is selected

      const { data, error } = await supabase
        .from("bhajans")
        .select("id, title, lyrics") // Fetch only needed details
        .eq("id", selectedBhajanId)
        .single(); // Expect a single result

      if (error) {
        console.error("Error fetching bhajan detail:", error);
        toast.error(`Failed to load Bhajan: ${error.message}`);
        setSelectedBhajanId(null); // Reset selection on error
        throw new Error("Could not fetch bhajan details");
      }
      return data || null;
    },
    enabled: !!selectedBhajanId, // Only run query when selectedBhajanId is truthy
    staleTime: 1000 * 60 * 10, // Cache detail longer
  });

  // --- Filter Bhajans for Sidebar based on Debounced Search Term ---
  const filteredBhajans = useMemo(() => {
    if (!allBhajans) return [];
    if (!debouncedSearchTerm) return allBhajans;

    return allBhajans.filter(bhajan =>
      bhajan.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [allBhajans, debouncedSearchTerm]);

  // --- Handle Copy ---
  const handleCopy = async () => {
    if (selectedBhajan?.lyrics) {
      try {
        await navigator.clipboard.writeText(selectedBhajan.lyrics);
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
      <div className="flex flex-1 pt-16"> {/* Add padding-top to account for fixed Navbar */}

        {/* --- Sidebar --- */}
        <Sidebar> {/* Wrap SidebarBody in Sidebar for context */}
          <SidebarBody>
            <div className="flex flex-col h-full">
               {/* Sidebar Header (Optional) */}
               {/* <div className="p-4 border-b border-border">
                  <h2 className="text-lg font-semibold font-devanagari">भजन सूची</h2>
               </div> */}
              <ScrollArea className="flex-grow p-2"> {/* Scrollable list */}
                {isLoadingList ? (
                  <div className="space-y-2 px-2">
                    {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-9 w-full" />)}
                  </div>
                ) : (
                  filteredBhajans.map((bhajan) => (
                    <SidebarItem
                      key={bhajan.id}
                      item={{
                        id: bhajan.id,
                        label: bhajan.title,
                        icon: <Music2 />, // Add an icon
                        onClick: () => setSelectedBhajanId(bhajan.id),
                      }}
                      isActive={selectedBhajanId === bhajan.id}
                      className="font-devanagari" // Apply font
                    />
                  ))
                )}
                 {!isLoadingList && filteredBhajans.length === 0 && (
                     <p className="p-4 text-center text-sm text-muted-foreground font-devanagari">कोई भजन नहीं मिला</p>
                 )}
              </ScrollArea>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* --- Main Content Area --- */}
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
          {/* Search Bar */}
          <div className="relative mb-6 w-full max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="भजन खोजें..."
              className="pl-10 font-devanagari w-full" // Ensure full width
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bhajan Display Area */}
          <div className="flex-grow max-w-4xl w-full mx-auto">
            {selectedBhajanId === null && !isLoadingDetail && (
              <Card className="h-full flex items-center justify-center border-dashed border-border/50 bg-muted/20">
                <p className="text-muted-foreground font-devanagari text-center p-8">
                  कृपया सूची से एक भजन चुनें<br/>या ऊपर खोजें
                </p>
              </Card>
            )}

            {(isLoadingDetail || isFetchingDetail) && selectedBhajanId !== null && (
                 <Card className="p-8 temple-shadow">
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

            {!isLoadingDetail && !isFetchingDetail && selectedBhajan && (
              <Card className="temple-shadow">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl md:text-4xl font-bold font-devanagari text-gradient mb-1">
                      {selectedBhajan.title}
                    </CardTitle>
                    {/* Optional: Add page number if needed */}
                    {/* {selectedBhajan.page_number && (
                        <p className="text-sm font-devanagari text-muted-foreground">
                            पृष्ठ {selectedBhajan.page_number}
                        </p>
                    )} */}
                  </div>
                   <Button
                      onClick={handleCopy}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground shrink-0 ml-4"
                      disabled={!selectedBhajan?.lyrics}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="sr-only">Copy Lyrics</span>
                    </Button>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  {/* Use pre-wrap for line breaks */}
                  <pre className="text-xl font-sanskrit text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans bg-transparent p-0 border-none overflow-x-auto">
                    {selectedBhajan.lyrics || "No lyrics available."}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BhajansIndex;
