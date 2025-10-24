import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bhajan } from "@/types/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const BhajanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  const { data: bhajan, isLoading } = useQuery({
    queryKey: ["bhajan", id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("bhajans")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Bhajan;
    },
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32">
          <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-96 w-full max-w-4xl mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!bhajan) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold font-devanagari text-gradient mb-4">
            भजन नहीं मिला
          </h1>
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
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🎵</span>
            <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
              {bhajan.title}
            </h1>
            {bhajan.page_number && (
              <p className="text-sm font-devanagari text-muted-foreground">
                पृष्ठ {bhajan.page_number}
              </p>
            )}
          </div>

          <Card className="p-8 temple-shadow">
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    कॉपी हुआ
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    कॉपी करें
                  </>
                )}
              </Button>
            </div>
            <div className="prose prose-lg max-w-none">
              <pre className="text-xl font-sanskrit text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans">
                {bhajan.lyrics}
              </pre>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BhajanDetail;
