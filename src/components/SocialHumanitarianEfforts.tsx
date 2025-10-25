// src/components/SocialHumanitarianEfforts.tsx
import { FeaturesSectionWithCardGradient } from "@/components/ui/features-section-with-card-gradient"; // Import the new component

const SocialHumanitarianEfforts = () => {
  // Define the data in the format needed by FeaturesSectionWithCardGradient
  const effortsData = [
    {
      title: "Social Reform",
      description: "Working to abolish caste discrimination, untouchability, and promoting equality for all members of society."
    },
    {
      title: "Education",
      description: "Establishing schools, colleges, and universities (DAV institutions) to promote quality education based on Vedic values."
    },
    {
      title: "Humanitarian Service",
      description: "Running hospitals, orphanages, and providing relief during natural disasters and emergencies."
    },
    {
      title: "Vedic Knowledge",
      description: "Promoting study and propagation of Vedic literature, organizing havan ceremonies and spiritual discourses."
    },
    {
      title: "Women's Rights",
      description: "Championing women's education, widow remarriage, and fighting against child marriage and female infanticide."
    },
    // Add a sixth item if desired for a balanced 3-column grid, or adjust grid columns in the component
     {
      title: "Promoting Unity",
      description: "Fostering interfaith dialogue and understanding, promoting universal brotherhood based on Vedic teachings.",
    },
  ];

  return (
    // Keep the section wrapper but replace the content
    <section id="social-efforts" className="py-16 px-4 bg-background"> {/* Adjusted background and ID */}
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient">
          Social & Humanitarian Efforts
        </h2>
      </div>
      {/* Use the new component and pass the data */}
      <FeaturesSectionWithCardGradient gridData={effortsData} />
    </section>
  );
};

export default SocialHumanitarianEfforts;
