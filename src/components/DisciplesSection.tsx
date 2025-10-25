// src/components/DisciplesSection.tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Carousel, TestimonialCard, iTestimonial } from "@/components/ui/TestimonialCarousel"; // Import new components

// Define the Supabase Disciple type based on previous usage
interface SupabaseDisciple {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
}

const DisciplesSection = () => {
  // Fetch data using useQuery
  const { data: disciples, isLoading, error } = useQuery({
    queryKey: ["disciples"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("disciples")
        .select("id, name, description, image_url")
        .order("name")
        .limit(12); // Fetch up to 12 disciples

      if (error) {
        console.error("Error fetching disciples:", error);
        throw error; // Re-throw to let useQuery handle the error state
      }
      return data as SupabaseDisciple[];
    },
     staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  // Placeholder data in case of error or empty fetch
  const placeholderDisciples: iTestimonial[] = [
    { name: "Swami Shraddhanand", designation: "Pioneer of Education Reform", description: "A key figure in the Arya Samaj movement, known for establishing Gurukul Kangri University and his work in education and social reform.", profileImage: "https://source.unsplash.com/random/150x150?portrait,sage,man" },
    { name: "Mahatma Hansraj", designation: "Founder of DAV Institutions", description: "An influential educator and follower of Dayanand Saraswati, instrumental in founding the Dayanand Anglo-Vedic (DAV) network of schools and colleges.", profileImage: "https://source.unsplash.com/random/150x150?portrait,educator,man" },
    { name: "Lala Lajpat Rai", designation: "Freedom Fighter & Social Reformer", description: "A prominent leader in the Indian independence movement and an active member of Arya Samaj, advocating for social change and national education.", profileImage: "https://source.unsplash.com/random/150x150?portrait,leader,indian" },
    { name: "Pandit Lekh Ram", designation: "Scholar & Religious Reformer", description: "A dedicated Arya Samaj missionary and writer, known for his defense of Vedic principles and critiques of other religious traditions.", profileImage: "https://source.unsplash.com/random/150x150?portrait,scholar,man" },
    { name: "Swami Darshananand Saraswati", designation: "Vedic Scholar & Educator", description: "A notable scholar who contributed significantly to Vedic studies and the educational activities within the Arya Samaj.", profileImage: "https://source.unsplash.com/random/150x150?portrait,wise,man" },
    { name: "Bhai Parmanand", designation: "Freedom Fighter & Writer", description: "An Indian nationalist and Arya Samaj member involved in the Ghadar Movement, known for his writings and efforts for India's independence.", profileImage: "https://source.unsplash.com/random/150x150?portrait,activist,man" },
  ];

  // Transform fetched data or use placeholders
  const testimonialData: iTestimonial[] = error || !disciples || disciples.length === 0
    ? placeholderDisciples
    : disciples.map(d => ({
        name: d.name,
        // Use description as designation, or provide a default
        designation: d.description ? (d.description.length > 50 ? d.description.substring(0, 47) + '...' : d.description) : 'Follower of Vedic Principles',
        description: d.description || "A prominent disciple who carried forward the mission of Arya Samaj.", // Full description or default
        profileImage: d.image_url || `https://source.unsplash.com/random/150x150?portrait,${d.name.split(' ')[0]}` // Use fetched image or generate placeholder
      }));

  // Create TestimonialCard elements
  const testimonialCards = testimonialData.map((disciple, index) => (
    <TestimonialCard
      key={disciple.name + index} // Use name and index for key
      discipleData={disciple} // Pass data using the correct prop name
      index={index}
      layout // Enable layout animation
    />
  ));

  return (
    <section id="disciples" className="py-16 px-4 bg-muted/30 overflow-hidden"> {/* Added overflow-hidden */}
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient"> {/* Reduced bottom margin */}
          Prominent Disciples
        </h2>

        {error && !isLoading && ( // Show error only if not loading and error exists
          <div className="flex items-center justify-center gap-2 text-destructive my-6">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to load disciples. Displaying examples.</span>
          </div>
        )}

        {isLoading ? (
          // Simple skeleton for loading state
          <div className="flex justify-center mt-10">
            <Skeleton className="h-[450px] w-80 rounded-3xl" />
          </div>
        ) : (
          // Render the Carousel with TestimonialCard items
          <Carousel items={testimonialCards} />
        )}
      </div>
    </section>
  );
};

export default DisciplesSection;
