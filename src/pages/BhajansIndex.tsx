import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bhajan } from "@/types/database";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BhajansIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: bhajans, isLoading } = useQuery({
    queryKey: ["bhajans"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("bhajans")
        .select("id, title, page_number")
        .order("id");

      if (error) throw error;
      return data as Pick<Bhajan, 'id' | 'title' | 'page_number'>[];
    },
  });

  const filteredBhajans = bhajans?.filter(bhajan =>
    bhajan.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-6xl mb-4 block">🎵</span>
            <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
              भजन संग्रह
            </h1>
            <p className="text-lg font-devanagari text-muted-foreground">
              पवित्र भजनों का संग्रह
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="भजन खोजें..."
              className="pl-10 font-devanagari"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBhajans?.map((bhajan) => (
                <Link key={bhajan.id} to={`/bhajans/${bhajan.id}`}>
                  <Card className="p-6 temple-shadow hover:divine-glow transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold font-devanagari text-primary">
                        {bhajan.title}
                      </h3>
                      {bhajan.page_number && (
                        <span className="text-sm font-devanagari text-muted-foreground">
                          पृष्ठ {bhajan.page_number}
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
              {filteredBhajans?.length === 0 && (
                <p className="text-center font-devanagari text-muted-foreground py-8">
                  कोई भजन नहीं मिला
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BhajansIndex;
