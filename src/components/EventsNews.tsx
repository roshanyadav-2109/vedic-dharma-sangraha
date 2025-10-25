import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

interface EventNewsItem {
  id: number;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
}

const EventsNews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { data: events, isLoading, error } = useQuery({
    queryKey: ["events_news"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("events_news")
        .select("id, title, description, event_date, location, image_url")
        .order("event_date", { ascending: false })
        .limit(4);

      if (error) throw error;
      return data as EventNewsItem[];
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const placeholderEvents = [
    {
      id: 1,
      title: "Annual Havan Ceremony",
      description: "Join us for our annual sacred fire ceremony promoting peace and prosperity.",
      event_date: "2025-11-15",
      location: "Arya Samaj Mandir, Delhi",
      image_url: "https://placehold.co/600x400/ff9933/ffffff?text=Havan+Ceremony"
    },
    {
      id: 2,
      title: "Vedic Discourse Series",
      description: "Weekly lectures on Vedic philosophy and its application in modern life.",
      event_date: "2025-11-01",
      location: "Community Hall, Mumbai",
      image_url: "https://placehold.co/600x400/ff9933/ffffff?text=Vedic+Discourse"
    },
    {
      id: 3,
      title: "Youth Education Camp",
      description: "Three-day residential camp for youth focusing on character building and Vedic values.",
      event_date: "2025-10-28",
      location: "DAV College Campus",
      image_url: "https://placehold.co/600x400/ff9933/ffffff?text=Youth+Camp"
    },
    {
      id: 4,
      title: "Health & Wellness Fair",
      description: "Free health checkups and wellness workshops for the community.",
      event_date: "2025-10-20",
      location: "Arya Samaj Medical Center",
      image_url: "https://placehold.co/600x400/ff9933/ffffff?text=Health+Fair"
    }
  ];

  return (
    <section id="events-news" ref={sectionRef} className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Events & News
        </h2>

        {error && (
          <div className="flex items-center justify-center gap-2 text-destructive mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to load events data. Displaying examples.</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="temple-shadow">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(events && events.length > 0 ? events : placeholderEvents).map((event, index) => (
              <Card 
                key={event.id} 
                className="temple-shadow overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${index * 0.1}s`
                }}
              >
                <img
                  src={event.image_url || `https://placehold.co/600x400/ff9933/ffffff?text=${encodeURIComponent(event.title)}`}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x400/ff9933/ffffff?text=${encodeURIComponent(event.title)}`;
                  }}
                />
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {event.event_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(event.event_date), "MMMM d, yyyy")}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsNews;
