import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { ParallaxScroll } from "@/components/ui/ParallaxScroll";

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail_url: string | null;
  description: string | null;
}

const PhotoVideoGallery = () => {
  const { data: galleryItems, isLoading, error } = useQuery({
    queryKey: ["gallery_items"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("gallery_items")
        .select("id, type, url, thumbnail_url, description")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  const placeholderItems = [
    { id: 1, type: 'image' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Havan+Ceremony", thumbnail_url: null, description: "Sacred Havan Ceremony" },
    { id: 2, type: 'video' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Vedic+Chanting", thumbnail_url: "https://placehold.co/600x400/ff9933/ffffff?text=Vedic+Chanting", description: "Vedic Chanting Session" },
    { id: 3, type: 'image' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Community+Service", thumbnail_url: null, description: "Community Service Program" },
    { id: 4, type: 'image' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Youth+Camp", thumbnail_url: null, description: "Youth Education Camp" },
    { id: 5, type: 'video' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Discourse", thumbnail_url: "https://placehold.co/600x400/ff9933/ffffff?text=Discourse", description: "Spiritual Discourse" },
    { id: 6, type: 'image' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Temple+View", thumbnail_url: null, description: "Arya Samaj Temple" },
    { id: 7, type: 'image' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Education", thumbnail_url: null, description: "DAV School Activities" },
    { id: 8, type: 'video' as const, url: "https://placehold.co/600x400/ff9933/ffffff?text=Annual+Event", thumbnail_url: "https://placehold.co/600x400/ff9933/ffffff?text=Annual+Event", description: "Annual Celebration" },
  ];

  const images = (galleryItems && galleryItems.length > 0 ? galleryItems : placeholderItems)
    .filter(item => item.type === 'image')
    .map(item => item.thumbnail_url || item.url);

  return (
    <section id="gallery" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Photo & Video Gallery
        </h2>

        {error && (
          <div className="flex items-center justify-center gap-2 text-destructive mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to load gallery data. Displaying examples.</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <ParallaxScroll images={images} />
        )}
      </div>
    </section>
  );
};

export default PhotoVideoGallery;
