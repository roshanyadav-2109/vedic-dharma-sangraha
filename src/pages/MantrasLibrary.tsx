import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mantra } from "@/types/database";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MantraCard from "@/components/MantraCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const MantrasLibrary = () => {
  const { category } = useParams<{ category: string }>();
  const [activeCategory, setActiveCategory] = useState(category || "all");

  useEffect(() => {
    setActiveCategory(category || "all");
  }, [category]);

  const { data: mantras, isLoading } = useQuery({
    queryKey: ["mantras"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("mantras")
        .select("*")
        .order("id");

      if (error) throw error;
      return data as Mantra[];
    },
  });

  const categories = Array.from(
    new Set(mantras?.map((m) => m.category) || [])
  );

  const filteredMantras =
    activeCategory === "all"
      ? mantras
      : mantras?.filter((m) => m.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🕉️</span>
          <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
            मंत्र संग्रह
          </h1>
          <p className="text-lg font-devanagari text-muted-foreground">
            वैदिक परंपरा के अनुसार संस्कृत मंत्र
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="max-w-6xl mx-auto"
          >
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto mb-8">
              <Link to="/mantras">
                <TabsTrigger value="all" className="font-devanagari">
                  सभी
                </TabsTrigger>
              </Link>
              {categories.map((cat) => (
                <Link key={cat} to={`/mantras/${cat}`}>
                  <TabsTrigger value={cat} className="font-devanagari">
                    {cat}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>

            <TabsContent value={activeCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMantras?.map((mantra) => (
                  <MantraCard
                    key={mantra.id}
                    title={mantra.title}
                    mantra={mantra.content || ""}
                    meaning={undefined}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MantrasLibrary;
