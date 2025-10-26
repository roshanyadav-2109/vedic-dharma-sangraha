// src/pages/BhajansIndex.tsx
import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bhajan } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Music2, Loader2, Copy, Check, Menu } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// Import SidebarBody and SidebarItem directly (Provider not needed for desktop)
import { SidebarBody, SidebarItem } from "@/components/ui/LayoutSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type BhajanListItem = Pick<Bhajan, 'id' | 'title'>;

const BhajansIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBhajanId, setSelectedBhajanId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // State for mobile sheet

  // --- Data fetching queries remain the same ---
  const { data: allBhajans, isLoading: isLoadingList } = useQuery({
    queryKey: ["bhajansList"],
    queryFn: async (): Promise<BhajanListItem[]> => {
      const { data, error } = await (supabase as any).from("bhajans").select("id, title").order("id");
      if (error) { console.error("Error fetching bhajan list:", error); throw new Error("Could not fetch bhajan list"); }
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const { data: selectedBhajan, isLoading: isLoadingDetail, isFetching: isFetchingDetail } = useQuery({
    queryKey: ["bhajanDetail", selectedBhajanId],
    queryFn: async (): Promise<Bhajan | null> => {
      if (!selectedBhajanId) return null;
      const { data, error } = await (supabase as any).from("bhajans").select("id, title, lyrics").eq("id", selectedBhajanId).single();
      if (error) { console.error("Error fetching bhajan detail:", error); toast.error(`Failed to load Bhajan: ${error.message}`); setSelectedBhajanId(null); throw new Error("Could not fetch bhajan details"); }
      return data || null;
    },
    enabled: !!selectedBhajanId,
    staleTime: 1000 * 60 * 10,
  });

  // --- Filtering logic remains the same ---
  const filteredBhajans = useMemo(() => {
    if (!allBhajans) return [];
    if (!debouncedSearchTerm) return allBhajans;
    return allBhajans.filter(bhajan => bhajan.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
  }, [allBhajans, debouncedSearchTerm]);

  // --- Copy handler remains the same ---
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

  // --- Sidebar Content Memoized (Using Table) - No changes needed here ---
  const sidebarContent = useMemo(() => (
     <div className="flex flex-col h-full">
       <div className="relative p-4 border-b border-border">
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="सूची खोजें..."
            className="pl-10 font-devanagari w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
       </div>
        <ScrollArea className="flex-grow">
          {isLoadingList ? (
            <div className="space-y-1 p-4">
              {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : (
            <Table>
              <TableBody>
                {filteredBhajans.length > 0 ? (
                    filteredBhajans.map((bhajan) => (
                    <TableRow
                      key={bhajan.id}
                      onClick={() => {
                        setSelectedBhajanId(bhajan.id);
                        setIsMobileSidebarOpen(false); // Still close mobile on selection
                      }}
                      className={cn(
                        "cursor-pointer font-devanagari",
                        selectedBhajanId === bhajan.id && "bg-muted hover:bg-muted"
                      )}
                    >
                      <TableCell className="py-2.5">{bhajan.title}</TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <TableCell className="text-center text-sm text-muted-foreground font-devanagari py-8">
                         कोई भजन नहीं मिला
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
     </div>
   ), [isLoadingList, filteredBhajans, selectedBhajanId, setSelectedBhajanId, searchTerm]); // Added setSelectedBhajanId dependency


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
       <div className="flex flex-1 pt-16">

          {/* Mobile Sidebar Trigger - Positioned absolutely */}
         <div className="md:hidden absolute top-16 left-0 z-30 p-2">
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open Sidebar</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-card border-r border-border p-0 pt-10 w-full max-w-xs">
                    {sidebarContent}
                </SheetContent>
            </Sheet>
         </div>


        {/* --- Sidebar (Desktop) --- */}
        {/* Removed SidebarProvider wrapper, SidebarBody is now standalone */}
        <SidebarBody className="h-[calc(100vh-4rem)] sticky top-16 hidden md:flex">
            {sidebarContent}
        </SidebarBody>

        {/* --- Main Content Area --- */}
        {/* Adjust left padding for mobile to account for trigger */}
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto pl-16 md:pl-8">

          {/* Bhajan Display Area - No changes needed here */}
          <div className="flex-grow max-w-4xl w-full mx-auto">
            {selectedBhajanId === null && !isLoadingDetail && (
              <Card className="h-full flex items-center justify-center border-dashed border-border/50 bg-muted/20 min-h-[400px]">
                <p className="text-muted-foreground font-devanagari text-center p-8">
                  कृपया सूची से एक भजन चुनें
                </p>
              </Card>
            )}
            {(isLoadingDetail || isFetchingDetail) && selectedBhajanId !== null && (
                 <Card className="p-8 temple-shadow min-h-[400px]">
                     <div className="flex justify-center mb-8"> <Loader2 className="h-10 w-10 animate-spin text-primary" /> </div>
                    <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
                    <div className="space-y-3">
                         <Skeleton className="h-4 w-full" /> <Skeleton className="h-4 w-full" /> <Skeleton className="h-4 w-5/6" /> <Skeleton className="h-4 w-full" /> <Skeleton className="h-4 w-4/6" />
                     </div>
                 </Card>
            )}
            {!isLoadingDetail && !isFetchingDetail && selectedBhajan && (
              <Card className="temple-shadow">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div><CardTitle className="text-3xl md:text-4xl font-bold font-devanagari text-gradient mb-1">{selectedBhajan.title}</CardTitle></div>
                   <Button onClick={handleCopy} size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground shrink-0 ml-4" disabled={!selectedBhajan?.lyrics}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} <span className="sr-only">Copy Lyrics</span>
                    </Button>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
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
