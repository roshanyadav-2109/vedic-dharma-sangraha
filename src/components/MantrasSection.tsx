import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mantra } from "@/types/database";
import MantraCard from "./MantraCard";
import { Skeleton } from "./ui/skeleton";

const MantrasSection = () => {
  const { data: mantras, isLoading } = useQuery({
    queryKey: ["mantras-home"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("mantras")
        .select("*")
        .limit(8)
        .order("id");

      if (error) throw error;
      return data as Mantra[];
    },
  });

  return (
    <section id="mantras" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-6xl">🕉️</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient">
            पवित्र मंत्र संग्रह
          </h2>
          <p className="text-lg font-devanagari text-muted-foreground max-w-2xl mx-auto">
            वैदिक परंपरा के अनुसार संस्कृत मंत्र। प्रत्येक मंत्र को कॉपी करने के लिए बटन का उपयोग करें।
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {mantras?.slice(0, 8).map((mantra) => (
              <MantraCard
                key={mantra.id}
                title={mantra.title}
                mantra={mantra.content || ""}
                meaning={undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MantrasSection;
