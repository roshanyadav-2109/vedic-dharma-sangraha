import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface Disciple {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
}

const DisciplesSection = () => {
  const { data: disciples, isLoading, error } = useQuery({
    queryKey: ["disciples"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("disciples")
        .select("id, name, description, image_url")
        .order("name")
        .limit(12);

      if (error) throw error;
      return data as Disciple[];
    },
  });

  const placeholderDisciples = [
    { id: 1, name: "Swami Shraddhanand", description: "Pioneer of education reform", image_url: "https://placehold.co/300x400/ff9933/ffffff?text=Swami+Shraddhanand" },
    { id: 2, name: "Mahatma Hansraj", description: "Founder of DAV institutions", image_url: "https://placehold.co/300x400/ff9933/ffffff?text=Mahatma+Hansraj" },
    { id: 3, name: "Lala Lajpat Rai", description: "Freedom fighter and social reformer", image_url: "https://placehold.co/300x400/ff9933/ffffff?text=Lala+Lajpat+Rai" },
    { id: 4, name: "Pandit Lekh Ram", description: "Scholar and religious reformer", image_url: "https://placehold.co/300x400/ff9933/ffffff?text=Pandit+Lekh+Ram" },
    { id: 5, name: "Swami Dayanand", description: "Spiritual leader", image_url: "https://placehold.co/300x400/ff9933/ffffff?text=Swami+Dayanand" },
    { id: 6, name: "Bhai Parmanand", description: "Freedom fighter", image_url: "https://placehold.co/300x400/ff9933/ffffff?text=Bhai+Parmanand" },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Prominent Disciples
        </h2>

        {error && (
          <div className="flex items-center justify-center gap-2 text-destructive mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to load disciples data. Displaying examples.</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="temple-shadow">
                <Skeleton className="h-64 w-full rounded-t-lg" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {(disciples && disciples.length > 0 ? disciples : placeholderDisciples).map((disciple) => (
              <Card 
                key={disciple.id} 
                className="temple-shadow hover:divine-glow transition-all duration-300 overflow-hidden"
              >
                <img
                  src={disciple.image_url || `https://placehold.co/300x400/ff9933/ffffff?text=${encodeURIComponent(disciple.name)}`}
                  alt={disciple.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/300x400/ff9933/ffffff?text=${encodeURIComponent(disciple.name)}`;
                  }}
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{disciple.name}</h3>
                  <p className="text-sm text-muted-foreground">{disciple.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DisciplesSection;
