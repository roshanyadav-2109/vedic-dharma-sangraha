import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Hospital, BookOpenText, HeartHandshake } from "lucide-react";

const SocialHumanitarianEfforts = () => {
  const efforts = [
    {
      icon: Users,
      title: "Social Reform",
      description: "Working to abolish caste discrimination, untouchability, and promoting equality for all members of society."
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Establishing schools, colleges, and universities (DAV institutions) to promote quality education based on Vedic values."
    },
    {
      icon: Hospital,
      title: "Humanitarian Service",
      description: "Running hospitals, orphanages, and providing relief during natural disasters and emergencies."
    },
    {
      icon: BookOpenText,
      title: "Vedic Knowledge",
      description: "Promoting study and propagation of Vedic literature, organizing havan ceremonies and spiritual discourses."
    },
    {
      icon: HeartHandshake,
      title: "Women's Rights",
      description: "Championing women's education, widow remarriage, and fighting against child marriage and female infanticide."
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Social & Humanitarian Efforts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {efforts.map((effort, index) => {
            const Icon = effort.icon;
            return (
              <Card 
                key={index} 
                className="temple-shadow hover:divine-glow transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-full sacred-gradient flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{effort.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{effort.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialHumanitarianEfforts;
